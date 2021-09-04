import BorderButton from 'components/Button/BorderButton'
import StickyBottomMenu from 'components/Button/StickyBottomMenu'
import Page from 'components/layout/Page'
import React, { useState, useEffect } from 'react'
import { AppState } from 'state'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styles, { useTheme } from 'styled-components'
import Metamask from '../../../components/WalletModal/icons/Metamask'

import ToastListener from '../../../components/ToastListener'

import { Label, Text } from 'components/Text'
import { Flex, Heading, useMatchBreakpoints } from 'components'
import Body from 'components/layout/Body'
import { useModal } from 'components/Modal'
import BuyEggs from 'components/BuyEggs'
import { Egg } from 'types/zoo'
import { useDispatch } from 'react-redux'
import { breedTimeouts, eggTimeout } from 'constants/index'
import { getMilliseconds, getDaysHours } from 'util/timeHelpers'
import { getToken, getDrop, getFaucet, getMedia, getZooKeeper } from 'util/contracts'
import useWeb3 from 'hooks/useWeb3'
import useToast from 'hooks/useToast'
import Header from 'components/Header'
import Eggs from './Eggs'
import Animals from './Animals'
import AccountHeader from './AccountHeader'

const HeadingContainer = styles.div`
    width: 200%;
    display: flex;
    justify-content: start;
    margin: 0px 8px;
`

const MyZooContainer = styles.div`
    width: 100%;
    display: flex;
    padding: 16px;
`

const StyledButton = styles.button`
    cursor: pointer;
    margin-top: 1px;
    margin-left: 16px;
    text-decoration: none;
    text-transform: uppercase;
`

const LabelWrapper = styles.div`
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    align-items: center;
`

const ValueWrapper = styles(Text)`
    color: ${({ theme }) => theme.colors.text};
    width: 100%;
    display: flex;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 550;
`

const RowWrapper = styles.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin: 16px;
`

const StyledHeading = styles(Heading)`
    color: ${({ theme }) => theme.colors.text};
`

function numberWithCommas(num) {
  const values = num.toString().split('.')
  return values[0].replace(/.(?=(?:.{3})+$)/g, '$&,') + (values.length == 2 ? '.' + values[1] : '')
}

const IconWrapper = styles.div<{ size?: number }>`
  align-items: center;
  justify-content: center;
  & > * {
    height: ${({ size }) => (size ? size + 'px' : '32px')};
    width: ${({ size }) => (size ? size + 'px' : '32px')};
  }
`
const HeaderFrame = styles.div<{ isSm: boolean }>`
  grid-template-columns: 1fr 120px;
  -moz-box-pack: justify;
  -moz-box-align: center;
  flex-direction: row;
  top: 0px;
  padding: 1rem;
  z-index: 21;
  position: relative;
  background-image: linear-gradient(transparent 50%, rgb(25, 27, 31) 50%);
  background-position: 0px 0px;
  background-size: 100% 200%;
  box-shadow: transparent 0px 0px 0px 1px;
  transition: background-position 0.1s ease 0s, box-shadow 0.1s ease 0s;
  background-blend-mode: hard-light;
  display: grid;
  width: 100%;
  ${({ isSm }) => (isSm ? 'grid-template-columns: 1fr; padding: 1rem' : '')};
`

interface AccountProps {
  handleFunds: () => void
  wait: boolean
  balance: number
}

const Account: React.FC<AccountProps> = ({ handleFunds, wait, balance }) => {
  const [isInitial, setIsInitial] = useState(true)
  const [tab, setTab] = useState(0)
  const [allowance, setAllowance] = useState(false)
  const [disable, setDisable] = useState(false)
  const [disableApprove, setDisableApprove] = useState(false)
  const [isApproving, setIsApproving] = useState(false)
  // const [balance, setBalance] = useState(0)
  const [keepApprove, setKeepApprove] = useState(true)
  const web3 = useWeb3()
  const [account, setAccount] = useState(web3.account)

  // const [zooToken, setZooToken] = useState(getToken(web3))
  // const [zooKeeper, setZooKeeper] = useState(getZooKeeper(web3))
  // const [zooDrop, setZooDrop] = useState(getDrop(web3))

  const { chainID, gasPrice } = web3
  const { isXl, isSm, isMd } = useMatchBreakpoints()
  const { toastSuccess, toastError, toastInfo, clear } = useToast()
  const allEggs = useSelector<AppState, AppState['zoo']['eggs']>((state) => state.zoo.eggs)
  const history = useHistory()
  const toastClear = () => {
    clear()
  }

  let currentEggsOwned = 0
  if (account) {
    currentEggsOwned = Object.values(allEggs).filter((egg) => (egg.owner || '').toLowerCase() === account.toLowerCase() && !egg.burned).length
  }

  const zooDrop = getDrop(web3)
  const zooKeeper = getZooKeeper(web3)
  const zooToken = getToken(web3)
  // const zooToken = getToken(web3)
  // const zooKeeper = getZooKeeper(web3)
  useEffect(() => {
    setAccount(web3.account)
  }, [web3])

  const mount = async () => {
    if (!zooToken || !zooKeeper || !zooDrop || !web3.account) return false
    if (!isInitial) return false
    try {
      const allowance = await zooToken.methods.allowance(web3.account, zooKeeper.options.address).call({ from: web3.account })
      if (allowance > 0) {
        setAllowance(true)
        setKeepApprove(false)
        if (isInitial) {
          toastClear()
          toastSuccess('Wallet connected')
        }
      } else {
        setKeepApprove(true)
        toastClear()
        toastInfo('Please approve allowance to play')
      }
    } catch (error) {
      console.log('Error in allowance')
      console.error(error)
    }
    setIsInitial(false)
    return true
  }

  const approve = async () => {
    if (!web3.account) {
      toastClear()
      toastInfo('Account not connected yet')
      return
    }

    toastClear()
    setDisableApprove(true)
    toastInfo('Processing approval...')

    // Increase allowance
    const eggPrice = await zooDrop.methods.eggPrice().call()
    const allowance = web3.utils.toBN(eggPrice).mul(web3.utils.toBN(3))
    const tx = zooToken.methods.approve(zooKeeper.options.address, allowance).send({ from: account })

    tx.then(() => {
      setAllowance(true)
      setDisableApprove(false)
      toastClear()
      toastSuccess('Approval success!')
    }).catch((e) => {
      console.error('APPROVE ERROR', e)
      setDisableApprove(false)
      toastClear()
      toastError('Failed to approve account')
    })
  }

  const buyEgg = async () => {
    setDisable(true)
    try {
      await zooKeeper.methods
        .buyEgg(1) // buy from first drop
        .send({ from: account, gasPrice: gasPrice })
        .then((res) => {
          toastClear()
          toastInfo('Transaction submitted.')
          console.log('bought egg', res)
          setDisable(false)
        })
        .catch((err) => {
          console.log('Error in buyEgg', err)
          toastClear()
          toastError(`Purchase failed: ${err.toString().replace(/Error: Returned error: /, '')}`)
          setDisable(false)
        })
    } catch (err) {
      console.error(err)
      toastClear()
      setDisable(false)
      if (currentEggsOwned < 3) {
        toastError('Already purchased maximum eggs from drop. Check the market for more eggs')
      } else {
        toastError('Unable to purchase eggs. Try again later.')
      }
    }
  }

  useEffect(() => {
    let mounted = true
    if (mounted) {
      mount()
    }
    return () => {
      mounted = false
    }
  }, [account, chainID])
  const theme = useTheme()

  return (
    <
      // style={{ height: '100vh' }} className='flex items-center'
    >
      {/* pr-0 lg:pr-0 mr-0  */}
      <div className='flex flex-col relative filter drop-shadow z-10 w-full'>
        <div className='flex flex-col h-full'>
          <AccountHeader />
          <div className='flex flex-col justify-between h-full'>
            <div style={{ flex: 1 }} className='p-5 rounded'>
              <div className='flex items-end'>
                <div>
                  <div className='text-base font-bold currentColor mb-2 text-xl'>Wallet Balance</div>
                  <div className='text-base font-bold currentColor text-2xl'>
                    <span className='text-2xl'>{numberWithCommas(balance.toFixed(3))} </span>ZOO
                  </div>
                </div>
                <div className='ml-4 relative inline-flex rounded-md shadow-sm'>
                  <div className='flex items-center  cursor-pointer' onClick={() => handleFunds()}>
                    <span
                      className={`flex items-center justify-center ml-2 py-2 text-base font-medium text-center rounded-md text-secondary hover:text-high-emphesis font-bold border rounded-xl text-high-emphesis bg-gradient-to-b from-btn1 to-btn2 hover:from-primary hover:to-primary ${
                        balance === 0 && 'gradient-border'
                      }`}
                      style={{ width: '120px', marginBottom: '-4px' }}>
                      {wait ? 'Processing' : 'Get ZOO'}
                    </span>
                  </div>
                  {balance === 0 && (
                    <span className='flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1'>
                      <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75'></span>
                      <span className='relative inline-flex rounded-full h-3 w-3 bg-white'></span>
                    </span>
                  )}
                </div>
              </div>

              <div className='text-base font-bold currentColor pt-8 pb-2 text-xl'>{currentEggsOwned} Eggs Owned</div>
              <Eggs />
            </div>

            <div className={`m-4 flex flex-wrap justify-center`}>
              {(keepApprove || !allowance) && (
                <div className={'mr-2'}>
                  <button
                    disabled={disableApprove || allowance}
                    style={{ width: '120px', fontSize: '16px', fontWeight: 550 }}
                    className={`border rounded-xl shadow-sm focus:ring-2 focus:ring-offset-2 bg-opacity-80 text-primary border-gray-800 hover:bg-opacity-100  disabled:bg-opacity-80 px-0 py-2 text-base rounded disabled:cursor-not-allowed focus:outline-none w-full  bg-gradient-to-b from-btn1 to-btn2 hover:from-primary hover:to-primary`}
                    onClick={approve}>
                    {allowance ? 'Approved' : disableApprove ? 'Processing' : 'Approve'}
                  </button>
                </div>
              )}
              {currentEggsOwned > 2 ? (
                <></>
              ) : (
                <div className={'ml-2'}>
                  <button
                    disabled={disable || !allowance}
                    className={` rounded-xl shadow-sm focus:ring-2 focus:ring-offset-2 bg-opacity-80 text-primaryhover:bg-opacity-100 focus:ring-offset-dark-700 disabled:bg-opacity-80 px-0 py-2 text-base rounded disabled:cursor-not-allowed focus:outline-none w-full ${
                      !allowance ? 'border border-gray-600' : 'bg-gradient-to-b from-btn1 to-btn2 hover:from-primary hover:to-primary'
                    }`}
                    style={{ width: '120px', fontSize: '16px', fontWeight: 550 }}
                    onClick={buyEgg}>
                    {currentEggsOwned > 2 ? 'Market' : disable ? 'Processing' : 'Buy Eggs'}
                  </button>
                </div>
              )}
            </div>
          </div>
          {/* <div style={{ flex: 1 }} className='p-5 rounded my-4'>
            <Animals hybrid='pure' />
          </div>
          <div style={{ flex: 1 }} className='p-5 rounded my-4'>
            <Animals hybrid='hybrid' />
          </div> */}
          {/* {tab === 0 ? (
            <div className='flex flex-col justify-between h-full'>
              <div style={{ backgroundColor: '#212429', flex: 1 }} className='p-5 rounded'>
                <div className='mb-2'>
                  <Label style={{ fontSize: '20px' }}>{currentEggsOwned} Eggs Owned</Label>
                </div>
                <Eggs />
              </div>

              <div className='my-4 flex justify-between flex-wrap'>
                {(keepApprove || !allowance) && (
                  <div className={` ${isSm ? 'w-full' : 'w-1/4'} px-2`}>
                    <button
                      disabled={disableApprove || allowance}
                      style={{ color: 'rgb(255,255,255)', backgroundColor: '#8C4FF8', border: '1px solid rgba(21, 61, 111, 0.44)' }}
                      className={`border rounded-xl shadow-sm focus:ring-2 focus:ring-offset-2 bg-gray-700 bg-opacity-80  text-primary border-gray-800 hover:bg-opacity-100 focus:ring-offset-dark-700 focus:ring-dark-800 disabled:bg-opacity-80  py-4 text-base rounded  font-semibold disabled:cursor-not-allowed focus:outline-none w-full`}
                      onClick={approve}>
                      {allowance ? 'APPROVED' : disableApprove ? 'PROCESSING' : 'APPROVE'}
                    </button>
                  </div>
                )}
                <div className={` ${isSm || allowance ? 'w-full' : 'w-3/4'} px-2`}>
                  <button
                    disabled={disable || !allowance}
                    className={`border rounded-xl shadow-sm focus:ring-2 focus:ring-offset-2 bg-opacity-80 text-primary border-gray-800 hover:bg-opacity-100 focus:ring-offset-dark-700 focus:ring-dark-800 disabled:bg-opacity-80 px-6 py-4 text-base rounded disabled:cursor-not-allowed focus:outline-none w-full`}
                    style={{ backgroundColor: allowance ? '#8C4FF8' : 'rgb(44, 47, 54)' }}
                    onClick={buyEgg}>
                    {disable ? 'PROCESSING' : 'BUY EGGS'}
                  </button>
                </div>
              </div>
            </div>
          ) : tab === 1 ? (
            <>
              <div style={{ backgroundColor: '#212429', flex: 1 }} className='p-5 rounded'>
                <Animals hybrid='pure' />
              </div>
            </>
          ) : (
            <>
              <div style={{ backgroundColor: '#212429', flex: 1 }} className='p-5 rounded'>
                <Animals hybrid='hybrid' />
              </div>
            </>
          )} */}
        </div>
      </div>
      <ToastListener />
    </>
  )
}

export default Account

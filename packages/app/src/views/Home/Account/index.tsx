import BorderButton from 'components/Button/BorderButton'
import StickyBottomMenu from 'components/Button/StickyBottomMenu'
import Page from 'components/layout/Page'
import React, { useState, useEffect } from 'react'
import { AppState } from 'state'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styles from 'styled-components'
import Metamask from '../../../components/WalletModal/icons/Metamask'

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
}

const Account: React.FC<AccountProps> = ({ handleFunds, wait }) => {
  const [isInitial, setIsInitial] = useState(true)
  const [tab, setTab] = useState(0)
  const [allowance, setAllowance] = useState(false)
  const [disable, setDisable] = useState(false)
  const [disableApprove, setDisableApprove] = useState(false)
  const [balance, setBalance] = useState(0)
  const [keepApprove, setKeepApprove] = useState(true)
  const web3 = useWeb3()

  const [zooToken, setZooToken] = useState(getToken(web3))
  const [zooKeeper, setZooKeeper] = useState(getZooKeeper(web3))
  const [zooDrop, setZooDrop] = useState(getDrop(web3))

  const { account, chainID, gasPrice } = web3
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

  // const zooToken = getToken(web3)
  // const zooKeeper = getZooKeeper(web3)

  useEffect(() => {
    setZooToken(getToken(web3))
    setZooKeeper(getZooKeeper(web3))
    setZooDrop(getDrop(web3))
  }, [web3])

  const getBalance = async () => {
    try {
      const decimals = await zooToken.methods.decimals().call()
      const rawBalance = await zooToken.methods.balanceOf(account).call()
      const divisor = parseFloat(Math.pow(10, decimals).toString())
      const balance = rawBalance / divisor
      setBalance(balance)
    } catch (e) {
      console.error('ISSUE LOADING ZOO BALANCE \n', e)
      toastClear()
      toastError('Failed to load ZOO balance')
    }

    try {
      const allowance = await zooToken.methods.allowance(account, zooKeeper.options.address).call()
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
      console.log(error)
    }
    setIsInitial(false)
  }

  const approve = async () => {
    toastClear()
    setDisableApprove(true)
    toastInfo('Processing approval...')

    // Increase allowance
    const eggPrice = await zooDrop.methods.eggPrice().call()
    const allowance = web3.utils.toBN(eggPrice).mul(web3.utils.toBN(100))
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

  useEffect(() => {
    let mounted = true
    if (mounted) {
      getBalance()
    }
    return () => {
      mounted = false
    }
  }, [account, chainID])

  const buyEgg = async () => {
    setDisable(true)
    if (currentEggsOwned < 3) {
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
            console.log(err)
            setDisable(false)
          })
      } catch (error) {
        setDisable(false)
        console.log(error)
        toastClear()
        toastError('Unable to purchase eggs. Try again later.')
      }
    } else {
      history.push('/feed/market')
    }
  }

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
              <div className='mb-2 flex items-end'>
                <div>
                  <div className='text-base font-bold currentColor mb-2 text-lg'>Wallet Balance</div>
                  <div className='text-base font-bold currentColor mb-2 text-2xl'>
                    <span className='text-3xl'>{numberWithCommas(balance.toFixed(3))} </span>ZOO
                  </div>
                </div>
                <div className='ml-4 relative inline-flex rounded-md shadow-sm'>
                  <div className='flex items-center  cursor-pointer' onClick={() => handleFunds()}>
                    <span
                      className={`flex items-center justify-center px-4 text-base font-medium text-center rounded-md text-secondary hover:text-high-emphesis font-bold border rounded-xl text-high-emphesis  bg-gradient-to-r from-primary to-primary hover:from-btn1 hover:to-btn2`}
                      style={{ minHeight: 40, animation: 'border-pulsate 2s infinite;' }}>
                      {chainID !== 97 && chainID !== 1337 ? 'ADD FUNDS' : wait ? 'PROCESSING' : 'GET ZOO'}
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
              <div className='my-8'>
                <Label style={{ fontSize: '20px' }}>{currentEggsOwned} Eggs Owned</Label>
              </div>
              <Eggs />
            </div>

            <div className={`m-4 flex flex-wrap ${isSm ? 'justify-around' : 'justify-center'}`}>
              {(keepApprove || !allowance) && (
                <div className=''>
                  <button
                    disabled={disableApprove || allowance}
                    style={{ width: '140px', fontSize: '16px', fontWeight: 550 }}
                    className={`border rounded-xl shadow-sm focus:ring-2 focus:ring-offset-2 bg-opacity-80 text-primary border-gray-800 hover:bg-opacity-100  disabled:bg-opacity-80 px-0 py-2 text-base rounded disabled:cursor-not-allowed focus:outline-none w-full  bg-gradient-to-r from-primary to-primary hover:from-btn1 hover:to-btn2`}
                    onClick={approve}>
                    {allowance ? 'APPROVED' : disableApprove ? 'PROCESSING' : 'APPROVE'}
                  </button>
                </div>
              )}
              <div className={`${!isSm && 'ml-4'}`}>
                <button
                  disabled={disable || !allowance}
                  className={` rounded-xl shadow-sm focus:ring-2 focus:ring-offset-2 bg-opacity-80 text-primaryhover:bg-opacity-100 focus:ring-offset-dark-700 disabled:bg-opacity-80 px-0 py-2 text-base rounded disabled:cursor-not-allowed focus:outline-none w-full ${
                    !allowance ? 'border border-gray-600' : 'bg-gradient-to-r from-primary to-primary hover:from-btn1 hover:to-btn2'
                  }`}
                  style={{ width: '140px', fontSize: '16px', fontWeight: 550 }}
                  onClick={buyEgg}>
                  {currentEggsOwned > 2 ? 'Market' : disable ? 'PROCESSING' : 'BUY EGGS'}
                </button>
              </div>
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
      <div
        style={{
          // background: 'radial-gradient(50% 50% at 50% 50%,#fc077d10 0,rgba(255,255,255,0) 100%)',
          width: '50vw',
          height: '50vh',
          // transform: 'translate(-50vw, -100vh)',
          top: '0%',

          right: '-15%',
          zIndex: -1,
        }}
        className='absolute  bg-primary opacity-10  rounded-full z-0 filter  blur-3xl'></div>
      <div
        style={{
          // background: 'radial-gradient(50% 50% at 50% 50%,#fc077d10 0,rgba(255,255,255,0) 100%)',
          width: '50vw',
          height: '50vh',
          // transform: 'translate(-50vw, -100vh)',
          left: '-15%',
          right: 0,
          bottom: '0%',
          zIndex: -1,
        }}
        className='absolute  bg-pink rounded-full opacity-10  z-0 filter  blur-3xl'></div>
      {/* <div
          background: 'radial-gradient(50% 50% at 50% 50%,#fc077d10 0,rgba(255,255,255,0) 100%)',
          backgroundColor: 'rgba(20,20,20,1)',
          width: '200vw',
          height: '200vh',
          transform: 'translate(-50vw, -100vh)',
          top: 0,
          left: 0,
          right: 0,
          zIndex: -1,

        }}
        className='fixed '></div> */}
    </>
  )
}

export default Account

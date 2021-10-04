import { useWeb3React } from '@web3-react/core'
import { useMatchBreakpoints } from 'components'
import BuyEggModal from 'components/modals/MarketModals/BuyEggModal'
import { useDrop, useZooKeeper, useZooToken } from 'hooks/useContract'
import useToast from 'hooks/useToast'
import useWeb3 from 'hooks/useWeb3'
import React, { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { AppState } from 'state'
import { useBuyEggModalToggle } from 'state/application/hooks'
import { useGasPrice } from 'state/network/hooks'
import ToastListener from '../../../components/ToastListener'
import Eggs from './Eggs'

function numberWithCommas(num) {
  const values = num.toString().split('.')
  return values[0].replace(/.(?=(?:.{3})+$)/g, '$&,') + (values.length == 2 ? '.' + values[1] : '')
}

interface AccountProps {
  handleFunds: () => void
  wait: boolean
  balance: number
}

const Account: React.FC<AccountProps> = ({ handleFunds, wait, balance }) => {
  const [isInitial, setIsInitial] = useState(true)
  const [allowance, setAllowance] = useState(false)
  const [disable, setDisable] = useState(false)
  const [disableApprove, setDisableApprove] = useState(false)
  const [isApproving, setIsApproving] = useState(false)
  // const [balance, setBalance] = useState(0)
  const [keepApprove, setKeepApprove] = useState(true)
  const { chainId, library } = useWeb3()
  const { account } = useWeb3React()
  const gasPrice = useGasPrice()
  // const [zooToken, setZooToken] = useState(getToken(web3))
  // const [zooKeeper, setZooKeeper] = useState(getZooKeeper(web3))
  // const [zooDrop, setZooDrop] = useState(getDrop(web3))

  const { isXl, isSm, isMd } = useMatchBreakpoints()
  const { toastSuccess, toastError, toastInfo, clear } = useToast()
  const myEggs = useSelector<AppState, AppState['zoo']['myEggs']>((state) => state.zoo.myEggs)
  const zooBalance = useSelector<AppState, AppState['zoo']['zooBalance']>((state) => state.zoo.zooBalance)

  const history = useHistory()
  const toastClear = () => {
    clear()
  }

  const currentEggsOwned = Object.values(myEggs).length

  const zooDrop = useDrop()
  const zooKeeper = useZooKeeper()
  const zooToken = useZooToken()
  // const zooToken = getToken(web3)
  // const zooKeeper = getZooKeeper(web3)

  const mount = async () => {
    if (!zooToken || !zooKeeper || !zooDrop || !library.account) return false
    if (!isInitial) return false
    try {
      const allowance = await zooToken.methods.allowance(library.account, zooKeeper.options.address).call({ from: library.account })
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
    try {
      if (!account) {
        toastClear()
        toastInfo('Account not connected yet')
        return
      }

      toastClear()
      setDisableApprove(true)
      toastInfo('Processing approval...')

      // Increase allowance
      const supply = await zooToken.methods.totalSupply().call()
      console.log('zooToken.totalSupply', supply)
      const allowance = library.utils.toBN(supply)
      const tx = zooToken.methods.approve(zooKeeper.options.address, allowance).send({ from: account })

      if (tx) {
        setAllowance(true)
        setDisableApprove(false)
        setKeepApprove(false)
        toastClear()
        toastSuccess('Approval success!')
        console.log('approved', tx)
      }
    } catch (error) {
      console.error('APPROVE ERROR', error)
      setDisableApprove(false)
      toastClear()
      toastError('Failed to approve account')
    }
  }

  const formatError = (err) => {
    if (err.code) {
      return `Purchase failed: ${err.message}`
    } else {
      return `Purchase failed: ${err.toString().replace(/Error: Returned error: /, '')}`
    }
  }

  const isBalanceSufficient = (): boolean => {
    if (balance == 0) return false
    return true
  }

  const toggleBuyEggModal = useBuyEggModalToggle()
  const buyEgg = async () => {
    // setDisable(true)
    console.log('web3 account in buyEgg', account)
    toggleBuyEggModal()
    // if (balance === 0 || !isBalanceSufficient()) return toastError('You do not have sufficient zoo to perform this transaction!')

    // try {
    //   await zooKeeper.methods
    //     .buyEgg(1) // buy from first drop
    //     .send({ from: account, gasPrice: gasPrice })
    //     .then((res) => {
    //       toastClear()
    //       toastInfo('Transaction submitted.')
    //       console.log('bought egg', res)
    //       setDisable(false)
    //     })
    //     .catch((err) => {
    //       const message = formatError(err)
    //       setDisable(false)
    //       toastClear()
    //       toastError(message)
    //       console.error(message)
    //     })
    // } catch (err) {
    //   console.error(err)
    //   toastClear()
    //   setDisable(false)
    //   if (currentEggsOwned < 3) {
    //     toastError('Already purchased maximum eggs from drop. Check the market for more eggs')
    //   } else {
    //     toastError('Unable to purchase eggs. Try again later.')
    //   }
    // }
  }

  useMemo(() => {
    let mounted = true
    if (mounted) {
      mount()
    }
    return () => {
      mounted = false
    }
  }, [account, chainId])

  return (
    <
      // style={{ height: '100vh' }} className='flex items-center'
    >
      {/* pr-0 lg:pr-0 mr-0  */}

      <div className='flex flex-col relative filter drop-shadow z-10 w-full'>
        <div className='flex flex-col h-full'>
          <div className='flex flex-col justify-between h-full'>
            <div style={{ flex: 1 }} className='p-5 rounded'>
              <div className='flex items-end'>
                <div>
                  <div className='text-base font-bold currentColor mb-2 text-xl'>Wallet Balance</div>
                  <div className='text-base font-bold currentColor text-2xl'>
                    <span className='text-2xl'>{numberWithCommas(zooBalance.toFixed(2))} ZOO</span>
                  </div>
                </div>
                <div className='ml-4 relative inline-flex rounded-md shadow-sm'>
                  <div className='flex items-center  cursor-pointer' onClick={() => handleFunds()}>
                    <span
                      className={`flex items-center justify-center ml-2 py-2 text-base font-medium text-center rounded-md text-secondary hover:text-high-emphesis font-bold border rounded-xl text-high-emphesis bg-gradient-to-b from-btn1 to-btn2 hover:from-primary hover:to-primary ${
                        balance === 0 && 'gradient-border'
                      }`}
                      style={{ width: '120px', minHeight: '36px', marginBottom: '-2px' }}>
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
                <div className={`flex flex-wrap justify-center`}>
                  {keepApprove || !allowance ? (
                    <div className={'ml-2'}>
                      <button
                        disabled={disableApprove || allowance}
                        style={{ width: '120px', minHeight: '36px', marginBottom: '-2px' }}
                        className={`border rounded-xl shadow-sm focus:ring-2 focus:ring-offset-2 bg-opacity-80 text-primary border-gray-800 hover:bg-opacity-100  disabled:bg-opacity-80 px-0 py-2 text-base rounded disabled:cursor-not-allowed focus:outline-none w-full  bg-gradient-to-b from-btn1 to-btn2 hover:from-primary hover:to-primary ${
                          balance !== 0 && 'gradient-border'
                        }`}
                        onClick={approve}>
                        {allowance ? 'Approved' : disableApprove ? 'Processing' : 'Approve'}
                        {balance !== 0 && (
                          <span className='flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1'>
                            <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75'></span>
                            <span className='relative inline-flex rounded-full h-3 w-3 bg-white'></span>
                          </span>
                        )}
                      </button>
                    </div>
                  ) : currentEggsOwned > 2 ? (
                    <div></div>
                  ) : (
                    <div className={'ml-2'}>
                      <button
                        disabled={disable || !allowance}
                        className={` rounded-xl shadow-sm focus:ring-2 focus:ring-offset-2 bg-opacity-80 text-primaryhover:bg-opacity-100 focus:ring-offset-dark-700 disabled:bg-opacity-80 px-0 py-2 text-base rounded disabled:cursor-not-allowed focus:outline-none w-full bg-gradient-to-b from-btn1 to-btn2 hover:from-primary hover:to-primary ${
                          balance !== 0 && currentEggsOwned < 1 && 'gradient-border'
                        }`}
                        style={{ width: '120px', minHeight: '36px', marginBottom: '-2px' }}
                        onClick={buyEgg}>
                        {currentEggsOwned > 2 ? 'Market' : disable ? 'Processing' : 'Buy Eggs'}
                        {balance !== 0 && currentEggsOwned < 1 && (
                          <span className='flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1'>
                            <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75'></span>
                            <span className='relative inline-flex rounded-full h-3 w-3 bg-white'></span>
                          </span>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className='text-base font-bold currentColor pt-8 pb-2 text-xl'>{currentEggsOwned} Eggs Owned</div>
              <Eggs myEggs={Object.values(myEggs)} />
            </div>
          </div>
        </div>
      </div>
      <ToastListener />
      <BuyEggModal />
    </>
  )
}

export default Account

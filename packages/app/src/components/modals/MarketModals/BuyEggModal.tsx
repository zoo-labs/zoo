import { CircularProgress } from '@material-ui/core'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { CloseIcon } from 'components'
import { numberWithCommas } from 'components/Functions'
import { formatError, wait } from 'functions'
import { useWeb3 } from 'hooks'
import { useZooKeeper, useZooToken } from 'hooks/useContract'
import useToast from 'hooks/useToast'
import { isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'
import { Minus, Plus } from 'react-feather'
import { RiArrowDropDownLine } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from 'state'
import { ApplicationModal } from 'state/application/actions'
import { useBuyEggModalToggle, useModalOpen } from 'state/application/hooks'
import { useGasPrice } from 'state/network/hooks'
import { getZooBalance } from 'state/zoo/actions'
import CurrencySwitch from '../../CurrencySwitch'
import Modal from '../../NewModal'
import BidModalHeader from '../../NewModal/BidModalHeader'

interface BuyEggModalProps {}

const BuyEggModal: React.FC<BuyEggModalProps> = ({}) => {
  const buyEggModal = useModalOpen(ApplicationModal.BUYEGG)
  const toggleBuyEggModal = useBuyEggModalToggle()
  const [amount, setAmount] = useState(0)
  const gasPrice = useGasPrice()
  const [disabled, setDisabled] = useState(false)
  const [error, setError] = useState('')
  const [eggs, setEggs] = useState<Array<any>>([])
  const [checked, setChecked] = useState(true)
  const [quantitySwitch, setQuantitySwitch] = useState(false)
  const [bnbBalance, setBnbBalance] = useState(0)
  const zooBalance = useSelector<AppState, AppState['zoo']['zooBalance']>((state) => state.zoo.zooBalance)
  const myEggs = useSelector<AppState, AppState['zoo']['myEggs']>((state) => state.zoo.myEggs)
  const [zooBnbPrice, setZooBnbPrice] = useState(0)
  const { account } = useWeb3React()
  const { library } = useWeb3()

  useEffect(() => {
    if (amount > zooBalance) {
      setError(`You dont have enough ZOO`)
    } else if (error) {
      setError('')
    }
  }, [amount])

  useEffect(() => {
    mount()
    getBnbBalance()
    getZooBnbPrice()
  }, [myEggs])

  const mount = async () => {
    const newEggs = []
    await Object.values(myEggs).forEach((egg) => {
      newEggs.push(egg)
    })
    console.log('')
    const emptyLength = 3 - newEggs.length
    for (let index = 0; index < emptyLength; index++) {
      newEggs.push({})
    }
    console.log('newEggs', newEggs)
    const eggsLength = newEggs.filter((egg) => !isEmpty(egg) && egg.temporary).length
    console.log('eggsLength', eggsLength)
    wait(3000).then(() => (setEggs(newEggs), eggsLength === 0 && addEgg(newEggs)))
  }

  const addEgg = (altEggs: any) => {
    const newEggs = [...altEggs]
    const foundIndex = newEggs.findIndex((x) => isEmpty(x))
    console.log('foundIndex', foundIndex)
    newEggs[foundIndex] = { temporary: true }
    setAmount(360000 * newEggs.filter((egg) => !isEmpty(egg) && egg.temporary).length)
    console.log('adding egg', newEggs)
    setEggs(newEggs)
  }

  const removeEgg = () => {
    const newEggs = [...eggs]
    const foundIndex = newEggs.reverse().findIndex((x) => x.temporary)
    newEggs[foundIndex] = {}
    const finalEggs = newEggs.reverse()
    setAmount(360000 * finalEggs.filter((egg) => !isEmpty(egg) && egg.temporary).length)
    setEggs(finalEggs)
  }

  const zooKeeper = useZooKeeper()
  console.log('zooKEeper --->', zooKeeper)
  const zooToken = useZooToken()

  const { toastSuccess, toastError, toastInfo, clear } = useToast()

  const toastClear = () => {
    clear()
  }

  const getBnbBalance = async () => {
    console.log('account', account)
    if (!account) return
    try {
      await library.eth.getBalance(account).then((val) => {
        const divisor = parseFloat(Math.pow(10, 18).toString())
        const balance = parseFloat(val) / divisor
        console.log('balance', balance)
        setBnbBalance(parseFloat(balance.toFixed(4)))
      })
    } catch (e) {
      console.error('ISSUE LOADING BNB BALANCE \n', e)
    }
  }

  const getZooBnbPrice = async () => {
    const price = await zooKeeper.zooPriceBNB()
    console.log('zooBnbPrice', price)
    setZooBnbPrice(price)
  }

  const dispatch = useDispatch()
  const buyEggs = async () => {
    setDisabled(true)
    const eggsLength = eggs.filter((egg) => !isEmpty(egg) && egg.temporary).length
    const eggPriceBNB = new BigNumber(10 ** 18)
      .times(420000 * quantity)
      .div(zooBnbPrice)
      .div(10 ** 18)
      .toFixed(4)

    if (checked) {
      try {
        zooKeeper.methods
          .buyEggsBNB(1, eggsLength) // buy from first drop
          .send({ from: account, gasPrice: gasPrice, value: library.utils.toWei(eggPriceBNB) })
          .then((res) => {
            toastClear()
            toastInfo('Transaction submitted.')
            console.log('bought egg in bnb', res)

            setDisabled(false)
            dispatch(getZooBalance(account, zooToken))
            toggleBuyEggModal()
          })
          .catch((err) => {
            const message = formatError(err)
            setDisabled(false)
            toastClear()
            toastError(message)
            console.error(message)
            toggleBuyEggModal()
          })
      } catch (err) {
        console.error(err)
        toastClear()
        setDisabled(false)
        toastError('Unable to purchase eggs. Try again later.')
      }
    } else {
      try {
        zooKeeper.methods
          .buyEggs(1, eggsLength) // buy from first drop
          .send({ from: account, gasPrice: gasPrice })
          .then((res) => {
            toastClear()
            toastInfo('Transaction submitted.')
            console.log('bought egg', res)

            setDisabled(false)
            dispatch(getZooBalance(account, zooToken))
            toggleBuyEggModal()
          })
          .catch((err) => {
            const message = formatError(err)
            setDisabled(false)
            toastClear()
            toastError(message)
            console.error(message)
            toggleBuyEggModal()
          })
      } catch (err) {
        console.error(err)
        toastClear()
        setDisabled(false)
        toastError('Unable to purchase eggs. Try again later.')
      }
    }
    // console.log(testEggs)
    // dispatch(addEggs(testEggs))
    // toggleBuyEggModal()
  }

  const quantity = eggs.filter((egg) => !isEmpty(egg) && egg.temporary).length
  const eggPriceBNB = new BigNumber(10 ** 18)
    .times(420000 * quantity)
    .div(zooBnbPrice)
    .div(10 ** 18)
    .toFixed(4)

  return (
    <Modal isOpen={buyEggModal} onDismiss={() => null} isMax>
      <BidModalHeader onBack={() => toggleBuyEggModal()} className='absolute p-6 w-full ' />
      <div className='flex flex-wrap h-full'>
        <div className='flex flex-col w-full md:w-1/2  justify-center items-center shadow-lg relative'>
          <div className='max-w-2xl w-4/5 lg:w-1/2 p-4'>
            <div className='w-full flex MB-6 flex-col'>
              <div className='text-gray-500 font-semibold text-sm'>BUY EGGS</div>
              <div className='text-2xl lg:text-4xl font-bold'>
                {numberWithCommas(checked ? bnbBalance.toFixed(2) : zooBalance.toFixed(2))} {checked ? 'BNB' : 'ZOO'}
              </div>
            </div>
            <div className=' my-8 w-full'>
              <div className='flex h-20 '>
                <div className=' mr-2 w-14 rounded flex justify-center items-center'>
                  <img style={{ verticalAlign: 'middle' }} src={`/static/images/basic.jpg`} className='h-full transition-transform w-full duration-1000 rounded h-full' />
                </div>
                <div className='w-full h-full flex px-4 justify-between'>
                  <div className='flex flex-col justify-center'>
                    <div className='mb-2'>Egg</div>
                    <div className='text-gray-400 flex mt-2 items-center'>
                      Qty
                      <button onClick={() => setQuantitySwitch(true)} className='ml-2 text-gray-300 hover:bg-dark-800 p-1 rounded-md' type='button'>
                        <span className='font-semibold tex-gray-900 flex'>
                          {quantity} <RiArrowDropDownLine />
                        </span>
                      </button>
                    </div>
                  </div>
                  <div className='flex w-auto items-center text-gray-400 font-semibold'>
                    {checked ? eggPriceBNB : numberWithCommas(360000.0 * quantity)} {checked ? 'BNB' : 'ZOO'}
                  </div>
                </div>
              </div>
            </div>
            {error && <div className='text-red-500 mb-1 text-xs font-semibold'>{error}</div>}
            <h6 className='my-1 text-xs text-gray-400 font-semibold'>
              One egg costs{' '}
              <span className='font-bold text-white'>
                {' '}
                {numberWithCommas(checked ? (zooBnbPrice * 360000).toFixed(2) : 360000.0)} {checked ? 'BNB' : 'ZOO'} each
              </span>
            </h6>
            <h6 className='mb-2 text-xs text-gray-400 font-semibold'>A maximum of 3 eggs are allowed per account</h6>
          </div>
          <div className='absolute lg:bottom-60 bottom-10 left-50'>
            <CurrencySwitch checked={checked} checkFunc={() => setChecked(!checked)} />
          </div>
        </div>
        <div className='flex flex-col w-full md:w-1/2 bg-modal-dark items-center justify-center'>
          <div className='w-1/2'>
            <div className='flex'>
              <button
                onClick={() => buyEggs()}
                className='text-white my-4 w-full inline-flex justify-center items-center h-10 px-6 bg-primary-light hover:bg-primary rounded-lg font-bold text-lg leading-none'
                style={{ transition: 'all .2s' }}>
                {disabled ? <CircularProgress color='secondary' size={20} thickness={4} /> : 'Pay'}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={quantitySwitch} onDismiss={() => setQuantitySwitch(false)}>
        <div className='w-full mb-4'>
          <div className='flex h-20 '>
            <div className=' mr-2 w-14 rounded flex justify-center items-center'>
              <img style={{ verticalAlign: 'middle' }} src={`/static/images/basic.jpg`} className='h-full transition-transform w-full duration-1000 rounded h-full' />
            </div>
            <div className='w-full h-full flex px-4 justify-between'>
              <div className='flex flex-col justify-center'>
                <div className='mb-1'>Update Quantity</div>
                <div className='text-gray-400 flex mt-1 font-semibold items-center'>Egg</div>
              </div>
              <div className='flex w-auto items-center text-gray-400 font-semibold'>
                <div className='p-1 bg-white rounded-full cursor-pointer' onClick={() => setQuantitySwitch(false)}>
                  <CloseIcon color='white' />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className='flex justify-center  items-center'>
            <div
              className={`cursor-pointer h-10 w-10 rounded-full ${
                eggs.filter((egg) => !isEmpty(egg) && egg.temporary).length > 0 ? 'bg-dark-700' : 'bg-dark-800'
              }  flex justify-center items-center`}
              onClick={() => removeEgg()}>
              <Minus size={25} />
            </div>
            <div className='mx-6 px-4 py-3 rounded border border-solid'>{eggs.filter((egg) => !isEmpty(egg) && egg.temporary).length}</div>
            <div className='cursor-pointer h-10 w-10 rounded-full bg-dark-700 flex justify-center items-center' onClick={() => addEgg(eggs)}>
              <Plus size={25} />
            </div>
          </div>
          <div className='flex'>
            <button
              onClick={() => setQuantitySwitch(false)}
              className='text-white mt-4 w-full inline-flex justify-center items-center h-10 px-6 bg-primary-light hover:bg-primary rounded-lg font-bold text-lg leading-none'
              style={{ transition: 'all .2s' }}>
              Update
            </button>
          </div>
        </div>
      </Modal>
    </Modal>
  )
}

export default BuyEggModal

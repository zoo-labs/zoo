import React, { useState, useEffect } from 'react'
import { ApplicationModal } from 'state/application/actions'
import { useModalOpen, useBuyEggModalToggle } from 'state/application/hooks'
import Modal from '../../NewModal'
import BidModalHeader from '../../NewModal/BidModalHeader'
import { AppState } from 'state'
import { useDispatch, useSelector } from 'react-redux'
import { ArrowDown, Minus, MinusCircle, Plus, PlusCircle } from 'react-feather'
import { numberWithCommas } from 'components/Functions'
import { isEmpty } from 'lodash'
import { ArrowDownIcon, ArrowDropDownIcon, CloseIcon } from 'components'
import { RiArrowDropDownLine } from 'react-icons/ri'
import { formatError, wait } from 'functions'
import Moralis from 'moralis/types'
import { useWeb3React } from '@web3-react/core'
import { Egg } from 'types/zoo'
import { useWeb3 } from 'hooks'
import { getToken, getZooKeeper } from 'util/contracts'
import useToast from 'hooks/useToast'
import { getZooBalance } from 'state/zoo/actions'
interface BuyEggModalProps {}

const BuyEggModal: React.FC<BuyEggModalProps> = ({}) => {
  const buyEggModal = useModalOpen(ApplicationModal.BUYEGG)
  const toggleBuyEggModal = useBuyEggModalToggle()
  const [amount, setAmount] = useState(0)
  const [disabled, setDisabled] = useState(false)
  const [error, setError] = useState('')
  const [eggs, setEggs] = useState<Array<any>>([])
  const [quantitySwitch, setQuantitySwitch] = useState(false)
  const zooBalance = useSelector<AppState, AppState['zoo']['zooBalance']>((state) => state.zoo.zooBalance)
  const myEggs = useSelector<AppState, AppState['zoo']['myEggs']>((state) => state.zoo.myEggs)
  const { account } = useWeb3React()
  const web3 = useWeb3()
  const { chainID, gasPrice } = web3

  useEffect(() => {
    if (amount > zooBalance) {
      setError(`You dont have enough ZOO`)
    } else if (error) {
      setError('')
    }
  }, [amount])
  useEffect(() => {
    console.log('hiiii')

    mount()

    // const fakeEggs = [{ original: 'true' }]
    // fakeEggs.forEach((egg) => {
    //   newEggs.push(egg)
    // })
  }, [myEggs])
  const mount = async () => {
    const newEggs = []
    await Object.values(myEggs).forEach((egg) => {
      newEggs.push(egg)
    })
    console.log('')
    const emptyLength = 3 - newEggs.length
    console.log('emptyLength', emptyLength)
    for (let index = 0; index < emptyLength; index++) {
      newEggs.push({})
    }
    console.log('newEggs', newEggs)

    wait(3000).then(() => setEggs(newEggs))
  }
  const addEgg = () => {
    const newEggs = [...eggs]
    console.log('eggs', eggs)

    const foundIndex = newEggs.findIndex((x) => isEmpty(x))
    console.log('foundIndex', foundIndex)
    newEggs[foundIndex] = { temporary: true }
    setAmount(300000 * newEggs.filter((egg) => !isEmpty(egg) && egg.temporary).length)
    console.log('adding egg', newEggs)

    setEggs(newEggs)
  }
  const removeEgg = () => {
    const newEggs = [...eggs]
    const foundIndex = newEggs.reverse().findIndex((x) => x.temporary)
    newEggs[foundIndex] = {}
    const finalEggs = newEggs.reverse()
    setAmount(300000 * finalEggs.filter((egg) => !isEmpty(egg) && egg.temporary).length)
    setEggs(finalEggs)
  }
  const zooKeeper = getZooKeeper(web3)
  const zooToken = getToken(web3)

  const { toastSuccess, toastError, toastInfo, clear } = useToast()

  const toastClear = () => {
    clear()
  }

  const dispatch = useDispatch()
  const buyEggs = async () => {
    const eggsLength = eggs.filter((egg) => !isEmpty(egg) && egg.temporary).length
    try {
      await zooKeeper.methods
        .buyEggs(1, eggsLength) // buy from first drop
        .send({ from: account, gasPrice: gasPrice })
        .then((res) => {
          toastClear()
          toastInfo('Transaction submitted.')
          console.log('bought egg', res)

          setDisabled(false)
          toggleBuyEggModal()
          dispatch(getZooBalance(account, zooToken))
        })
        .catch((err) => {
          const message = formatError(err)
          setDisabled(false)
          toastClear()
          toastError(message)
          console.error(message)
        })
    } catch (err) {
      console.error(err)
      toastClear()
      setDisabled(false)

      toastError('Unable to purchase eggs. Try again later.')
    }
    // console.log(testEggs)
    // dispatch(addEggs(testEggs))
    toggleBuyEggModal()
  }
  return (
    <Modal isOpen={buyEggModal} onDismiss={() => null} isMax>
      <BidModalHeader onBack={() => toggleBuyEggModal()} className='absolute p-6 w-full ' />
      <div className='flex flex-wrap h-full'>
        <div className='flex flex-col flex-1  justify-center items-center shadow-lg'>
          <div className='max-w-2xl w-1/2 p-4'>
            <div className='w-full flex MB-6 flex-col'>
              <div className='text-gray-500 font-semibold text-sm'>BUY EGGS</div>
              <div className='text-4xl font-bold'>{numberWithCommas(zooBalance.toFixed(2))} ZOO</div>
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
                          {eggs.filter((egg) => !isEmpty(egg) && egg.temporary).length} <RiArrowDropDownLine />
                        </span>
                      </button>
                    </div>
                  </div>
                  <div className='flex w-auto items-center text-gray-400 font-semibold'>300,000 ZOO each</div>
                </div>
              </div>
            </div>
            {error && <div className='text-red-500 mb-1 text-xs font-semibold'>{error}</div>}
            <h6 className='my-1 text-xs text-gray-400 font-semibold'>
              One egg costs <span className='font-bold text-white'>300,000 ZOO</span>
            </h6>
            <h6 className='mb-2 text-xs text-gray-400 font-semibold'>A maximum of 3 eggs are allowed per account</h6>
          </div>
        </div>
        <div className='flex flex-col flex-1 bg-modal-dark items-center justify-center'>
          <div className='w-1/2'>
            <div className='flex'>
              <button
                onClick={() => buyEggs()}
                className='text-white my-4 w-full inline-flex justify-center items-center h-10 px-6 bg-primary-light hover:bg-primary rounded-lg font-bold text-lg leading-none'
                style={{ transition: 'all .2s' }}>
                Pay
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
            <div className='cursor-pointer h-10 w-10 rounded-full bg-dark-700 flex justify-center items-center' onClick={() => addEgg()}>
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
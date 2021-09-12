import React, { useState, useEffect, useRef } from 'react'
import { ApplicationModal } from 'state/application/actions'
import { useModalOpen, useBuyEggModalToggle } from 'state/application/hooks'
import Modal from '../../NewModal'
import BidModalHeader from '../../NewModal/BidModalHeader'
import { AppState } from 'state'
import { useSelector } from 'react-redux'
import { useIsAnimationMode } from 'state/user/hooks'
import { MinusCircle, PlusCircle } from 'react-feather'
import { numberWithCommas } from 'components/Functions'
import { isEmpty } from 'lodash'
interface BuyEggModalProps {}

const BuyEggModal: React.FC<BuyEggModalProps> = ({}) => {
  const buyEggModal = useModalOpen(ApplicationModal.BUYEGG)
  const toggleBuyEggModal = useBuyEggModalToggle()
  const [amount, setAmount] = useState(0)
  const [error, setError] = useState('')
  const [eggs, setEggs] = useState([])
  const zooBalance = useSelector<AppState, AppState['zoo']['zooBalance']>((state) => state.zoo.zooBalance)
  const myEggs = useSelector<AppState, AppState['zoo']['myEggs']>((state) => state.zoo.myEggs)

  const isAnimated = useIsAnimationMode()
  const tinderRef = useRef(null)
  const inputCheck = () => {}
  useEffect(() => {
    if (amount > zooBalance) {
      setError(`You dont have enough ZOO`)
    } else if (error) {
      setError('')
    }
  }, [amount])
  useEffect(() => {
    const newEggs = []
    Object.values(myEggs).forEach((egg) => {
      newEggs.push(egg)
    })
    // const fakeEggs = [{ original: 'true' }]
    // fakeEggs.forEach((egg) => {
    //   newEggs.push(egg)
    // })
    const emptyLength = 3 - newEggs.length
    for (let index = 0; index < emptyLength; index++) {
      newEggs.push({})
    }
    setEggs(newEggs)
  }, [])
  const addEgg = () => {
    const newEggs = [...eggs]
    const foundIndex = newEggs.findIndex((x) => isEmpty(x))
    newEggs[foundIndex] = { temporary: true }
    setAmount(300000 * newEggs.filter((egg) => !isEmpty(egg) && egg.temporary).length)

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
  return (
    <Modal isOpen={buyEggModal} onDismiss={() => null} isMax>
      <BidModalHeader onBack={() => toggleBuyEggModal()} className='absolute p-6 w-full ' />
      <div className='flex flex-wrap h-full'>
        <div className='flex flex-col flex-1 bg-modal-dark items-center justify-center'>
          <div className='lg:w-1/3 w-full'>
            <div className=' p-px   bg-gradient-to-b from-btn1  to-btn2 rounded flex relative'>
              <div className='h-full w-full bg-cover rounded bg-no-repeat'>
                <div className=''>
                  <img style={{ verticalAlign: 'middle' }} src={`/static/video/egg.gif`} className='h-full transition-transform w-full duration-1000 rounded h-full' />
                </div>
              </div>
            </div>
            <div className='py-4 flex flex-col no-underline cursor-pointer'>
              <div className='py-2 flex flex-grow flex-col no-underline cursor-pointer'>
                <div className='flex flex-grow flex-col'>
                  <div className='mb-2 flex '>
                    <div className='mr-auto mt-1 font-semibold'>Egg</div>
                    <div
                      className='flex-shrink-0 ml-2 px-2 uppercase primary font-bold rounded-sm text-xs flex items-center justify-center'
                      style={{ boxShadow: 'inset 0 0 0 1px rgb(140, 79, 248)' }}>
                      300000 ZOO
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col flex-1  justify-center items-center'>
          <div className='max-w-2xl w-2/3 p-4'>
            <div className='flex justify-between mb-4'>
              <label className='leading-snug text-md font-semibold'>Buy Eggs with ZOO</label>
              <h5 className='text-sm text-gray-400'>
                Your balance: <span className='text-white font-bold'> {numberWithCommas(zooBalance.toFixed(2)) || 0} ZOO</span>
              </h5>
            </div>
            <div className=' my-8 w-full'>
              <div className='flex justify-between items-center'>
                <div className='flex justify-around w-1/3'>
                  <div className='cursor-pointer' onClick={() => addEgg()}>
                    <PlusCircle size={60} />
                  </div>
                  <div className='cursor-pointer ' onClick={() => removeEgg()}>
                    <MinusCircle size={60} />
                  </div>
                </div>
                <div className='flex  items-center flex-wrap'>
                  {eggs.map((egg) => {
                    return (
                      <div className={`${isEmpty(egg) ? 'border border-gray-300 border-dashed' : 'bg-dark-1000'} h-40 mr-4 w-24  rounded flex justify-center items-center`}>
                        {egg.temporary || isEmpty(egg) ? (
                          <div></div>
                        ) : (
                          <img style={{ verticalAlign: 'middle' }} src={`/static/images/basic.jpg`} className='h-full transition-transform w-full duration-1000 rounded h-full' />
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
            {error && <div className='text-red-500 mb-1 text-xs font-semibold'>{error}</div>}
            <h6 className='my-1 text-xs text-gray-400 font-semibold'>
              One egg costs <span className='font-bold text-white'>300,000 ZOO</span>
            </h6>
            <h6 className='mb-2 text-xs text-gray-400 font-semibold'>A maximum of 3 eggs are allowed per account</h6>
            <div className='flex'>
              <button
                onClick={() => toggleBuyEggModal()}
                className='text-white my-4 w-1/2 inline-flex justify-center items-center h-10 px-6 bg-dark-1000 font-bold text-lg leading-none  '
                style={{ transition: 'all .2s' }}>
                {numberWithCommas(amount)} ZOO
              </button>
              <button
                onClick={() => toggleBuyEggModal()}
                className='text-white my-4 w-full inline-flex justify-center items-center h-10 px-6 bg-primary-light hover:bg-primary rounded-lg font-bold text-lg leading-none  '
                style={{ transition: 'all .2s' }}>
                Buy
              </button>
            </div>
            {/* <a className=' text-xs primary font-semibold text-center underline'>How do auctions work ?</a> */}
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default BuyEggModal

import React, { useState, useEffect } from 'react'
import { ApplicationModal } from 'state/application/actions'
import { useModalOpen, useBidModalToggle } from 'state/application/hooks'
import Modal from '../../NewModal'
import ModalHeader from '../../NewModal/Header'
import { numberWithCommas } from 'components/Functions'
import { AppState } from 'state'
import { useSelector } from 'react-redux'

interface BidModalProps {}

const BidModal: React.FC<BidModalProps> = ({}) => {
  const bidModal = useModalOpen(ApplicationModal.BID)
  const toggleBidModal = useBidModalToggle()
  const [amount, setAmount] = useState('0.45')
  const [error, setError] = useState('')
  const zooBalance = useSelector<AppState, AppState['zoo']['zooBalance']>((state) => state.zoo.zooBalance)

  const inputCheck = () => {}
  useEffect(() => {
    if (parseFloat(amount) > zooBalance) {
      setError(`You dont have enough ZOO`)
    } else if (error) {
      setError('')
    }
  }, [amount])
  return (
    <Modal isOpen={bidModal} onDismiss={() => null} maxWidth={440}>
      <ModalHeader onClose={() => toggleBidModal()} title='Place a bid' />
      <div className='mb-8'>
        <h6 className='leading-normal text-xs'>
          You are about to purchase an <span className='pink font-semibold text-lg'>EGG</span> from <span className='primary font-semibold  text-lg'>0x0770...08cb</span>
        </h6>
      </div>
      <div className='flex justify-between mb-4'>
        <label className='leading-snug text-md font-semibold'>Your Bid</label>
        <h5 className='text-md'>
          Your balance: <span className='text-xs text-gray-400 font-semibold'> {numberWithCommas(zooBalance) || 0} ZOO</span>
        </h5>
      </div>
      <div className='relative mb-3 w-full'>
        <input
          onChange={(e) => (setAmount(e.target.value), inputCheck())}
          value={amount || '0'}
          className='w-full border border-solid rounded-md py-2 px-3 focus:outline-none font-semibold leading-snug text-md bg-dark-800 '
        />
        <h6 className='absolute top-1/2 right-4 leading-normal font-semibold transform -translate-y-2/4 '>ZOO</h6>
      </div>
      {error && <div className='text-red-500 mb-1 text-xs font-semibold'>{error}</div>}
      <h6 className='mb-1 text-xs text-gray-400 font-semibold'>
        You must bid at least <span className='font-bold text-white'>0.45 ZOO</span>
      </h6>
      <h6 className='mb-2 text-xs text-gray-400 font-semibold'>The next bid must be 5% more than the current bid</h6>
      <div>
        <button
          onClick={() => toggleBidModal()}
          className='text-white my-4 w-full inline-flex justify-center items-center h-10 px-6 bg-primary-light hover:bg-primary rounded-full font-bold text-lg leading-none  '
          style={{ transition: 'all .2s' }}>
          Place a bid
        </button>
        <h6 className='mb-4 text-xs text-gray-300 font-semibold text-center'>You cannot withdraw a bid once submitted.</h6>
      </div>
      <a className=' text-xs text-gray-500 font-semibold text-center underline'>How do auctions work ?</a>
    </Modal>
  )
}

export default BidModal

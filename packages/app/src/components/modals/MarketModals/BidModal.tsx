import { useWeb3React } from '@web3-react/core'
import { numberWithCommas } from 'components/Functions'
import { ChainId } from 'constants/Chains'
import { addresses } from 'constants/contracts'
import { accountEllipsis, formatError, getEmoji } from 'functions'
import { useMatchBreakpoints } from 'hooks'
import { useMedia, useZooToken } from 'hooks/useContract'
import useToast from 'hooks/useToast'
import useWeb3 from 'hooks/useWeb3'
import React, { useEffect, useState } from 'react'
import { FaMoneyBill } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { AppState } from 'state'
import { ApplicationModal } from 'state/application/actions'
import { useBidModalToggle, useModalOpen } from 'state/application/hooks'
import { useGasPrice } from 'state/network/hooks'
import { useIsAnimationMode } from 'state/user/hooks'
import Modal from '../../NewModal'
import BidModalHeader from '../../NewModal/BidModalHeader'

interface BidModalProps {
  item: any
}

const BidModal: React.FC<BidModalProps> = ({ item }) => {
  const { account } = useWeb3React()
  const { library, chainId } = useWeb3()

  const bidModal = useModalOpen(ApplicationModal.BID)
  const toggleBidModal = useBidModalToggle()
  const [amount, setAmount] = useState('360000')
  const [error, setError] = useState('')
  const gasPrice = useGasPrice()
  const zooBalance = useSelector<AppState, AppState['zoo']['zooBalance']>((state) => state.zoo.zooBalance)
  const isAnimated = useIsAnimationMode()

  const { toastError, toastInfo, clear } = useToast()
  console.log(item)
  const { isSm } = useMatchBreakpoints()
  const media = useMedia()
  const zooToken = useZooToken()

  const chainAddresses = (addresses[chainId] as any) || (addresses[ChainId.BSC] as any)

  const setBid = async () => {
    try {
      media.methods
        .setBid(item.tokenID, { amount: Number(amount), currency: chainAddresses.ZOO, bidder: account, recipient: account, sellOnShare: { value: 0 } }) //set Ask price for token
        .send({ from: account, gasPrice: gasPrice })
        .then((res) => {
          clear()
          toastInfo('Ask Price Set.')
          console.log('Set Ask Price', res)
          toggleBidModal()
        })
        .catch((err) => {
          const message = formatError(err)
          toastError(message)
          console.error(message)
        })
    } catch (err) {
      console.error(err)
      toastError('Unable to purchase eggs. Try again later.')
    }
    // console.log(testEggs)
    // dispatch(addEggs(testEggs))
  }

  const inputCheck = () => {}

  const handleOnChange = (e) => {
    if (e.target.value != '-') {
      setAmount(e.target.value)
    }
  }

  useEffect(() => {
    if (parseFloat(amount) > zooBalance) {
      setError(`You dont have enough ZOO`)
    } else if (error) {
      setError('')
    }
  }, [amount])

  const getVideo = () => {
    return isAnimated ? (
      <div className=''>
        <video
          controls
          className='rounded'
          autoPlay
          playsInline
          loop
          muted
          style={{
            pointerEvents: 'none',
            maxHeight: 600,
            alignSelf: 'center',
          }}>
          <source src={'/static/video/egg.mp4'} type='video/mp4'></source>
        </video>
      </div>
    ) : (
      <img
        style={{ verticalAlign: 'middle' }}
        src={`${item.imageUrl || window.location.origin + '/static/video/egg.gif'}`}
        className='h-full transition-transform w-full duration-1000 rounded h-full'
      />
    )
  }

  return (
    <Modal isOpen={bidModal} onDismiss={() => null} isMax>
      <BidModalHeader onBack={() => toggleBidModal()} className='absolute p-6 w-full ' />

      <div className='flex md:flex-wrap h-full flex-wrap-reverse md:pt-0 pt-16'>
        <div className='flex flex-col w-full md:w-1/2 bg-modal-dark items-center justify-center'>
          <div className='lg:w-1/3 w-1/3 md:w-2/3'>
            <div className=' p-px   bg-gradient-to-b from-btn1  to-btn2 rounded  relative'>
              <div className=' bg-cover rounded bg-no-repeat'>{getVideo()}</div>
            </div>
          </div>
          <div className='py-4 flex flex-col no-underline cursor-pointer lg:w-1/3 md:w-2/3'>
            <div className='py-2 flex flex-grow flex-col no-underline cursor-pointer'>
              <div className='flex flex-grow flex-col'>
                <div className='mb-2 flex '>
                  <div className='mr-auto mt-1 font-semibold'>
                    {item.name || 'Egg'} <span className='text-xs text-gray-500'>({item.tokenID || ''})</span>
                  </div>
                  <div
                    className='flex-shrink-0 ml-2 px-2 uppercase primary font-bold rounded-sm text-xs flex items-center justify-center'
                    style={{ boxShadow: 'inset 0 0 0 1px rgb(140, 79, 248)' }}>
                    300k ZOO
                  </div>
                </div>
                <div className=' flex '>
                  <div className='mr-auto mt-1 font-semibold flex text-xs text-gray-500'>
                    <div className='h-4 w-4 rounded-full bg-gradient-to-b from-btn1 to-btn2 mr-1'></div>
                    {accountEllipsis(item.owner || '')}
                  </div>
                  <div className='flex-shrink-0 ml-2  uppercase font-bold rounded-sm text-xs flex items-center justify-center'>3 days Left</div>
                </div>
              </div>
              <div className=' border-t border-solid border-gray-700 flex items-center justify-between mt-2 pt-2 text-sm text-gray-800'>
                <div className='flex items-center text-xs text-gray-500 font-semibold'>
                  <div className='mr-1'>
                    <FaMoneyBill />
                  </div>
                  Highest bid <span className='ml-1'>200k ZOO</span>
                </div>
                <div className='text-xs text-gray-500 font-semibold'>{item.yield ? `${item.yield} Yields/Day ${getEmoji(item.rarity)}` : ''} </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col w-full md:w-1/2 justify-center items-center'>
          <div className='max-w-2xl w-3/4 lg:w-1/2  p-4'>
            {/* <div className='mb-8'>
              <h6 className='leading-normal text-xs'>
                You are about to purchase an <span className='pink font-semibold text-lg'>EGG</span> from <span className='primary font-semibold  text-lg'>0x0770...08cb</span>
              </h6>
            </div> */}
            <div className='flex justify-between mb-4'>
              <label className='leading-snug text-md font-semibold'>Your Bid</label>
              <h5 className='text-sm text-gray-400'>
                Your balance: <span className='text-white font-bold'> {numberWithCommas(zooBalance.toFixed(2)) || 0} ZOO</span>
              </h5>
            </div>
            <div className='relative mb-3 w-full'>
              <input
                type='number'
                min='0'
                onChange={(e) => handleOnChange(e)}
                value={amount}
                className=' w-full border border-solid rounded-md py-2 px-3 focus:outline-none font-semibold leading-snug text-md bg-dark-800 '
              />
              <h6 className='absolute top-1/2 right-4 leading-normal font-semibold transform -translate-y-2/4 '>ZOO</h6>
            </div>
            {error && <div className='text-red-500 mb-1 text-xs font-semibold'>{error}</div>}
            <h6 className='my-1 text-xs text-gray-400 font-semibold'>
              You must bid at least <span className='font-bold text-white'>360,000 ZOO</span>
            </h6>
            <h6 className='mb-2 text-xs text-gray-400 font-semibold'>The next bid must be 5% more than the current bid</h6>
            <div>
              <button
                onClick={setBid}
                className='text-white my-4 w-full inline-flex justify-center items-center h-10 px-6 bg-primary-light hover:bg-primary rounded-lg font-bold text-lg leading-none  '
                style={{ transition: 'all .2s', cursor: Number(amount) < 0 ? 'default' : 'pointer' }}>
                Place a bid
              </button>
              <h6 className='mb-4 text-xs text-gray-300 font-semibold text-center'>You cannot withdraw a bid once submitted.</h6>
            </div>
            <a className=' text-xs primary font-semibold text-center underline'>How do auctions work ?</a>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default BidModal

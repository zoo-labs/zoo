import React from 'react'
import { StopCircle } from 'react-feather'
import { FaArrowLeft, FaArrowRight, FaMoneyBill } from 'react-icons/fa'
import Countdown from 'react-countdown'
import { useBidModalToggle } from 'state/application/hooks'
import { useHistory } from 'react-router'
import { accountEllipsis, getEmoji } from 'functions'
import Moralis from 'moralis'

interface MyBidProps {
  bidRef: any
  showArrow: boolean
  showLeftArrow: boolean
  showRightArrow: boolean
  datum: any
  placeBid: () => void
  viewItem: () => void
}

const MyBid: React.FC<MyBidProps> = ({ bidRef, showArrow, showLeftArrow, showRightArrow, datum, placeBid, viewItem }) => {
  const [data, setdata] = React.useState<any>({})
  const history = useHistory()
  React.useEffect(() => {
    async function findPrice() {
      try {
        const options = {
          address: datum.owner,
        }
        console.log('Price0======================')
        // const price = await Moralis.Web3API.token.getTokenPrice(options);
        // setdata(price)
        // console.log("Price======================",price)
      } catch (error) {
        console.log('ërror=========================', error)
      }
    }
    findPrice()
  }, [datum])
  console.log('data =====================================', data)
  return (
    <div className='flex flex-start flex-wrap jusrify-center items-center px-4 w-full lg:w-2/3 md:w-full '>
      <div className='hidden md:inline-flex relative md:w-1/3 lg:w-1/2 flex justify-center'>
        <div className=' p-px lg:w-3/4 w-full  h-full bg-gradient-to-b from-btn1  to-btn2 rounded-lg flex relative'>
          <div className='h-full w-full bg-cover rounded bg-no-repeat parent'>
            <img src='/static/video/egg.gif' className='w-full rounded-lg h-full transition-transform duration-1000' style={{ verticalAlign: 'middle' }} />
          </div>
        </div>
      </div>
      <div className=' md:ml-20 flex-shrink-0 pb-24 w-full lg:w-1/3 md:w-1/3 py-4'>
        <h1 className='mb-4 font-bold text-5xl'>
          {datum.name || 'Egg'} <span className='text-lg'>{datum.tokenID}</span>
        </h1>
        <div className='flex -mx-4 mb-4 lg:mb-8 flex-wrap'>
          <div className='flex flex-1 items-center mx-4 my-1'>
            <div className='h-8 lg:h-10 w-8 lg:w-10 rounded-full bg-gradient-to-b from-btn1 to-btn2 mr-2'></div>
            {/* <Avatar alt='Remy Sharp' src='/static/images/avatar.jpg' className='mr-2' style={{ width: 40, height: 40 }} /> */}
            <div className='flex-grow'>
              <div className='text-sm text-gray-500'>Owner</div>
              <div className='font-semibold'>{accountEllipsis(datum.owner || '')}</div>
            </div>
          </div>
          <div className='flex  flex-1 items-center mx-4 my-1'>
            <div className='flex items-center justify-center rounded-full h-8 lg:h-10 w-8 lg:w-10 mr-2 bg-pink'>
              <StopCircle />
            </div>
            <div className='flex-grow'>
              <div className='text-sm text-gray-500'>Reserve Price</div>
              <div className='font-semibold'>
                3.5k ZOO <span className='text-xs text-gray-500'>$6800</span>
              </div>
            </div>
          </div>
        </div>
        <div
          className=' bg-dark-800 mb-5 lg:mb-10 py-10 px-4 rounded-xl text-center'
          style={{ boxShadow: '0px 64px 64px -48px rgba(31, 47, 70, 0.12)', border: '2px solid #E6E8EC', borderColor: '#23262F' }}>
          <div className='flex'>
            <div className='flex flex-1 items-center flex-col'>
              <div className='font-semibold text-sm leading-normal'>Current Bid</div>
              <div className='text-xl lg:text-3xl font-bold leading-tight'>100K ZOO</div>
              <div className='mb-4 text-md lg:text-lg font-semibold text-gray-500 leading-snug'>$3,618.36</div>
            </div>
            <div className='flex flex-1 items-center flex-col'>
              <div className='font-semibold text-sm leading-normal'>My Bid</div>
              <div className='text-xl lg:text-3xl font-bold leading-tight'>20K ZOO</div>
              <div className='mb-4 text-md lg:text-lg font-semibold text-gray-500 leading-snug'>$1,618.36</div>
            </div>
          </div>
          <div className='font-semibold text-sm leading-snug'>Auction ending in</div>
          <div className='flex mt-2 justify-center'>
            <Countdown
              zeroPadTime={6}
              date={Date.now() + 5000000}
              renderer={({ hours, minutes, seconds, completed }) => {
                if (completed) {
                  return <h2></h2>
                } else {
                  return (
                    <>
                      <span className='mr-2 lg:mr-4 flex flex-col items-center flex-shrink w-8 lg:w-16'>
                        <span className='text-2xl lg:text-4xl tracking-tight leading-tight font-bold'>
                          {hours < 10 ? '0' : ''}
                          {hours}
                        </span>
                        <span className='text-gray-500 font-semibold leading-normal'>Hrs</span>
                      </span>
                      <span className='mr-2 lg:mr-4 flex flex-col items-center flex-shrink w-8 lg:w-16'>
                        <span className='text-2xl lg:text-4xl tracking-tight leading-tight font-bold'>
                          {minutes < 10 ? '0' : ''}
                          {minutes}
                        </span>
                        <span className='text-gray-500 font-semibold leading-normal'>Min</span>
                      </span>
                      <span className='mr-2 lg:mr-4 flex flex-col items-center flex-shrink w-8 lg:w-16'>
                        <span className='text-2xl lg:text-4xl tracking-tight leading-tight font-bold'>
                          {seconds < 10 ? '0' : ''}
                          {seconds}
                        </span>
                        <span className='text-gray-500 font-semibold leading-normal'>Sec</span>
                      </span>
                    </>
                  )
                }
              }}
            />
          </div>
        </div>
        <div className='flex flex-col '>
          <a
            onClick={() => placeBid()}
            className='text-white mb-4 w-full inline-flex justify-center items-center h-10 px-6 bg-primary-light hover:bg-primary rounded-lg font-bold text-lg leading-none  '
            style={{ transition: 'all .2s' }}>
            Place a bid
          </a>
          <a
            onClick={() => viewItem()}
            className='text-white mb-4 w-full inline-flex justify-center hover:bg-primary-light items-center h-10 px-6 border border-solid border-gray-300 rounded-lg font-bold text-lg leading-none  '
            style={{ transition: 'all .2s', borderColor: '#353945' }}>
            View Item
          </a>
        </div>
        <div className='absolute bottom-6'>
          {showArrow && (
            <div className='flex'>
              {showLeftArrow && (
                <div
                  onClick={() => bidRef.current.splide.go('<')}
                  style={{ borderColor: 'rgb(94, 98, 111)' }}
                  className='h-10 mr-2 w-10 rounded-full  border-solid hover:border-2 flex items-center justify-center cursor-pointer'>
                  <FaArrowLeft fill='rgb(94, 98, 111)' />
                </div>
              )}
              {showRightArrow && (
                <div
                  onClick={() => bidRef.current.splide.go('>')}
                  style={{ borderColor: 'rgb(94, 98, 111)' }}
                  className='h-10 ml-2 w-10 rounded-full  border-solid hover:border-2 flex items-center justify-center cursor-pointer'>
                  <FaArrowRight fill='rgb(94, 98, 111)' />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MyBid

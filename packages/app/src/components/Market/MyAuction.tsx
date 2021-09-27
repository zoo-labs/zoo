import React from 'react'
import { StopCircle } from 'react-feather'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import Countdown from 'react-countdown'
import { useAssetModalToggle, useToggleModal } from 'state/application/hooks'
import { ApplicationModal } from 'state/application/actions'
import { useHistory } from 'react-router'

interface MyAuctionProps {
  bidRef: any
  showArrow: boolean
  showLeftArrow: boolean
  showRightArrow: boolean
}

const MyAuction: React.FC<MyAuctionProps> = ({ bidRef, showArrow, showLeftArrow, showRightArrow }) => {
  const toggleAssetModal = useAssetModalToggle()
  const history = useHistory()
  return (
    <div className='flex flex-start flex-wrap jusrify-center items-center px-4 w-full lg:w-2/3 md:w-full '>
      <div className='hidden md:inline-flex relative md:w-1/3 lg:w-1/2 flex justify-center'>
        <div className=' p-px lg:w-3/4 w-full  h-full bg-gradient-to-b from-btn1  to-btn2 rounded-lg flex relative'>
          <div className='h-full w-full bg-cover rounded bg-no-repeat parent'>
            <img src='/static/video/egg.gif' className='w-full rounded-lg h-full transition-transform duration-1000' style={{ verticalAlign: 'middle' }} />
          </div>
          {/* <div className='absolute left-2 right-2 bottom-2 z-10 flex items-center h-10 px-8 rounded-2xl bg-dark-900'>
                  <button className='mr-4 '>
                    <RiPlayMiniFill scale={20} size={30} className='text-gray-500' />
                  </button>
                </div> */}
        </div>
      </div>
      <div className=' md:ml-20 flex-shrink-0 pb-24 w-full lg:w-1/3 md:w-1/3 py-4'>
        <h1 className='mb-4 font-bold text-6xl'>Egg</h1>
        <div className='flex -mx-4 mb-4 lg:mb-8 flex-wrap'>
          <div className='flex  flex-1 items-center mx-4 my-1'>
            <div className='flex items-center justify-center rounded-full h-10 w-10 mr-2 bg-pink'>
              <StopCircle />
            </div>
            <div className='flex-grow'>
              <div className='text-sm text-gray-500'>Reserve Price</div>
              <div className='font-semibold'>
                35K ZOO <span className='text-xs text-gray-500'>$6800</span>
              </div>
            </div>
          </div>
        </div>
        <div
          className=' bg-dark-800 mb-10 py-10 px-4 rounded-xl text-center'
          style={{ boxShadow: '0px 64px 64px -48px rgba(31, 47, 70, 0.12)', border: '2px solid #E6E8EC', borderColor: '#23262F' }}>
          <div className='font-semibold text-sm leading-normal'>Current Bid</div>
          <div className='text-xl lg:text-3xlfont-bold leading-tight'>100K ZOO</div>
          <div className='mb-4 text-md lg:text-lg font-semibold text-gray-500 leading-snug'>$3,618.36</div>
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
            className='text-white mb-4 w-full inline-flex justify-center items-center h-10 px-6 bg-primary-light hover:bg-primary rounded-lg font-bold text-lg leading-none  '
            style={{ transition: 'all .2s' }}>
            Edit Auction
          </a>
          <a
            // onClick={() =>
            //   history.push(`/feed/${datum.owner}/${datum.tokenID}`, {
            //     item: datum,
            //   })
            // }
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

export default MyAuction

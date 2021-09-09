import { ArrowForwardIcon, CopyIcon, HeartIcon } from 'components'
import CopyHelper from 'components/Copy/Copy'
import { CardEgg } from 'components/EggCard/types'
import TransactionTable from 'components/Transaction/Table'
import React from 'react'
import { ArrowUpRight } from 'react-feather'
import { ImArrowUpRight2 } from 'react-icons/im'
import { RiShareCircleLine, RiShareFill, RiUploadCloudFill, RiUploadCloudLine } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import { AppState } from 'state'
import EggFeedCard from './EggFeedCard'
import { useIsAnimationMode } from 'state/user/hooks'

interface FeedAssetProps {
  history: {
    location: {
      state: {
        item: any
      }
    }
  }
}

const FeedAsset: React.FC<FeedAssetProps> = ({ history }) => {
  const animationMode = useIsAnimationMode()
  const getVideo = (animated: boolean) => {
    return animated ? (
      <video
        className='rounded'
        playsInline
        autoPlay
        loop
        muted
        style={{
          pointerEvents: 'none',
          alignSelf: 'center',
        }}>
        <source src={'/static/video/egg.mp4'} type='video/mp4'></source>
      </video>
    ) : (
      <img src={window.location.origin + '/static/images/basic.jpg'} />
    )
  }
  const item = history.location.state.item
  const txHash = '0x82f982a0ac33cfb8b34bcdffa7547dff9a2ba49be0bfbab9b7823e437d01ce64'
  const accountEllipsis = `${txHash.substring(0, 10)}...${txHash.substring(txHash.length - 6)}`
  const myTransactions = useSelector<AppState, AppState['zoo']['myTransactions']>((state) => state.zoo.myTransactions)

  return (
    <main className='flex flex-col  flex-grow w-full h-full lg:p-16 lg:m-4 p-0 m-0 lg:pr-0 lg:mr-0 space-y-4 rounded-lg  flex flex-col relative filter drop-shadow z-10'>
      <div className='flex flex-1 flex-wrap md:flex-nowrap'>
        <div className='flex w-full lg:w:1/2 justify-center  md:flex-1'>
          <div className=' p-px lg:w-1/2 w-full  h-full bg-gradient-to-b from-btn1  to-btn2 rounded flex relative'>
            <div className='h-full w-full bg-cover rounded bg-no-repeat'>
              { getVideo(true) }
            </div>
            <div className='absolute top-5 xs:left-10 pl-4 lg:pl-0 lg:right-5 '></div>
          </div>
        </div>
        <div className='w:1/2 my-8 mb-16 md:m-0 md:flex-1'>
          <div className='flex '>
            <div className=' flex flex-col items-start px-4 w-full lg:w-2/3 '>
              <h2 className='text-2xl font-semibold'>Egg #{item.id}</h2>
              <p className='text-sm text-justify text-gray-500 my-4 font-semibold' style={{ color: '#f2f2f2' }}>
                Contains 1 of 16 Generation One Base Animals. To hatch or to hold… Air is a trip through a serene yet alien world. It is a journey that is blissful, meditative and
                at times intense.
              </p>

              <div className='w-full mb-4'>
                <div className=' rounded border-2 border-gray-400 border-solid p-4' style={{ borderWidth: 1 }}>
                  <h2 className='text-sm font-bold mb-4'>Details</h2>
                  <div className='flex justify-between items-center'>
                    <span className='text-md  font-semibold'>Transaction Hash</span>
                    <span
                      className='font-semibold text-sm primary cursor-pointer'
                      onClick={() => window.open(`https://testnet.bscscan.com/address/${accountEllipsis || ''}`, '_blank')}>
                      {accountEllipsis}
                    </span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className=' text-md  font-semibold'>Token ID</span>
                    <CopyHelper toCopy={item.tokenID.toString()}>
                      <div className='text-sm font-medium'>{item.tokenID}</div>
                    </CopyHelper>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-md  font-semibold'>Token Standard</span>
                    <span className='font-semibold text-sm '>ERC-721</span>
                  </div>
                </div>
              </div>
              <div className='w-full rounded flex flex-col  border-2 border-gray-400 border-solid' style={{ borderWidth: 1 }}>
                <div className='flex flex-col'>
                  <h2 className='ml-4 mt-4 mb-4 text-sm font-bold'>Proof of Authenticity</h2>
                  <a
                    href={`https://testnet.bscscan.com/address/${item.owner || ''}`}
                    target='_blank'
                    className='p-4 justify-between items-center flex border-b-2 border-gray-400 border-solid hover:bg-dark-800'
                    style={{ borderBottomWidth: 1 }}>
                    <div className='text-sm font-medium primary'>Etherscan transaction</div>
                    <div>
                      <ImArrowUpRight2 fill='#f2f2f2' size={12} />
                    </div>
                  </a>
                  <a
                    href='https://bafybeidq6egcuxafoo2i2pvyp7cgajf6iewzfiq24owfhrgrezyokygvwq.ipfs.dweb.link'
                    target='_blank'
                    className='p-4 flex justify-between items-center hover:bg-dark-800 rounded-b-lg'>
                    <div className='text-sm font-medium primary'>View on IPFS</div>
                    <div>
                      <ImArrowUpRight2 fill='#f2f2f2' size={12} />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=' flex-1  flex justify-center'>
        <div className='flex flex-col px-4 w-full lg:w-2/3'>
          <h6 className='my-8 font-semibold text-xl'>History</h6>
          {myTransactions.length === 0 ? (
            <div className='flex items-center h-full justify-center'>
              {' '}
              <h6> No Transaction Data </h6>
            </div>
          ) : (
            <div>
              <TransactionTable Transactions={myTransactions.slice(0, 5)} />
            </div>
          )}
        </div>
      </div>
      <div
        style={{
          width: '50vw',
          height: '50vh',
          top: '0%',
          right: '-15%',
          zIndex: -1,
        }}
        className='absolute  bg-primary opacity-10  rounded-full z-0 filter  blur-3xl'></div>
      <div
        style={{
          width: '50vw',
          height: '50vh',
          left: '-15%',
          right: 0,
          bottom: '0%',
          zIndex: -1,
        }}
        className='absolute  bg-pink rounded-full opacity-10  z-0 filter  blur-3xl'></div>
    </main>
  )
}

export default FeedAsset

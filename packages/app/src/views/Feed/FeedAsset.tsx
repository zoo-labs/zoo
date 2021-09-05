import { ArrowForwardIcon, CopyIcon, HeartIcon } from 'components'
import CopyHelper from 'components/Copy/Copy'
import { CardEgg } from 'components/EggCard/types'
import React from 'react'
import { ArrowUpRight } from 'react-feather'
import { ImArrowUpRight2 } from 'react-icons/im'
import { RiShareCircleLine, RiShareFill, RiUploadCloudFill, RiUploadCloudLine } from 'react-icons/ri'
import EggFeedCard from './EggFeedCard'

interface FeedAssetProps {
  history: {
    location: {
      state: {
        item: CardEgg
      }
    }
  }
}

const FeedAsset: React.FC<FeedAssetProps> = ({ history }) => {
  const getVideo = () => {
    return (
      <div className=''>
        <video
          autoPlay
          loop
          muted
          style={{
            maxHeight: 700,
            alignSelf: 'center',
          }}>
          <source src={'/static/video/egg.mp4'} type='video/mp4'></source>
        </video>
      </div>
    )
  }
  const item = history.location.state.item
  const accountEllipsis = item && item.owner ? `${item.owner.substring(0, 6)}...${item.owner.substring(item.owner.length - 4)}` : null

  return (
    <main className='flex flex-col  flex-grow w-full h-full lg:p-16 lg:m-4 p-0 m-0 lg:pr-0 lg:mr-0 space-y-4 rounded-lg  flex flex-col relative filter drop-shadow z-10'>
      <div className='flex flex-1'>
        <div className='flex flex-1 justify-center relative'>
          <div className=' p-px h-full bg-gradient-to-b from-btn1  to-btn2'>
            <div style={{}}>{getVideo()}</div>
          </div>
          <div className='absolute right-20'>
            {[0, 1, 2].map((value) => (
              <div className='cursor-pointer rounded-full p-3 bg-dark-800 mb-4 flex justify-center items-center'>
                {value === 0 ? <HeartIcon fill='white' /> : value === 1 ? <RiShareFill fill='white' /> : <CopyIcon fill='white' />}
              </div>
            ))}
          </div>
        </div>
        <div className='flex-1' style={{ flex: 1.5 }}>
          <div className='flex px-4'>
            <div className='flex-1 flex flex-col'>
              <h2 className='text-2xl font-semibold'>MY ZOO EGG</h2>
              <div className='flex my-4'>
                <div className='rounded-full p-px h-full bg-gradient-to-b from-btn1  to-btn2 mr-4'>
                  <div className='text-xs font-semibold bg-dark-800 px-6 py-2 rounded-full'>🔥 {'  '}Highest Bid</div>
                </div>
                <div className='rounded-full p-px h-full bg-gradient-to-b from-btn1  to-btn2 mr-4'>
                  <div className='text-xs font-semibold bg-dark-800 px-6 py-2 rounded-full'>{item.basic ? 'BASIC' : 'HYBRID'}</div>
                </div>
              </div>
              <p className='text-xs text-justify text-gray-500 my-4 font-semibold' style={{ color: '#f2f2f2' }}>
                Contains 1 of 16 Generation One Base Animals. To hatch or to hold… Air is a trip through a serene yet alien world. It is a journey that is blissful, meditative and
                at times intense.
              </p>
              <div className='mb-4'>
                <div className=' border-2 border-gray-400 border-solid p-4' style={{ borderWidth: 1 }}>
                  <h2 className='text-sm font-bold mb-4'>Details</h2>
                  <div className='flex justify-between items-center'>
                    <span className='text-md  font-semibold'>Contract Address</span>
                    <span className='font-semibold text-sm primary cursor-pointer' onClick={() => window.open(`https://testnet.bscscan.com/address/${item.owner || ''}`, '_blank')}>
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
                  <div className='flex justify-between items-center'>
                    <span className='text-md  font-semibold'>Blockchain</span>
                    <span className='font-semibold text-sm '>Ethereum</span>
                  </div>
                </div>
              </div>
              <div className='flex flex-col  border-2 border-gray-400 border-solid' style={{ borderWidth: 1 }}>
                <div className='my-6 px-4'>
                  <h2 className='text-sm font-bold'>Proof of Authenticity</h2>
                </div>
                <div className='flex flex-col'>
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
                    href='https://ipfs.io/ipfs/bafybeicrjczyjyr35qgtgsfqecumvtr24cnv7j23cfwmiqcmu67px26feu'
                    target='_blank'
                    className='p-4 flex justify-between items-center hover:bg-dark-800'>
                    <div className='text-sm font-medium primary'>View on IPFS</div>
                    <div>
                      <ImArrowUpRight2 fill='#f2f2f2' size={12} />
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div className='flex-1 px-4'>
              <div className=' px-8 grid  mb-4' style={{ gridTemplateColumns: '1fr 54px', gap: '10px' }}>
                <a
                  style={{ pointerEvents: 'unset', padding: '11px 0px', borderRadius: 4 }}
                  className='rounded bg-white text-black flex items-center justify-center font-bold text-sm'
                  href='#'>
                  Place Bid
                </a>
                <button style={{ paddingLeft: 0, paddingRight: 0, padding: '11px 20px', backgroundColor: '#f2f2f2', borderRadius: 4 }} className=''>
                  <RiShareFill fill='black' />
                </button>
              </div>
              <div className='px-8'>
                <div className=' border-2 border-gray-400 border-solid p-4' style={{ borderWidth: 1 }}>
                  <h2 className='text-sm font-bold mb-2'>Reserve Price</h2>
                  <div className=''>
                    <span className='mr-2 text-xl  font-semibold'>0.25 ETH</span>
                    <span className='font-light'>$975.00 USD</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-1'></div>
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

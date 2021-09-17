import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { connectorLocalStorageKey } from '../config'
import useWeb3 from 'hooks/useWeb3'
import { getFaucet, getToken } from 'util/contracts'
import AltModal from 'components/Modal/AltModal'
import { numberWithCommas } from 'components/Functions'
import HeaderModal from 'components/Modal/HeaderModal'
import { ApplicationModal } from 'state/application/actions'
import { useModalOpen, useAssetModalToggle } from 'state/application/hooks'
import Modal from '../../NewModal'
import useAuth from 'hooks/useAuth'
import { useHistory } from 'react-router'
import CopyHelper from 'components/Copy/Copy'
import { useSelector } from 'react-redux'
import { AppState } from 'state'
import BidModalHeader from 'components/NewModal/BidModalHeader'
import { useIsAnimationMode } from 'state/user/hooks'
import { ImArrowRight2, ImArrowUpRight2 } from 'react-icons/im'

interface AssetModalProps {
  item: any
}

const AssetModal: React.FC<AssetModalProps> = ({ item }) => {
  const assetModal = useModalOpen(ApplicationModal.ASSET)
  const toggleAssetModal = useAssetModalToggle()
  const { logout } = useAuth()
  const { chainId, account } = useWeb3React()
  const history = useHistory()
  const zooBalance = useSelector<AppState, AppState['zoo']['zooBalance']>((state) => state.zoo.zooBalance)
  const getNetwork = (chainId: number) => {
    switch (chainId) {
      case 56:
        return 'BSC'
      case 97:
        return 'BSC-TEST'
      case 1:
        return 'ETH'
      case 4:
        return 'ETH-TEST'
      default:
        return ''
    }
  }
  const isAnimated = useIsAnimationMode()
  const getVideo = () => {
    return isAnimated ? (
      <div className=''>
        <video
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
        src={`${item.imageUrl || window.location.origin + '/static/images/basic.jpg'}`}
        className='h-full transition-transform w-full duration-1000 rounded h-full'
      />
    )
  }

  const txHash = item.transactionHash || '0x000000000000000000000000000000000000000'
  const accountEllipsis = `${txHash.substring(0, 10)}...${txHash.substring(txHash.length - 6)}`
  const myTransactions = useSelector<AppState, AppState['zoo']['myTransactions']>((state) => state.zoo.myTransactions)
  console.log(item)

  console.log('assetModal is', assetModal)
  return (
    <Modal isOpen={assetModal} onDismiss={() => null} isMax>
      <BidModalHeader onBack={() => toggleAssetModal()} className='absolute p-6 w-full ' />
      <div className='flex flex-1 flex-wrap md:flex-nowrap'>
        <div className='flex w-full lg:w:1/2 justify-center  md:flex-1'>
          <div className=' p-px lg:w-1/2 w-full  h-full bg-gradient-to-b from-btn1  to-btn2 rounded flex relative'>
            <div className='h-full w-full bg-cover rounded bg-no-repeat'>{getVideo()}</div>
            {/*
            <div className='absolute top-5 xs:left-10 pl-4 lg:pl-0 lg:right-5 '>
              {[0, 1, 2].map((value) => (
                <div className='cursor-pointer rounded-full p-2 bg-dark-800 mb-4 flex justify-center items-center'>
                  {value === 0 ? (
                    <HeartIcon fill='white' style={{ fontSize: 8 }} />
                  ) : value === 1 ? (
                    <RiShareFill fill='white' size={20} />
                  ) : (
                    <CopyIcon fill='white' style={{ fontSize: 8 }} />
                  )}
                </div>
              ))}
            </div>
            */}
          </div>
        </div>
        <div className='w:1/2 my-8 mb-16 md:m-0 md:flex-1'>
          <div className='flex '>
            <div className=' flex flex-col items-start px-4 w-full lg:w-2/3 '>
              <h2 className='text-2xl font-semibold'>Egg #{item.tokenID}</h2>
              {/*
              <div className='flex my-4'>
                <div className='rounded-full p-px h-full bg-gradient-to-b from-btn1  to-btn2 mr-4'>
                  <div className='text-xs font-semibold bg-dark-800 px-6 py-2 rounded-full'>🔥 {'  '}Highest Bid</div>
                </div>
                <div className='rounded-full p-px h-full bg-gradient-to-b from-btn1  to-btn2 mr-4'>
                  <div className='text-xs font-semibold bg-dark-800 px-6 py-2 rounded-full'>{item.basic ? 'BASIC' : 'HYBRID'}</div>
                </div>
              </div>
              */}
              <p className='text-sm text-justify text-gray-500 my-4 font-semibold' style={{ color: '#f2f2f2' }}>
                Contains 1 of 16 Generation One Base Animals. To hatch or to hold…
              </p>
              {/*
              <div className='w-full mb-4'>
                <div className='rounded border-2 border-gray-400 border-solid p-4' style={{ borderWidth: 1 }}>
                  <h2 className='text-sm font-bold mb-2'>Reserve Price</h2>
                  <div className=''>
                    <span className='mr-2 text-xl  font-semibold'>0.25 ETH</span>
                    <span className='font-light'>$975.00 USD</span>
                  </div>
                </div>
              </div>
              <div className='w-full  grid  mb-8' style={{ gridTemplateColumns: '1fr 54px', gap: '10px' }}>
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
              */}

              <div className='w-full mb-4'>
                <div className=' rounded border-2 border-gray-400 border-solid p-4' style={{ borderWidth: 1 }}>
                  <h2 className='text-sm font-bold mb-4'>Details</h2>
                  <div className='flex justify-between items-center'>
                    <span className='text-md  font-semibold'>Transaction Hash</span>
                    <span className='font-semibold text-sm primary cursor-pointer' onClick={() => window.open(`https://testnet.bscscan.com/tx/${txHash}`, '_blank')}>
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
    </Modal>
  )
}

export default AssetModal

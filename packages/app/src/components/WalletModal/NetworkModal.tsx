import { NETWORK_ICON, NETWORK_LABEL } from '../../constants/networks'

import Modal from '../Modal/AltModal'
import React from 'react'
import { useWeb3React } from '@web3-react/core'
import { ImGithub } from 'react-icons/im'
import { ChainId } from '../../constants/chains'
import { SUPPORTED_NETWORKS } from '../../constants/networks'
import { CloseIcon } from 'components/Svg'

export default function NetworkModal({ onDismiss = () => null }): JSX.Element | null {
  const { chainId, library, account } = useWeb3React()

  if (!chainId) return null

  return (
    <Modal onDismiss={onDismiss} title='Network Modal' maxWidth='672px' maxHeight='90vh'>
      {/* <ModalHeader onClose={toggleNetworkModal} title="Select a Network" /> */}
      <div className={`flex items-center justify-between mb-4`}>
        <h3 className='font-bold'>Select a Network</h3>

        <div className='flex items-center justify-center w-6 h-6 cursor-pointer text-primary hover:text-high-emphesis' onClick={onDismiss}>
          <CloseIcon width={24} height={24} fill='white' />
        </div>
      </div>
      <div className='mb-6 text-lg'>
        You are currently browsing <span className='font-bold text-pink-500'>ZOO</span>
        <br /> on the <span className='font-bold primary'>{NETWORK_LABEL[chainId]}</span> network
      </div>

      <div className='grid grid-flow-row-dense grid-cols-1 gap-5 overflow-y-auto md:grid-cols-2'>
        {[
          ChainId.MAINNET,
          // ChainId.ROPSTEN,
          // ChainId.RINKEBY,
          // ChainId.GÖRLI,
          // ChainId.KOVAN,
          // ChainId.FANTOM,
          // ChainId.ARBITRUM,
          // ChainId.OKEX,
          // ChainId.HECO,
          ChainId.BSC,
          // ChainId.BSCTESTNET,
          // ChainId.XDAI,
          ChainId.HARMONY,
          // ChainId.AVALANCHE,
          // ChainId.CELO,
          // ChainId.PALM,
          ChainId.MATIC,
        ].map((key: ChainId, i: number) => {
          if (chainId === key) {
            return (
              <button key={i} className='w-full col-span-1 p-px rounded bg-gradient-to-r from-blue to-pink'>
                <div className='flex items-center w-full h-full p-3 space-x-3 rounded bg-dark-1000'>
                  <img src={NETWORK_ICON[key]} alt={`Switch to ${NETWORK_LABEL[key]} Network`} className='rounded-md' width='32px' height='32px' />
                  <div className='font-bold text-primary'>{NETWORK_LABEL[key]}</div>
                </div>
              </button>
            )
          }
          return (
            <button
              key={i}
              onClick={() => {
                onDismiss()
                const params = SUPPORTED_NETWORKS[key]
                if (key === ChainId.MAINNET) {
                  library?.send('wallet_switchEthereumChain', [{ chainId: '0x1' }, account])
                } else {
                  library?.send('wallet_addEthereumChain', [params, account])
                }
              }}
              className='flex items-center w-full col-span-1 p-3 space-x-3 rounded cursor-pointer bg-dark-800 hover:bg-dark-700'>
              <img src={NETWORK_ICON[key]} alt={`Switch to ${NETWORK_LABEL[key]} Network`} className='rounded-md' width='32px' height='32px' />
              <div className='font-bold text-primary'>{NETWORK_LABEL[key]}</div>
            </button>
          )
        })}
      </div>
    </Modal>
  )
}

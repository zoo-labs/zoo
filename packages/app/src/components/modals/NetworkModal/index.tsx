import config, { connectorLocalStorageKey } from '../config'
import React from 'react'
import { ApplicationModal } from 'state/application/actions'
import { useModalOpen, useNetworkModalToggle } from 'state/application/hooks'
import Modal from '../../NewModal'
import ModalHeader from '../../NewModal/Header'
import useAuth from 'hooks/useAuth'
import { NETWORK_ICON, NETWORK_LABEL, SUPPORTED_NETWORKS } from '../../../constants/networks'
import { useWeb3React } from '@web3-react/core'
import { ImGithub } from 'react-icons/im'
import { ChainId } from '../../../constants/Chains'
import { CloseIcon } from 'components/Svg'

interface NetworkModalProps {}

const chainIds = [ChainId.MAINNET, ChainId.BSC, ChainId.RINKEBY, ChainId.BSC_TESTNET]

if (window.location.host.startsWith('localhost:')) {
  chainIds.push(ChainId.HARDHAT)
  chainIds.push(ChainId.HARDHAT2)
}

const NetworkModal: React.FC<NetworkModalProps> = ({}) => {
  const { chainId, library, account } = useWeb3React()
  const networkModal = useModalOpen(ApplicationModal.NETWORK)
  const toggleNetworkModal = useNetworkModalToggle()
  if (!chainId) return null

  return (
    <Modal isOpen={networkModal} onDismiss={() => null} maxWidth={672}>
      <ModalHeader onClose={() => toggleNetworkModal()} title='Select a Network' />
      <div className='mb-6 text-lg'>
        You are currently browsing <span className='font-bold text-pink-500'>ZOO</span>
        <br /> on the <span className='font-bold primary'>{NETWORK_LABEL[chainId]}</span> network
      </div>

      <div className='grid grid-flow-row-dense grid-cols-1 gap-5 overflow-y-auto md:grid-cols-2'>
        {chainIds.map((key: ChainId, i: number) => {
          if (chainId === key) {
            return (
              <button
                key={i}
                className='w-full col-span-1 p-px rounded

              '>
                <div className='w-full p-px rounded bg-gradient-to-b from-btn1  to-btn2'>
                  <div className='flex flex-col w-full h-full overflow-y-hidden rounded bg-dark-900'>
                    <div className='flex items-center w-full h-full p-3 space-x-3 rounded bg-gradient-to-b from-bg-dark-1000 to-bg-dark-1000 hover:from-btn1 hover:to-btn2 '>
                      <img src={NETWORK_ICON[key]} alt={`Switch to ${NETWORK_LABEL[key]} Network`} className='rounded-md' width='32px' height='32px' />
                      <div className='font-bold text-primary'>{NETWORK_LABEL[key]}</div>
                    </div>
                  </div>
                </div>
              </button>
            )
          }
          return (
            <button
              key={i}
              onClick={() => {
                toggleNetworkModal()
                const params = SUPPORTED_NETWORKS[key]
                if (key === ChainId.MAINNET || key == ChainId.RINKEBY) {
                  library?.send('wallet_switchEthereumChain', [params, account])
                } else {
                  library?.send('wallet_addEthereumChain', [params, account])
                }
              }}
              className='flex items-center w-full col-span-1 p-3 space-x-3 rounded cursor-pointer from-bg-dark-800 to-bg-dark-800 bg-gradient-to-b hover:from-btn1 hover:to-btn2'>
              <img src={NETWORK_ICON[key]} alt={`Switch to ${NETWORK_LABEL[key]} Network`} className='rounded-md' width='32px' height='32px' />
              <div className='font-bold text-primary'>{NETWORK_LABEL[key]}</div>
            </button>
          )
        })}
      </div>
    </Modal>
  )
}

export default NetworkModal

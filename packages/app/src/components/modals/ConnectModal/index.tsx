import config, { connectorLocalStorageKey } from '../config'
import React from 'react'
import { ApplicationModal } from 'state/application/actions'
import { useModalOpen, useConnectModalToggle } from 'state/application/hooks'
import Modal from '../../NewModal'
import ModalHeader from '../../NewModal/Header'
import useAuth from 'hooks/useAuth'

interface ConnectModalProps {}

const ConnectModal: React.FC<ConnectModalProps> = ({}) => {
  const connectedModal = useModalOpen(ApplicationModal.CONNECT)
  const toggleConnectModal = useConnectModalToggle()
  const { login } = useAuth()
  return (
    <Modal isOpen={connectedModal} onDismiss={() => null} maxWidth={440}>
      <ModalHeader onClose={() => toggleConnectModal()} title='Connect' />
      <div className='mb-6 text-lg'>
        You are currently not connected
        <br />
        Select a <span className='font-bold primary'>wallet</span> to connect with
      </div>
      <div className='grid grid-flow-row-dense grid-cols-1 gap-5 overflow-y-auto md:grid-cols-1'>
        {config.map((entry, index) => {
          const { title, icon: Icon } = entry
          return (
            <button
              key={index}
              onClick={() => {
                toggleConnectModal()
                login(entry.connectorId)
                window.localStorage.setItem(connectorLocalStorageKey, entry.connectorId)
              }}
              className='flex items-center w-full col-span-1 p-3 space-x-3 rounded cursor-pointer bg-dark-800 hover:bg-dark-700'>
              <Icon width='32px' />
              <div className='font-bold text-primary'>{title}</div>
            </button>
          )
        })}
      </div>
    </Modal>
  )
}

export default ConnectModal

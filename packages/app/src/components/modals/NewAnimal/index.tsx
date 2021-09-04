import React from 'react'
import { ApplicationModal } from 'state/application/actions'
import { useModalOpen, useNetworkModalToggle, useNewAnimalModalToggle } from 'state/application/hooks'
import Modal from '../../NewModal'
import ModalHeader from '../../NewModal/Header'
interface indexProps {
  animal: {
    tokenID: number
    name: string
    rarity: string
    description: string
    dob: number
    imageUrl: string
    listed: boolean
    boost: number
    yield: number
  }
  onDismiss: () => void
}

const Index: React.FC<indexProps> = ({ animal, onDismiss }) => {
  const newAnimalModalOpen = useModalOpen(ApplicationModal.NEWANIMAL)
  const toggleNewAnimalModal = useNewAnimalModalToggle()

  return (
    <Modal
      isOpen={newAnimalModalOpen}
      onDismiss={() => {
        onDismiss()
        toggleNewAnimalModal()
      }}
      maxWidth={672}>
      {/* <ModalHeader onClose={toggleNewAnimalModal} title='Select a Network' /> */}
      <div className='h-screen' style={{ backgroundImage: `url('${animal.imageUrl}')` }}></div>
    </Modal>
  )
}

export default Index

import { WarningIcon } from 'components'
import React from 'react'
import { useDispatch } from 'react-redux'
import { ApplicationModal } from 'state/application/actions'
import { useModalOpen, useHatchDisabledModalToggle, useBreedConfirmModalToggle } from 'state/application/hooks'
import { useAppSelector } from 'state/hooks'
import { addAnimal } from 'state/zoo'
import { Animal } from 'types/zoo'
import Modal from '../../NewModal'
import ModalHeader from '../../NewModal/Header'
interface indexProps {}

const Index: React.FC<indexProps> = ({}) => {
  const hatchDisabledModal = useModalOpen(ApplicationModal.HATCHDISABLED)
  const toggleHatchDisabledModalModal = useHatchDisabledModalToggle()

  return (
    <Modal isOpen={hatchDisabledModal} onDismiss={() => null} maxWidth={300}>
      <ModalHeader onClose={() => toggleHatchDisabledModalModal()} title='Game Locked ⚠️' />
      <div className='flex justify-center'>
        <div className='mb-4 text-center flex justify-center items-center' style={{ minHeight: 100 }}>
          <h6>Once all eggs have been sold, the game can begin.</h6>
        </div>
      </div>
    </Modal>
  )
}

export default Index

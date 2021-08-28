import React from 'react'
import { useDispatch } from 'react-redux'
import { ApplicationModal } from 'state/application/actions'
import { useBreedConfirmModalToggle, useModalOpen, useNetworkModalToggle } from 'state/application/hooks'
import { useAppSelector } from 'state/hooks'
import { addAnimal } from 'state/zoo'
import Modal from '../../components/NewModal'
import ModalHeader from '../../components/NewModal/Header'
interface indexProps {
  breed: () => Promise<void>
}

const index: React.FC<indexProps> = ({ breed }) => {
  const breedConfirmModalOpen = useModalOpen(ApplicationModal.BREEDCONFIRM)
  const toggleBreedConfirmModalModal = useBreedConfirmModalToggle()
  const selectedAnimals = useAppSelector((state) => Object.values(state.zoo.animals).filter((animal) => animal.selected))
  let animal1 = selectedAnimals[0]
  let animal2 = selectedAnimals[1]

  const dispatch = useDispatch()
  const cancel = () => {
    console.log()
    if (animal1 && animal2) {
      animal1 = { ...animal1, selected: false }
      animal2 = { ...animal2, selected: false }
      dispatch(addAnimal(animal1))
      dispatch(addAnimal(animal2))
    }

    toggleBreedConfirmModalModal()
  }
  return (
    <Modal
      isOpen={breedConfirmModalOpen}
      onDismiss={() => {
        cancel()
      }}
      maxWidth={440}>
      <ModalHeader onClose={cancel} title='Confirm Breed' />
      <div>
        <div className='mb-4 text-center'>{animal1 && animal2 && <h6>{`Do you want to breed ${animal1.name} with ${animal2.name}?`}</h6>}</div>
        <div className={`grid gap-4 grid-cols-2 `}>
          <button
            onClick={() => breed()}
            id='add-pool-button'
            color='gradient'
            className='w-full text-high-emphesis bg-gradient-to-r from-blue-600 to-pink-600 opacity-80 hover:opacity-100 disabled:bg-opacity-80 px-4 py-3 text-base rounded disabled:cursor-not-allowed focus:outline-none grid items-center justify-center grid-flow-col gap-2 whitespace-nowrap'>
            Yes
          </button>
          <button
            onClick={() => cancel()}
            id='add-pool-button'
            color='gray'
            className='border rounded shadow-sm focus:ring-2 focus:ring-offset-2 bg-dark-700 bg-opacity-80 w-full text-primary border-dark-800 hover:bg-opacity-100 focus:ring-offset-dark-700 focus:ring-dark-800 disabled:bg-opacity-80 px-4 py-3 text-base rounded disabled:cursor-not-allowed focus:outline-none'>
            No
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default index

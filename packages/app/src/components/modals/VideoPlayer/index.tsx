import React, { useEffect, useRef } from 'react'
import { ApplicationModal } from 'state/application/actions'
import { useModalOpen, useNetworkModalToggle, useNewAnimalModalToggle } from 'state/application/hooks'
import Modal from '../../NewModal'
import ModalHeader from '../../NewModal/Header'
interface indexProps {
  videoPath: string
}
// function fade(element) {
//   var op = 1
//   var timer = setInterval(function () {
//     if (op <= 0) clearInterval(timer)
//     element.style.opacity = op
//     element.style.filter = 'alpha(opacity=' + op * 100 + ')'
//     op -= op * 0.1 || 0.1
//   }, 70)
// }
const Index: React.FC<indexProps> = ({ videoPath }) => {
  const videoPlayerModalOpen = useModalOpen(ApplicationModal.VIDEOPLAYER)
  const toggleNewAnimalModal = useNewAnimalModalToggle()
  //   const videoEl = useRef(null)

  //   useEffect(() => {
  //     if (videoPlayerModalOpen) {
  //       const el = videoEl.current as any
  //       setTimeout(function () {
  //         fade(el)
  //       }, 5500)
  //     }
  //   }, [videoPlayerModalOpen])
  return (
    <Modal
      isFullWidth
      backgroundColor='black'
      isOpen={videoPlayerModalOpen}
      onDismiss={() => {
        toggleNewAnimalModal()
      }}>
      <div className='flex justify-center items-center'>
        <video autoPlay className='h-auto  max-w-full'>
          <source src={videoPath} />
        </video>
      </div>
    </Modal>
  )
}

export default Index

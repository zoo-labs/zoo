import React, { createContext, useState } from 'react'
import styled from 'styled-components'
import Overlay from '../../components/Overlay/Overlay'
import { Handler } from './types'

interface ModalsContext {
  onPresent: (node: React.ReactNode, key?: string) => void
  onDismiss: Handler
  setCloseOnOverlayClick: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${({ theme }) => theme.zIndices.modal - 1};
`

export const Context = createContext<ModalsContext>({
  onPresent: () => null,
  onDismiss: () => null,
  setCloseOnOverlayClick: () => true,
})

const ModalProvider: React.FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [modalNode, setModalNode] = useState<React.ReactNode>()
  const [closeOnOverlayClick, setCloseOnOverlayClick] = useState(true)

  const handlePresent = (node: React.ReactNode) => {
    setModalNode(node)
    setIsOpen(true)
  }

  const handleDismiss = () => {
    setModalNode(undefined)
    setIsOpen(false)
  }

  const handleOverlayDismiss = () => {
    if (closeOnOverlayClick) {
      handleDismiss()
    }
  }

  return (
    <Context.Provider
      value={{
        onPresent: handlePresent,
        onDismiss: handleDismiss,
        setCloseOnOverlayClick,
      }}>
      {isOpen && (
        <ModalWrapper>
          {/* <Overlay show onClick={handleOverlayDismiss} /> */}
          <div
            style={{
              // background: 'radial-gradient(50% 50% at 50% 50%,#fc077d10 0,rgba(255,255,255,0) 100%)',
              width: '100vh',
              height: '100vh',
              // transform: 'translate(-50vw, -100vh)',
              top: '10%',
              left: '25%',
              right: 0,
              zIndex: -100000,
            }}
            className='absolute  bg-primary-light  rounded-full z-0 filter blur-3xl'></div>
          {/* <div className='w-full max-w-2xl '>
            <div className='absolute top-3/4 left-1/2 bg-blue-500 bottom-4 w-1/4 rounded-full z-0 filter blur-[150px]'></div>
            <div className='absolute bottom-3/4 -right-10 bg-pink-500 top-4 w-1/4 rounded-full z-0  filter blur-[150px]'></div>
          </div> */}
          {React.isValidElement(modalNode) &&
            React.cloneElement(modalNode, {
              onDismiss: handleDismiss,
            })}
        </ModalWrapper>
      )}
      {children}
    </Context.Provider>
  )
}

export default ModalProvider

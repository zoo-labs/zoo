import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useRef } from 'react'
import { isMobile } from 'react-device-detect'

interface ModalProps {
  isOpen: boolean
  onDismiss: () => void
  minHeight?: number
  maxHeight?: number
  initialFocusRef?: React.RefObject<any>
  children?: React.ReactNode
  padding?: number
  maxWidth?: number
  className?: string
  isMax?: boolean
  backgroundColor?: string
}

export default function Modal({ isOpen, onDismiss, minHeight = 0, maxHeight = 90, initialFocusRef, children, padding = 5, maxWidth = 420, isMax, backgroundColor }: ModalProps) {
  // console.log({ maxHeight: `${maxHeight}vh` })
  let refDiv = useRef(null)

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog initialFocus={refDiv} as='div' onClose={onDismiss} className='fixed inset-0 z-10 overflow-y-hidden backdrop-blur-md'>
          <Dialog.Overlay className='fixed inset-0 bg-black backdrop-blur-md opacity-30' />
          <div className='flex items-center justify-center h-screen px-4' ref={refDiv}>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'>
              <div
                className='transition-all transform'
                style={{
                  width: isMobile ? `100%` : isMax ? '100vw' : '65vw',
                  maxWidth: isMax ? '100%' : `${maxWidth}px`,
                }}>
                <div className='w-full p-px rounded bg-gradient-to-r from-btn1  to-btn2'>
                  <div className='flex flex-col w-full h-full p-6 overflow-y-hidden rounded bg-dark-900' style={{ backgroundColor }}>
                    <div style={{ minHeight: `${minHeight}vh`, maxHeight: `${maxHeight}vh` }}>{children}</div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

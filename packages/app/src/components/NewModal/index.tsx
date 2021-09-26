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
  isFullWidth?: boolean
  backgroundColor?: string
  scrollable?: boolean
}

export default function Modal({
  isOpen,
  onDismiss,
  minHeight = 0,
  maxHeight = 90,
  initialFocusRef,
  children,
  padding = 5,
  maxWidth = 420,
  isMax,
  isFullWidth,
  backgroundColor,
  scrollable,
}: ModalProps) {
  // console.log({ maxHeight: `${maxHeight}vh` })
  let refDiv = useRef(null)

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog initialFocus={refDiv} as='div' onClose={onDismiss} className={`fixed inset-0 z-10 ${!scrollable ? 'overflow-y-hidden' : 'overflow-y-auto'} backdrop-blur-md`}>
          <Dialog.Overlay className='fixed inset-0 bg-black backdrop-blur-md opacity-30' />
          <div className={`flex items-center justify-center ${!scrollable && 'h-screen'} ${!isMax && 'px-4'}`} ref={refDiv}>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'>
              <div
                className={`transition-all transform ${isMax && 'h-full z-50'}`}
                style={{
                  width: isMobile ? `100%` : isFullWidth || isMax ? '100vw' : '65vw',
                  maxWidth: isFullWidth || isMax ? '100%' : `${maxWidth}px`,
                }}>
                <div className={` ${isMax ? 'h-full' : 'p-px'}  w-full rounded bg-gradient-to-b from-btn1  to-btn2`}>
                  <div className={`${!isMax && 'rounded p-6'} flex flex-col w-full h-full  overflow-y-hidden  bg-dark-900`} style={{ backgroundColor }}>
                    <div style={{ minHeight: isMax ? '100vh' : `${minHeight}vh`, maxHeight: scrollable ? 'auto' : `${maxHeight}vh` }}>{children}</div>
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

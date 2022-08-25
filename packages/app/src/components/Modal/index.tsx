import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useRef } from "react";
import { isMobile } from "react-device-detect";

interface ModalProps {
  isOpen: boolean;
  onDismiss: () => void;
  minHeight?: number;
  maxHeight?: number;
  initialFocusRef?: React.RefObject<any>;
  children?: React.ReactNode;
  padding?: number;
  maxWidth?: number;
  className?: string;
  isMax?: boolean;
  isFullWidth?: boolean;
  backgroundColor?: string;
  scrollable?: boolean;
}

export default function Modal({
  isOpen,
  onDismiss,
  minHeight = 0,
  maxHeight = 90,
  initialFocusRef,
  children,
  padding = 6,
  maxWidth = 420,
  isMax,
  isFullWidth,
  backgroundColor,
  scrollable,
}: ModalProps) {
  let refDiv = useRef(null);

  return (
    <>
      {/* <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          onClose={onDismiss}
          className="fixed inset-0 overflow-y-auto Modal z-10001 backdrop-blur-md"
        >
          <Dialog.Overlay className="fixed inset-0 bg-black backdrop-blur-md opacity-30" />
          <div className="flex items-center justify-center w-full h-screen px-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div
                className="transition-all transform text-grey"
                style={{
                  width: isMobile ? `100%` : "65vw",
                  maxWidth: `${maxWidth}px`,
                }}
              >
                <div className="w-full p-px rounded bg-black100">
                  <div className="flex flex-col w-full h-full p-6 overflow-y-auto rounded bg-dark-900">
                    <div
                      style={{
                        minHeight: `${minHeight}vh`,
                        maxHeight: `${maxHeight}vh`,
                      }}
                    >
                      <>{children}</>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition> */}

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          initialFocus={refDiv}
          as="div"
          onClose={onDismiss}
          className={`fixed inset-0 z-999 ${
            !scrollable ? "overflow-y-hidden" : "overflow-y-auto"
          } backdrop-blur-md`}
        >
          <Dialog.Overlay className="fixed inset-0 bg-black backdrop-blur-md opacity-30" />
          <div
            className={`flex items-center justify-center ${
              !scrollable && "h-screen"
            } ${!isMax && "px-4"}`}
            ref={refDiv}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div
                className={`transition-all transform ${isMax && "h-full z-50"}`}
                style={{
                  width: isMobile
                    ? `100%`
                    : isFullWidth || isMax
                    ? "100vw"
                    : "65vw",
                  maxWidth: isFullWidth || isMax ? "100%" : `${maxWidth}px`,
                }}
              >
                <div
                  className={` ${
                    isMax ? "h-full" : "p-px"
                  }  w-full rounded bg-dark-900`}
                >
                  <div
                    className={`${
                      !isMax && `rounded p-${padding}`
                    } flex flex-col w-full h-full  overflow-y-hidden  bg-black100`}
                    style={{ backgroundColor }}
                  >
                    <div
                      style={{
                        minHeight: isMax ? "100vh" : `${minHeight}vh`,
                        maxHeight: scrollable ? "auto" : `${maxHeight}vh`,
                      }}
                    >
                      <>{children}</>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

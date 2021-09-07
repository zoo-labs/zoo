import { ChevronLeftIcon } from 'components/Svg'
import React, { FC } from 'react'
import { XCircle } from 'react-feather'
import { CloseIcon } from 'components'
interface ModalHeaderProps {
  title?: string
  className?: string
  onClose?: () => void
  onBack?: () => void
}

const ModalHeader: FC<ModalHeaderProps> = ({ title = undefined, onClose = undefined, className = '', onBack = undefined }) => {
  return (
    <div className={`flex items-center justify-between mb-4 ${className}`}>
      {onBack && <ChevronLeftIcon onClick={onBack} width={24} height={24} className='cursor-pointer' />}
      {title && <h3 className='font-bold'>{title}</h3>}
      {/* <div className='flex items-center justify-center w-6 h-6 cursor-pointer text-primary hover:text-high-emphesis' onClick={onClose}>
        <XCircle width={24} height={24} />
      </div> */}
      <div className='p-1 bg-white rounded-full cursor-pointer' onClick={onClose}>
        <CloseIcon color='white' />
      </div>
    </div>
  )
}

export default ModalHeader

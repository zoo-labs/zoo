import { CloseIcon } from 'components/Svg'
import React from 'react'

interface HeaderModalProps {
  title: string
  onDismiss: () => void
}

const HeaderModal: React.FC<HeaderModalProps> = ({ title, onDismiss }) => {
  return (
    <div className='flex items-center justify-between mb-4 '>
      <h2 className='text-2xl font-medium font-bold'>{title}</h2>
      <div className='flex items-center justify-center w-6 h-6 cursor-pointer text-white hover:text-high-emphesis'>
        <div className='p-1 bg-white rounded-full' onClick={onDismiss}>
          <CloseIcon color='white' />
        </div>
      </div>
    </div>
  )
}

export default HeaderModal

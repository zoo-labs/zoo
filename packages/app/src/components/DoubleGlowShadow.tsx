import { isMobile } from 'react-device-detect'
import { FC } from 'react'

const DoubleGlowShadow: FC<{ className?: string }> = ({ children, className }) => {
  if (isMobile) {
    return <div className='shadow-swap'>{children}</div>
  }

  return (
    <div className={`relative w-full max-w-2xl ${className}`}>
      <div className='absolute top-1/4 -left-10 bg-primary bottom-4 w-3/5 rounded-full z-0 filter blur-[150px]' style={{ backgroundColor: 'rgb(45, 22, 87)' }} />
      <div className='absolute bottom-1/4 -right-10 bg-pink top-4 w-3/5 rounded-full z-0  filter blur-[150px]' style={{ backgroundColor: 'rgb(60, 7, 46)' }} />
      <div className='relative filter drop-shadow'>{children}</div>
    </div>
  )
}

export default DoubleGlowShadow

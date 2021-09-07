import { CheckmarkCircleIcon, CopyIcon } from 'components/Svg'
import React, { FC } from 'react'
import useCopyClipboard from '../../hooks/useCopyClipbord'

interface CopyHelperProps {
  className?: string
  toCopy: string
  children?: React.ReactNode
}

const CopyHelper: FC<CopyHelperProps> = ({ className, toCopy, children }) => {
  const [isCopied, setCopied] = useCopyClipboard()

  return (
    <div
      className={`
        flex items-center flex-shrink-0 space-x-1 no-underline cursor-pointer whitespace-nowrap hover:no-underline focus:no-underline active:no-underline text-blue opacity-80 hover:opacity-100 focus:opacity-100 
        ${className} `}
      onClick={() => setCopied(toCopy)}>
      {isCopied && (
        <div className='flex items-center space-x-1 whitespace-nowrap'>
          <h6>Copied</h6>
          <CheckmarkCircleIcon width={16} height={16} />
        </div>
      )}

      {!isCopied && (
        <>
          {children}
          <CopyIcon width='16px' color='primary' fill='rgb(140, 79, 248)' />
        </>
      )}
    </div>
  )
}

export default CopyHelper

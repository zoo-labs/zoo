import { useWeb3React } from '@web3-react/core'
import UserBlock from 'components/SideMenu/components/UserBlock'
import { ChevronLeftIcon } from 'components/Svg'
import React, { FC } from 'react'
interface BidModalHeaderProps {
  className?: string
  onBack: () => void
}

const BidModalHeader: FC<BidModalHeaderProps> = ({ className = '', onBack = undefined }) => {
  const { account } = useWeb3React()

  return (
    <div className={`flex items-center justify-between mb-4 ${className}`}>
      <div className='h-14 w-14 flex items-center justify-center rounded-full bg-dark-900 shadow-2xl'>
        <ChevronLeftIcon onClick={onBack} width={30} height={30} className='cursor-pointer text-white' fill='#f2f2f2' />
      </div>
      <UserBlock account={account} />
    </div>
  )
}

export default BidModalHeader

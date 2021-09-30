import { useWeb3React } from '@web3-react/core'
import UserBlock from 'components/SideMenu/components/UserBlock'
import { ChevronLeftIcon } from 'components/Svg'
import React, { FC } from 'react'
interface BidModalHeaderProps {
  className?: string
  onBack: () => void
  showAccount?: boolean
}

const BidModalHeader: FC<BidModalHeaderProps> = ({ className = '', onBack = undefined, showAccount }) => {
  const { account } = useWeb3React()

  return (
    <div className={`flex items-center justify-between mb-4 ${className}`}>
      <div onClick={onBack} className='h-14 w-14 flex items-center justify-center rounded-full bg-dark-900 shadow-2xl cursor-pointer'>
        <ChevronLeftIcon width={30} height={30} className=' text-white' fill='#f2f2f2' />
      </div>
      {showAccount && <UserBlock account={account} />}
    </div>
  )
}

export default BidModalHeader

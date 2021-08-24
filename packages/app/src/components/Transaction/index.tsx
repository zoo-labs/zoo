import React, { FC, useCallback, useMemo } from 'react'

import { CheckmarkCircleIcon } from 'components/Svg'
import { useWeb3React } from '@web3-react/core'
interface TransactionProps {
  hash: string
  action: string
  block: string
  tokenId: string
  url: string
}
const Transaction: FC<TransactionProps> = ({ hash, action, block, tokenId, url }) => {
  const { chainId } = useWeb3React()
  if (!chainId) return null

  return (
    <div className='flex flex-col w-full gap-2 px-3 py-1 rounded bg-dark-800'>
      <a href={`${url}`} className='flex items-center gap-2'>
        <h6 className='flex items-center hover:underline py-0.5'>{hash} ↗</h6>
        <div className='text-green'>
          <CheckmarkCircleIcon width={16} height={16} />
        </div>
      </a>
    </div>
  )
}

export default Transaction

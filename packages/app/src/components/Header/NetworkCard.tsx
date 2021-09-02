import { NETWORK_ICON, NETWORK_LABEL } from '../../constants/networks'

// import Image from 'next/image'
import React from 'react'
import { useWeb3React } from '@web3-react/core'
import { useWalletModal } from 'components/WalletModal'
// import { HardHatIcon } from 'components/SideMenu/icons'
import HardHatIcon from '../../modals/icons/HardHat'

// import { useActiveWeb3React } from '../../hooks/useActiveWeb3React'
// import { useNetworkModalToggle } from '../../state/application/hooks'

function NetworkCard(): JSX.Element | null {
  const { chainId } = useWeb3React()

  // const toggleNetworkModal = useNetworkModalToggle()
  const { onPresentNetworkModal } = useWalletModal()

  if (!chainId) return null

  return (
    <div
      className='flex items-center rounded-xl whitespace-nowrap text-sm font-medium cursor-pointer select-none pointer-events-auto bg-secondary mr-2 hover:bg-gray-800'
      onClick={() => onPresentNetworkModal()}>
      <div className='grid items-center grid-flow-col px-3 py-2 space-x-2 text-sm rounded-lg pointer-events-auto auto-cols-max bg-transparent text-secondary'>
        {chainId === 1337 || chainId === 1338 ? (
          <>
            <HardHatIcon />
            <div className='text-primary'>HardHat</div>
          </>
        ) : (
          <>
            <img src={NETWORK_ICON[chainId]} alt='Switch Network' className='rounded-md' width='22px' height='22px' /> <div className='text-primary'>{NETWORK_LABEL[chainId]}</div>
          </>
        )}
      </div>
    </div>
  )
}

export default NetworkCard

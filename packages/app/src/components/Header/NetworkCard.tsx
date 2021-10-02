import { NETWORK_ICON, NETWORK_LABEL } from '../../constants/networks'

// import Image from 'next/image'
import React from 'react'
import { useWeb3React } from '@web3-react/core'
// import { HardHatIcon } from 'components/SideMenu/icons'
import HardHatIcon from '../modals/icons/HardHat'
import NetworkModal from '../modals/NetworkModal'
// import { useActiveWeb3React } from '../../hooks/useActiveWeb3React'
import { useNetworkModalToggle } from '../../state/application/hooks'

function NetworkCard(): JSX.Element | null {
  const { chainId } = useWeb3React()

  const toggleNetworkModal = useNetworkModalToggle()

  if (!chainId) return null

  return (
    <div
      className='flex items-center rounded bg-secondary hover:bg-dark-800 p-0.5 whitespace-nowrap text-sm font-bold cursor-pointer select-none pointer-events-auto hover:bg-gray-800'
      onClick={() => toggleNetworkModal()}>
      <div className='grid items-center grid-flow-col mr-2 ml-1 px-2 py-1 space-x-2 text-sm rounded-lg pointer-events-auto auto-cols-max bg-transparent text-secondary'>
        <img src={NETWORK_ICON[chainId]} alt='Switch Network' className='rounded-md' width='28px' height='28px' /> <div className='text-primary'>{NETWORK_LABEL[chainId]}</div>
      </div>
      <NetworkModal />
    </div>
  )
}

export default NetworkCard

import { NETWORK_ICON, NETWORK_LABEL } from '../../constants/networks'

// import Image from 'next/image'
// import NetworkModel from '../../modals/NetworkModal'
import React from 'react'
import { useWeb3React } from '@web3-react/core'
// import { useActiveWeb3React } from '../../hooks/useActiveWeb3React'
// import { useNetworkModalToggle } from '../../state/application/hooks'

function NetworkCard(): JSX.Element | null {
  const { chainId } = useWeb3React()

  // const toggleNetworkModal = useNetworkModalToggle()

  if (!chainId) return null

  return (
    <div
      className='flex items-center rounded-xl whitespace-nowrap text-sm font-bold cursor-pointer select-none pointer-events-auto border border-gray-600 border-solid mr-2 hover:border-gray-500 '
      // onClick={() => toggleNetworkModal()}
    >
      <div className='grid items-center grid-flow-col px-3 py-2 space-x-2 text-sm rounded-lg pointer-events-auto auto-cols-max bg-transparent text-secondary'>
        <img src={require('../../assets/img/networks/bsc-network.jpg').default} alt='Switch Network' className='rounded-md' width='22px' height='22px' />
        <div className='text-primary'>BSC Testnet</div>
      </div>
      {/* <NetworkModel /> */}
    </div>
  )
}

export default NetworkCard

// import { ChainId } from '@zoolabs/sdk'
// import { NetworkContextName } from '../constants'
// import { Web3Provider } from '@ethersproject/providers'
// import { Web3ReactContextInterface } from '@web3-react/core/dist/types'
// import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'

// export function useActiveWeb3React(): Web3ReactContextInterface<Web3Provider> & {
//   chainId?: ChainId
// } {
//   // replace with address to impersonate
//   const impersonate = false
//   const context = useWeb3ReactCore<Web3Provider>()
//   const contextNetwork = useWeb3ReactCore<Web3Provider>(NetworkContextName)
//   return context.active
//     ? { ...context, account: impersonate || context.account }
//     : { ...contextNetwork, account: impersonate || contextNetwork.account }
// }

// export default useActiveWeb3React

import type { Connector } from '@web3-react/types'
import type { Web3Provider } from '@ethersproject/providers';
import { useAppSelector } from 'state/hooks'

export function useActiveWeb3React(): {
  connector: Connector;
  library: Web3Provider | undefined;
  chainId: number | undefined;
  account: string | undefined;
  active: boolean;
  error: Error | undefined;
  accounts: string[] | undefined;
  isActivating: boolean
} {
  const { usePriorityConnector, usePriorityProvider, usePriorityWeb3React, usePriorityIsActivating, usePriorityAccounts } = useAppSelector(
    (state) => state.application.priorityConnector
  );
  const priorityProvider = usePriorityProvider()

  const { connector,
    library,
    chainId,
    account,
    active,
    error } = usePriorityWeb3React(priorityProvider)
  const isActivating = usePriorityIsActivating()
  const accounts = usePriorityAccounts()
  // replace with address to impersonate
  return {
    connector,
    library,
    chainId,
    account,
    accounts,
    active,
    error, isActivating
  }
}

export default useActiveWeb3React

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

import type { Connector } from "@web3-react/types";
import type { BaseProvider, Web3Provider } from "@ethersproject/providers";
import { useAppSelector } from "state/hooks";
import { useWeb3React } from "@web3-react/core";

export function useActiveWeb3React(): {
  connector: Connector;
  library: BaseProvider | Web3Provider | any;
  chainId: number | undefined;
  account: string | undefined;
  active: boolean;
  error: Error | undefined;
  accounts: string[] | undefined;
  isActivating: boolean;
} {
  const {
    provider,
    connector,
    chainId,
    account,
    error,
    isActivating,
    accounts,
    isActive,
  } = useWeb3React();

  // replace with address to impersonate
  return {
    connector,
    library: provider,
    chainId,
    account,
    accounts,
    active: isActive,
    error,
    isActivating,
  };
}

export default useActiveWeb3React;

import { ethers } from "ethers";
import { Web3Provider } from '@ethersproject/providers'
import { ChainId } from '@zoolabs/zdk'
/**
 * Dummy for backwards compat
 */
export function useActiveWeb3React(): {
  account: string | null
  chainId: ChainId | null
  library: Web3Provider | null
  connector: any
} {
  // Handle SSR (no window) and missing wallet extension (no ethereum)
  if (typeof window === 'undefined' || !window.ethereum) {
    return {
      account: null,
      chainId: null,
      library: null,
      connector: null,
    }
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum)
  return {
    account: '0x0000000000000000000000',
    chainId: 1,
    library: provider,
    connector: null,
  }
}

export default useActiveWeb3React;

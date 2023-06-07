
import { ChainId } from '@zoolabs/zdk'
/**
 * Dummy for backwards compat
 */
export function useActiveWeb3React(): {
  account: string
  chainId: ChainId
  library: any
  connector: any
} {
  return {
    account: '0x0000000000000000000000',
    chainId: 1,
    library: {},
    connector: null,
  }
}

export default useActiveWeb3React;

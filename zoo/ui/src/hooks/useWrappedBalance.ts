import wrappedContracts from '../constants/wrappedContracts'
import { mainnet, useBalance } from 'wagmi'
import { UseBalanceToken } from '../types/wagmi'
import { useZooClient } from './'

export default function (params: Parameters<typeof useBalance>['0']) {
  const client = useZooClient()
  const chain = client?.currentChain()

  const contractAddress =
    chain?.id !== undefined && chain.id in wrappedContracts
      ? wrappedContracts[chain.id]
      : wrappedContracts[mainnet.id]

  const balance = useBalance({
    ...params,
    token: contractAddress as UseBalanceToken,
  })

  return {
    balance,
    contractAddress,
  }
}

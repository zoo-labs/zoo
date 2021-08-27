import ARGENT_WALLET_ABI from '../constants/abis/argent-wallet.json'
import { Contract } from '@ethersproject/contracts'
import { useContract } from './useContract'
import useIsArgentWallet from './useIsArgentWallet'
import { useWeb3React } from '@web3-react/core'

export function useArgentWalletContract(): Contract | null {
  const { account } = useWeb3React()
  const isArgentWallet = useIsArgentWallet()
  return useContract(isArgentWallet ? account ?? undefined : undefined, ARGENT_WALLET_ABI, true)
}

import { NEVER_RELOAD, useSingleCallResult } from '../state/multicall/hooks'

import { useArgentWalletDetectorContract } from './useContract'
import { useMemo } from 'react'
import { useWeb3React } from '@web3-react/core'

export default function useIsArgentWallet(): boolean {
  const { account } = useWeb3React()
  const argentWalletDetector = useArgentWalletDetectorContract()
  const inputs = useMemo(() => [account ?? undefined], [account])
  const call = useSingleCallResult(argentWalletDetector, 'isArgentWallet', inputs, NEVER_RELOAD)
  return call?.result?.[0] ?? false
}

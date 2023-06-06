import { injected } from '../config/wallets'
import { useEffect } from 'react'
import useActiveWeb3React from './useActiveWeb3React'

/**
 * Use for network and injected - logs user in
 * and out after checking what network theyre on
 */
function useInactiveListener(suppress = false) {
  const { active, error, connector } = useActiveWeb3React() // specifically using useWeb3React because of what this hook does

  useEffect(() => {
    const { ethereum } = window
    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleChainChanged = () => {
        // eat errors
        connector.activate(injected, undefined, true)
      }

      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          // eat errors
          connector.activate(injected, undefined, true)
        }
      }

      ethereum.on('chainChanged', handleChainChanged)
      ethereum.on('accountsChanged', handleAccountsChanged)

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('chainChanged', handleChainChanged)
          ethereum.removeListener('accountsChanged', handleAccountsChanged)
        }
      }
    }
    return undefined
  }, [active, error, suppress, connector.activate])
}

export default useInactiveListener

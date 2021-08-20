import { useCallback } from 'react'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { NoBscProviderError } from '@binance-chain/bsc-connector'
import { NoEthereumProviderError, UserRejectedRequestError as UserRejectedRequestErrorInjected } from '@web3-react/injected-connector'
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect, WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { connectorLocalStorageKey, ConnectorNames } from 'components/WalletModal'
import useToast from 'hooks/useToast'
import { connectorsByName } from 'connectors'
import { setupNetwork } from 'util/wallet'
import { useMatchBreakpoints } from 'hooks'

const useAuth = () => {
  const { activate, deactivate } = useWeb3React()
  const { toastError } = useToast()
  const { isXs, isSm } = useMatchBreakpoints()
  const isMobile = isXs || isSm

  const login = useCallback((connectorID: ConnectorNames) => {
    console.log('LOGGING IN.....')
    const connector = connectorsByName[connectorID]
    if (connector) {
      activate(connector, async (error: Error) => {
        if (error instanceof UnsupportedChainIdError) {
          const hasSetup = await setupNetwork('test')
          if (hasSetup) {
            activate(connector)
          } else {
            toastError('Unsupported Chain Id', 'Make sure you are on the Binance Smart Chain Network')
          }
        } else if (error instanceof NoEthereumProviderError || error instanceof NoBscProviderError) {
          toastError('Provider Error', 'No provider was found')
          setTimeout(() => (location.href = 'https://metamask.io/download'), 3000)
        } else if (error instanceof UserRejectedRequestErrorInjected || error instanceof UserRejectedRequestErrorWalletConnect) {
          if (connector instanceof WalletConnectConnector) {
            const walletConnector = connector as WalletConnectConnector
            walletConnector.walletConnectProvider = null
            console.log('ERROR')
            const hasSetup = await setupNetwork('chapel')
            if (hasSetup) {
              activate(connector)
            }
          }
        } else {
          window.localStorage.removeItem(connectorLocalStorageKey)
          if (error instanceof NoEthereumProviderError || error instanceof NoBscProviderError) {
            toastError('Provider Error', 'No provider was found')
          } else if (error instanceof UserRejectedRequestErrorInjected || error instanceof UserRejectedRequestErrorWalletConnect) {
            if (connector instanceof WalletConnectConnector) {
              const walletConnector = connector as WalletConnectConnector
              walletConnector.walletConnectProvider = null
            }
            toastError('Authorization Error', 'Please authorize to access your account')
          } else {
            toastError(error.name, error.message)
          }
        }
      })
    } else {
      toastError("Can't find connector", 'The connector config is wrong')
    }
  }, [])

  return { login, logout: deactivate }
}

export default useAuth

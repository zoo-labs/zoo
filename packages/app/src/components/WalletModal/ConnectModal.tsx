import React from 'react'
import { Button, Text, connectorLocalStorageKey } from 'components'
import { setupNetwork } from 'util/wallet'
import { useWeb3React } from '@web3-react/core'
import { connectorsByName } from 'connectors'
import { Modal } from '../Modal'
import WalletCard from './WalletCard'
import BSC from './icons/BinanceChain'
import config from './config'
import { Login } from './types'

interface Props {
  login: Login
  onDismiss?: () => void
}

const ConnectModal: React.FC<Props> = ({ login, onDismiss = () => null }) => {
  const { activate } = useWeb3React()
  const bscSwith = async (network) => {
    const connector = connectorsByName.injected
    const hasSetup = await setupNetwork(network)
    if (hasSetup) {
      activate(connector)
      window.localStorage.setItem(connectorLocalStorageKey, 'injected')
      onDismiss()
    }
  }
  return (
    <Modal title='Connect to a wallet' onDismiss={onDismiss}>
      {config.map((entry) => (
        <WalletCard key={entry.title} login={login} walletConfig={entry} onDismiss={onDismiss} mb='8px' />
      ))}
    </Modal>
  )
}

export default ConnectModal

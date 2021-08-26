import React from 'react'
import { useModal } from '../Modal'
import ConnectModal from './ConnectModal'
import AccountModal from './AccountModal'
import { Login } from './types'
import NetworkModal from './NetworkModal'
import WalletModal from './WalletModal'

interface ReturnType {
  onPresentConnectModal: () => void
  onPresentAccountModal: () => void
  onPresentNetworkModal: () => void
  onPresentWalletModal: () => void
}

const useWalletModal = (login?: Login, logout?: () => void, account?: string, history?: any): ReturnType => {
  const [onPresentConnectModal] = useModal(<ConnectModal login={login} />)
  const [onPresentAccountModal] = useModal(<AccountModal account={account || ''} logout={logout} history={history} />)
  const [onPresentNetworkModal] = useModal(<NetworkModal />)
  const [onPresentWalletModal] = useModal(<WalletModal />)

  return { onPresentConnectModal, onPresentAccountModal, onPresentNetworkModal, onPresentWalletModal }
}

export default useWalletModal

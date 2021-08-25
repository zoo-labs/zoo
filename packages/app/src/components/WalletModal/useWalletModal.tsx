import React from 'react'
import { useModal } from '../Modal'
import ConnectModal from './ConnectModal'
import AccountModal from './AccountModal'
import { Login } from './types'
import NetworkModal from './NetworkModal'

interface ReturnType {
  onPresentConnectModal: () => void
  onPresentAccountModal: () => void
  onPresentNetworkModal: () => void
}

const useWalletModal = (login?: Login, logout?: () => void, account?: string, history?: any): ReturnType => {
  const [onPresentConnectModal] = useModal(<ConnectModal login={login} />)
  const [onPresentAccountModal] = useModal(<AccountModal account={account || ''} logout={logout} history={history} />)
  const [onPresentNetworkModal] = useModal(<NetworkModal />)

  return { onPresentConnectModal, onPresentAccountModal, onPresentNetworkModal }
}

export default useWalletModal

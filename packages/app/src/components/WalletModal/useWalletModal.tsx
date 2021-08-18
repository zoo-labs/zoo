import React from 'react'
import { useModal } from '../Modal'
import ConnectModal from './ConnectModal'
import AccountModal from './AccountModal'
import { Login } from './types'

interface ReturnType {
  onPresentConnectModal: () => void
  onPresentAccountModal: () => void
}

const useWalletModal = (login: Login, logout: () => void, account?: string, history?: any): ReturnType => {
  const [onPresentConnectModal] = useModal(<ConnectModal login={login} />)
  const [onPresentAccountModal] = useModal(<AccountModal account={account || ''} logout={logout} history={history} />)
  return { onPresentConnectModal, onPresentAccountModal }
}

export default useWalletModal

import BorderButton from 'components/Button/BorderButton'
import React from 'react'
import { useHistory } from 'react-router-dom'
import Button from '../../../components/Button/Button'
import { useWalletModal } from '../../WalletModal'
import { Login } from '../../WalletModal/types'

interface Props {
  account?: string
  login: Login
  logout: () => void
}

const UserBlock: React.FC<Props> = ({ account, login, logout }) => {
  const history = useHistory()
  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(login, logout, account, history)
  const accountEllipsis = account ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}` : null
  return (
    <div>
      {account ? (
        <BorderButton
          scale='sm'
          onClick={() => {
            onPresentAccountModal()
          }}>
          {accountEllipsis}
        </BorderButton>
      ) : (
        <BorderButton
          scale='sm'
          onClick={() => {
            onPresentConnectModal()
          }}>
          Connect
        </BorderButton>
      )}
    </div>
  )
}

export default React.memo(UserBlock, (prevProps, nextProps) => prevProps.account === nextProps.account)

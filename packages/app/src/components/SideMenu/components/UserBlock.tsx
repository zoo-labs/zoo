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
  const accountEllipsis = account ? `${account.substring(0, 6)}...${account.substring(account.length - 6)}` : null
  return (
    <div>
      {account ? (
        <BorderButton
          scale='sm'
          style={{ fontSize: 14 }}
        <button
          className='font-semibold flex flex-nowrap p-2 rounded-lg'
          style={{ color: 'rgb(80, 144, 234)', backgroundColor: 'rgba(21, 61, 111, 0.44)', border: '1px solid rgba(21, 61, 111, 0.44)' }}
          onClick={() => {
            onPresentAccountModal()
          }}>
          {accountEllipsis}
        </button>
      ) : (
        <button
          className='font-semibold flex flex-nowrap p-2 rounded-lg'
          style={{ color: 'rgb(80, 144, 234)', backgroundColor: 'rgba(21, 61, 111, 0.44)', border: '1px solid rgba(21, 61, 111, 0.44)' }}
          onClick={() => {
            onPresentConnectModal()
          }}>
          Connect
        </button>
      )}
    </div>
  )
}

export default React.memo(UserBlock, (prevProps, nextProps) => prevProps.account === nextProps.account)

import BorderButton from 'components/Button/BorderButton'
import React from 'react'
import { useHistory } from 'react-router-dom'
import Button from '../../../components/Button/Button'
import { useWalletModal } from '../../WalletModal'
import { Login } from '../../WalletModal/types'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { injected, walletconnect, walletlink } from '../../../connectors'
import Metamask from '../../WalletModal/icons/Metamask'
import WalletConnect from '../../WalletModal/icons/WalletConnect'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { useWeb3 } from 'hooks'

interface Props {
  account?: string
  login: Login
  logout: () => void
}
const IconWrapper = styled.div<{ size?: number }>`
  align-items: center;
  justify-content: center;
  & > * {
    height: ${({ size }) => (size ? size + 'px' : '32px')};
    width: ${({ size }) => (size ? size + 'px' : '32px')};
  }
`
function StatusIcon({ connector }: { connector: AbstractConnector }) {
  if (connector === injected) {
    return (
      <IconWrapper size={16}>
        <Metamask />
      </IconWrapper>
    )
  } else if (connector === walletconnect) {
    return (
      <IconWrapper size={16}>
        <WalletConnect />
      </IconWrapper>
    )
  } else if (connector === walletlink) {
    return (
      <IconWrapper size={16}>
        <WalletConnect />
      </IconWrapper>
    )
  }
  return null
}
const UserBlock: React.FC<Props> = ({ account, login, logout }) => {
  const { connector } = useWeb3()

  const history = useHistory()
  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(login, logout, account, history)
  const accountEllipsis = account ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}` : null
  return (
    <div>
      {account ? (
        <div className='font-semibold flex flex-nowrap p-2 rounded-xl bg-gradient-to-r from-blue-600 to-pink-600 border-primary'>
          <button
            className='mr-2 rounded-lg'
            onClick={() => {
              onPresentAccountModal()
            }}>
            {accountEllipsis}
          </button>
          {connector && <StatusIcon connector={connector} />}
        </div>
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

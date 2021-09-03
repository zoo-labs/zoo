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
import { useConnectModalToggle } from 'state/application/hooks'
import ConnectModal from '../../../modals/ConnectModal'

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
  const toggleConnectModal = useConnectModalToggle()

  const history = useHistory()
  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(login, logout, account, history)
  const accountEllipsis = account ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}` : null

  return (
    <>
      <div>
        {account ? (
          <div className='font-bold flex flex-nowrap p-2 rounded-xl  bg-gradient-to-r from-btn1 to-btn2 hover:from-primary hover:to-primary border-primary'>
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
          <div className='font-bold flex flex-nowrap p-2 rounded-xl  bg-gradient-to-r from-btn1 to-btn2 hover:from-primary hover:to-primary border-primary'>
            <button className=' rounded-lg' onClick={() => toggleConnectModal()}>
              Connect
            </button>
          </div>
        )}
      </div>

      <ConnectModal />
    </>
  )
}

export default React.memo(UserBlock, (prevProps, nextProps) => prevProps.account === nextProps.account)

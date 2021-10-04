import { AbstractConnector } from '@web3-react/abstract-connector'
import { UnsupportedChainIdError } from '@web3-react/core'
import WalletModal from 'components/modals/WalletModal.tsx'
import { useWeb3 } from 'hooks'
import React from 'react'
import { RiPulseLine } from 'react-icons/ri'
import { useAccountModalToggle, useConnectModalToggle, useWalletModalToggle } from 'state/application/hooks'
import styled from 'styled-components'
import { injected, walletconnect, walletlink } from '../../../connectors'
import AccountModal from '../../modals/AccountModal'
import ConnectModal from '../../modals/ConnectModal'
import Metamask from '../../modals/icons/Metamask'
import WalletConnect from '../../modals/icons/WalletConnect'
interface Props {
  account?: string
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
  return <h6></h6>
}
function UserBlock({ account }: Props) {
  const { connector, error } = useWeb3()
  const toggleConnectModal = useConnectModalToggle()
  const toggleAccountModal = useAccountModalToggle()
  const toggleWalletModal = useWalletModalToggle()

  const accountEllipsis = account ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}` : null
  console.log('connector', connector)
  return (
    <>
      <div>
        {account ? (
          <div
            style={{ paddingTop: '6px', paddingBottom: '6px', marginTop: '2px', marginRight: '2px', marginBottom: '2px' }}
            className='flex items-center px-3 text-sm rounded-lg text-secondary bg-gradient-to-b from-btn1 to-btn2 hover:from-primary hover:to-primary'>
            <button
              className='font-semibold mr-2'
              onClick={() => {
                toggleAccountModal()
              }}>
              {accountEllipsis}
            </button>
            {connector && <StatusIcon connector={connector} />}
          </div>
        ) : error ? (
          <div className='flex items-center px-3 py-2 text-sm rounded-lg text-secondary bg-gradient-to-b from-btn1 to-btn2 hover:from-primary hover:to-primary'>
            <button
              className='font-semibold mr-2 flex items-center'
              onClick={() => {
                toggleWalletModal()
              }}>
              <RiPulseLine />
              <h6 className='pl-2'>{error instanceof UnsupportedChainIdError ? `Wrong Network` : `Error connecting`}</h6>
            </button>
          </div>
        ) : (
          <div className='flex items-center px-3 py-2 text-sm rounded-lg text-secondary bg-gradient-to-b from-btn1 to-btn2 hover:from-primary hover:to-primary'>
            <button className='font-semiold rounded-lg' onClick={() => toggleConnectModal()}>
              Connect to wallet
            </button>
          </div>
        )}
      </div>
      <WalletModal />
      <ConnectModal />
      <AccountModal />
    </>
  )
}

export default React.memo(UserBlock, (prevProps, nextProps) => prevProps.account === nextProps.account)

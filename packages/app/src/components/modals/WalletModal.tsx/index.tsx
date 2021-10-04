import { AbstractConnector } from '@web3-react/abstract-connector'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import HeaderModal from 'components/Modal/HeaderModal'
import connectors from 'components/modals/config'
import Modal from 'components/NewModal'
import { CloseIcon, MetamaskIcon } from 'components/Svg'
import { injected } from 'connectors'
import React, { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { ApplicationModal } from 'state/application/actions'
import { useModalOpen, useWalletModalToggle } from 'state/application/hooks'
import styled from 'styled-components'
import usePrevious from '../../../hooks/usePrevious'
import Option from './Option'
import PendingView from './PendingView'

declare let window: any

const CloseButton = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`

const HeaderRow = styled.div`
  margin-bottom: 1rem;
`

const UpperSection = styled.div`
  position: relative;
  h5 {
    margin: 0;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    font-weight: 400;
  }
  h5:last-child {
    margin-bottom: 0px;
  }
  h4 {
    margin-top: 0;
    font-weight: 500;
  }
`

const WALLET_VIEWS = {
  OPTIONS: 'options',
  OPTIONS_SECONDARY: 'options_secondary',
  ACCOUNT: 'account',
  PENDING: 'pending',
}

export default function WalletModal({ onDismiss = () => null }: { onDismiss?: () => void }) {
  // console.log({ ENSName })
  // important that these are destructed from the account-specific web3-react context
  const { active, account, connector, activate, error } = useWeb3React()

  const [walletView, setWalletView] = useState(WALLET_VIEWS.ACCOUNT)

  const [pendingWallet, setPendingWallet] = useState<AbstractConnector | undefined>()

  const [pendingError, setPendingError] = useState<boolean>()
  const isModalOpen = useModalOpen(ApplicationModal.WALLET)
  const toggleWalletModal = useWalletModalToggle()
  const walletModalOpen = useModalOpen(ApplicationModal.WALLET)

  const previousAccount = usePrevious(account)

  // close on connection, when logged out before
  useEffect(() => {
    if (account && !previousAccount && walletModalOpen) {
      toggleWalletModal()
    }
  }, [account, previousAccount, toggleWalletModal, walletModalOpen])

  // always reset to account view
  useEffect(() => {
    if (walletModalOpen) {
      setPendingError(false)
      setWalletView(WALLET_VIEWS.ACCOUNT)
    }
  }, [walletModalOpen])

  // close modal when a connection is successful
  const activePrevious = usePrevious(active)
  const connectorPrevious = usePrevious(connector)
  useEffect(() => {
    if (walletModalOpen && ((active && !activePrevious) || (connector && connector !== connectorPrevious && !error))) {
      setWalletView(WALLET_VIEWS.ACCOUNT)
    }
  }, [setWalletView, active, error, connector, walletModalOpen, activePrevious, connectorPrevious])

  const tryActivation = async (connector: (() => Promise<AbstractConnector>) | AbstractConnector | undefined) => {
    let name = ''
    let conn = typeof connector === 'function' ? await connector() : connector

    Object.keys(connectors).map((key) => {
      if (connector === connectors[key].connectorId) {
        return (name = connectors[key].title)
      }
      return true
    })

    setPendingWallet(conn) // set wallet for pending view
    setWalletView(WALLET_VIEWS.PENDING)

    // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
    if (conn instanceof WalletConnectConnector && conn.walletConnectProvider?.wc?.uri) {
      conn.walletConnectProvider = undefined
    }

    conn &&
      activate(conn, undefined, true).catch((error) => {
        if (error instanceof UnsupportedChainIdError) {
          activate(conn) // a little janky...can't use setError because the connector isn't set
          // window.localStorage.setItem(connectorLocalStorageKey, connector)
        } else {
          setPendingError(true)
        }
      })
  }

  //  close wallet modal if fortmatic modal is active
  useEffect(() => {
    if (connector?.constructor?.name === 'FormaticConnector') {
      connector.on('OVERLAY_READY', () => {
        toggleWalletModal()
      })
    }
  }, [toggleWalletModal, connector])

  // get wallets user can switch too, depending on device/browser
  function getOptions() {
    const isMetamask = window.ethereum && window.ethereum.isMetaMask
    return Object.keys(connectors).map((key) => {
      const option = connectors[key]
      //check for mobile options
      if (isMobile) {
        // disable portis on mobile for now
        if (option.name === 'Portis') {
          return null
        }

        if (!window.web3 && !window.ethereum && option.mobile) {
          return (
            <Option
              onClick={() => {
                tryActivation(option.connectorId)
              }}
              id={`connect-${key}`}
              key={key}
              active={option.connectorId && option.connectorId === connector}
              color={option.color}
              link={option.href}
              header={option.title}
              subheader={null}
              Icon={option.icon}
            />
          )
        }
        return null
      }

      // overwrite injected when needed
      if (option.connector === injected) {
        // don't show injected if there's no injected provider
        if (!(window.web3 || window.ethereum)) {
          if (option.name === 'MetaMask') {
            return <Option id={`connect-${key}`} key={key} color={'#E8831D'} header={'Install Metamask'} subheader={null} link={'https://metamask.io/'} Icon={MetamaskIcon} />
          } else {
            return null // dont want to return install twice
          }
        }
        // don't return metamask if injected provider isn't metamask
        else if (option.name === 'MetaMask' && !isMetamask) {
          return null
        }
        // likewise for generic
        else if (option.name === 'Injected' && isMetamask) {
          return null
        }
      }
      // return rest of options
      return (
        !isMobile &&
        !option.mobileOnly && (
          <Option
            id={`connect-${key}`}
            onClick={() => {
              option.connector === connector ? setWalletView(WALLET_VIEWS.ACCOUNT) : !option.href && tryActivation(option.connector)
            }}
            key={key}
            active={option.connector === connector}
            color={option.color}
            link={option.href}
            header={option.title}
            subheader={null} // use option.descriptio to bring back multi-line
            Icon={option.icon}
          />
        )
      )
    })
  }

  function getModalContent() {
    if (error) {
      return (
        <UpperSection>
          <CloseButton onClick={toggleWalletModal}>
            <CloseIcon fill='white' />
          </CloseButton>
          <HeaderRow style={{ paddingLeft: 0, paddingRight: 0 }}>{error instanceof UnsupportedChainIdError ? `Wrong Network` : `Error connecting`}</HeaderRow>
          <div>{error instanceof UnsupportedChainIdError ? <h5>Please connect to a supported network.</h5> : `Error connecting. Try refreshing the page.`}</div>
        </UpperSection>
      )
    }
    return (
      <div className='flex flex-col space-y-4'>
        <HeaderModal title='Select a Wallet' onDismiss={() => toggleWalletModal()} />
        <div className='flex flex-col space-y-6'>
          {walletView === WALLET_VIEWS.PENDING ? (
            <PendingView connector={pendingWallet} error={pendingError} setPendingError={setPendingError} tryActivation={tryActivation} />
          ) : (
            <div className='flex flex-col space-y-5 overflow-y-auto'>{getOptions()}</div>
          )}
          {walletView !== WALLET_VIEWS.PENDING && (
            <div className='flex flex-col text-center'>
              <div className='text-secondary'>New to Ethereum?</div>
              <a href='https://ethereum.org/wallets/' className='primary text-baseline whitespace-nowrap'>
                Learn more about wallets
              </a>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <Modal isOpen={isModalOpen} onDismiss={() => null} maxWidth={420} maxHeight={90}>
      {getModalContent()}
    </Modal>
  )
}

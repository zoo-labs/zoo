import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { connectorLocalStorageKey } from '../config'
import { numberWithCommas } from 'components/Functions'
import HeaderModal from 'components/Modal/HeaderModal'
import { ApplicationModal } from 'state/application/actions'
import { useModalOpen, useAccountModalToggle, useWalletModalToggle } from 'state/application/hooks'
import Modal from '../../NewModal'
import useAuth from 'hooks/useAuth'
import { useHistory } from 'react-router'
import CopyHelper from 'components/Copy/Copy'
import { useSelector } from 'react-redux'
import { AppState } from 'state'
import { injected, walletconnect, walletlink } from 'connectors'
import { AbstractConnector } from '@web3-react/abstract-connector'

interface AccountModalProps {}

const AccountModal: React.FC<AccountModalProps> = ({}) => {
  const accountModal = useModalOpen(ApplicationModal.ACCOUNT)
  const toggleccountModal = useAccountModalToggle()
  const toggleWalletModal = useWalletModalToggle()
  const { logout } = useAuth()
  const { chainId, account, connector } = useWeb3React()
  const history = useHistory()
  const zooBalance = useSelector<AppState, AppState['zoo']['zooBalance']>((state) => state.zoo.zooBalance)

  function getConnector(connector: AbstractConnector) {
    if (connector === injected) {
      return 'Metamask'
    } else if (connector === walletconnect) {
      return 'WalletConnect '
    } else if (connector === walletlink) {
      return 'WalletConnect '
    }
    return <h6></h6>
  }

  return (
    <Modal isOpen={accountModal} onDismiss={() => null} maxWidth={440}>
      <div className='space-y-3'>
        <div className='space-y-3'>
          <HeaderModal onDismiss={() => toggleccountModal()} title='Account' />
          <div className='space-y-3'>
            <div className='flex items-center justify-between'>
              <div className='font-medium text-baseline text-secondary'>
                Connected with <span className='text-pink-500 font-semibold'>{connector && getConnector(connector)}</span>
              </div>
              <div className='flex space-x-3'>
                <button
                  //  chainId !== 56 ? bscSwith('bsc') : null, chainId !== 97 ? bscSwith('chapel')

                  //  : null

                  onClick={() => toggleWalletModal()}
                  className='bg-dark-700 bg-opacity-20 outline-gray rounded text-gray hover:bg-opacity-40 disabled:bg-opacity-20 px-2 py-1 text-xs rounded disabled:cursor-not-allowed focus:outline-none'>
                  Change
                </button>
              </div>
            </div>
            <div className='flex flex-col justify-center space-y-3'>
              <div className='bg-dark-800 py-2 px-3 rounded'>
                <div className='text-base font-medium currentColor'>{account ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}` : ''}</div>
              </div>
              <div className='flex items-center space-x-3 gap-2'>
                <a
                  className='text-baseline whitespace-nowrap text-blue opacity-80 hover:opacity-100 focus:opacity-100 space-x-1 flex items-center justify-center'
                  href={`https://testnet.bscscan.com/address/${account || ''}`}
                  target='_blank'
                  rel='noopener noreferrer'>
                  <div className='text-sm font-medium primary'>View on explorer</div>
                </a>
                <CopyHelper toCopy={account}>
                  <div className='text-sm font-medium primary'>Copy Address</div>
                </CopyHelper>
              </div>
            </div>
          </div>
        </div>
        <div className='space-y-2'>
          <div className='flex items-center justify-between mt-8'>
            <div className='text-base font-bold currentColor'>{numberWithCommas(zooBalance)} ZOO</div>

            <div>
              <button
                onClick={() => {
                  logout()
                  window.localStorage.removeItem(connectorLocalStorageKey)
                  history.push(`/login`)
                  toggleccountModal()
                }}
                className='bg-dark-700 bg-opacity-20 outline-gray rounded text-gray hover:bg-opacity-40 disabled:bg-opacity-20 px-2 py-1 text-xs rounded disabled:cursor-not-allowed focus:outline-none'>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default AccountModal

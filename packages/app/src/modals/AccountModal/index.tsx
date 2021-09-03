import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { connectorLocalStorageKey, useMatchBreakpoints } from 'components'
import useWeb3 from 'hooks/useWeb3'
import { getFaucet, getToken } from 'util/contracts'
import AltModal from 'components/Modal/AltModal'
import { numberWithCommas } from 'components/Functions'
import HeaderModal from 'components/Modal/HeaderModal'
import { ApplicationModal } from 'state/application/actions'
import { useModalOpen, useAccountModalToggle, useWalletModalToggle } from 'state/application/hooks'
import Modal from '../../components/NewModal'
import useAuth from 'hooks/useAuth'
import { useHistory } from 'react-router'
import CopyHelper from 'components/WalletModal/Copy'

interface AccountModalProps {}

const AccountModal: React.FC<AccountModalProps> = ({}) => {
  const accountModal = useModalOpen(ApplicationModal.ACCOUNT)
  const toggleccountModal = useAccountModalToggle()
  const toggleWalletModal = useWalletModalToggle()

  const { logout } = useAuth()
  const { chainId, account } = useWeb3React()
  const scanLinks = {
    1: `https://etherscan.io/address/`,
    42: `https://kovan.etherscan.io/address/`,
    56: `https://bscscan.com/address/`,
    97: `https://testnet.bscscan.com/address/`,
  }
  const base = scanLinks[chainId] ? scanLinks[chainId] : `https://etherscan.io/address/`
  const bscType = chainId === 97 || chainId === 56
  const { isSm, isXs } = useMatchBreakpoints()
  const [wait, setWait] = useState(false)
  const [balance, setBalance] = useState(0.0)
  const web3 = useWeb3()
  const mobile = isSm || isXs
  const zooToken = getToken(web3)
  const faucet = getFaucet(web3)
  const faucetAmt = web3.utils.toWei('50')

  const history = useHistory()
  const getBalance = async () => {
    try {
      const decimals = await zooToken.methods.decimals().call()
      const rawBalance = await zooToken.methods.balanceOf(account).call()
      const divisor = parseFloat(Math.pow(10, decimals).toString())
      const balance = rawBalance / divisor
      setBalance(parseFloat(balance.toFixed(3)))
    } catch (e) {
      console.error('ISSUE LOADING ZOO BALANCE \n', e)
    }
  }

  useEffect(() => {
    getBalance()
  }, [account, chainId])

  useEffect(() => {
    getBalance()
  }, [])

  const handleFaucet = () => {
    try {
      setWait(true)
      faucet.methods
        .buyZoo(account, faucetAmt)
        .send({ from: account })
        .then(() => {
          setWait(false)
          getBalance()
        })
        .catch((e) => {
          console.error('ISSUE USING FAUCET \n', e)
          setWait(false)
        })
    } catch (e) {
      console.error('ISSUE USING FAUCET \n', e)
    }
  }

  const getNetwork = (chainId: number) => {
    switch (chainId) {
      case 56:
        return 'BSC-Test'
      case 97:
        return 'BSC'
      default:
        return ''
    }
  }

  return (
    <Modal isOpen={accountModal} onDismiss={() => null} maxWidth={440}>
      <div className='space-y-3'>
        <div className='space-y-3'>
          <HeaderModal onDismiss={() => toggleccountModal()} title='Account' />
          <div className='space-y-3'>
            <div className='flex items-center justify-between'>
              <div className='font-medium text-baseline text-secondary'>Connected with {getNetwork(chainId)}</div>
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
            {/* {
              chainId === 97 ? (
                <div className='flex items-center  cursor-pointer' onClick={() => handleFunds()}>
                  <span
                    className={`flex items-center justify-center px-4 text-base font-medium text-center rounded-md text-secondary hover:text-high-emphesis font-bold border rounded-lg text-high-emphesis border-dark-800 bg-dark-700  hover:bg-primary h-full
                      `}
                    style={{ minHeight: 40 }}>
                    {chainId !== 97 && chainId !== 1337 ? 'Add Funds' : wait ? 'Processing' : 'Get Zoo'}
                  </span>
                </div>
              ) : (
                <div className='text-base font-bold currentColor'>{numberWithCommas(balance)} ZOO</div>
              )
            } */}

            <div className='text-base font-bold currentColor'>{numberWithCommas(balance)} ZOO</div>

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

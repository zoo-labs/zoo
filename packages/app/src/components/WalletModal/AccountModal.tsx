import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { connectorLocalStorageKey, useMatchBreakpoints } from 'components'
import { setupNetwork } from 'util/wallet'
import BorderButton from 'components/Button/BorderButton'
import { connectorsByName } from '../../connectors'
// import { useMoralis } from "react-moralis"
// import Moralis from 'moralis'
import { BigNumber, ethers } from 'ethers'
import Button from '../../components/Button/Button'
import { Label, Text } from '../../components/Text'
import Flex from '../../components/Box/Flex'
import { Modal, ModalCloseButton } from '../Modal'
import CopyToClipboard from './CopyToClipboard'
import { FaExchangeAlt } from 'react-icons/fa'
import useWeb3 from 'hooks/useWeb3'
import { getFaucet, getToken } from 'util/contracts'
import AltModal from 'components/Modal/AltModal'
import { numberWithCommas } from 'components/Functions'
import { CloseIcon } from 'components/Svg'
import CopyHelper from './Copy'
import useWalletModal from './useWalletModal'
import HeaderModal from 'components/Modal/HeaderModal'
// import LinkExternal from '../../components/Link/LinkExternal'

interface Props {
  account: string
  logout: () => void
  onDismiss?: () => void
  history?: any
}

const FitContent = styled.div`
  * > * {
    width: fit-content;
  }
  svg {
    width: 24px;
  }
`

const LabelWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
`

const ValueWrapper = styled(Text)`
    color: ${({ theme }) => theme.colors.text}
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 8px;
`
const RowWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin: 16px;
`

const AccountModal: React.FC<Props> = ({ account, logout, onDismiss = () => null, history }) => {
  const { chainId } = useWeb3React()
  const scanLinks = {
    1: `https://etherscan.io/address/`,
    42: `https://kovan.etherscan.io/address/`,
    56: `https://bscscan.com/address/`,
    97: `https://testnet.bscscan.com/address/`,
  }
  const base = scanLinks[chainId] ? scanLinks[chainId] : `https://etherscan.io/address/`
  const profileLink = `${base}${account}`
  const bscType = chainId === 97 || chainId === 56
  const { activate } = useWeb3React()
  const { isSm, isXs } = useMatchBreakpoints()
  const [wait, setWait] = useState(false)
  const [balance, setBalance] = useState(0.0)
  const web3 = useWeb3()
  const mobile = isSm || isXs
  const moreSpace = mobile && !bscType
  const zooToken = getToken(web3)
  const faucet = getFaucet(web3)
  const faucetAmt = web3.utils.toWei('50')
  const { onPresentWalletModal } = useWalletModal()

  // const { authenticate, isAuthenticated } = useMoralis();

  const bscSwith = async (network) => {
    const connector = connectorsByName.injected
    const hasSetup = await setupNetwork(network)
    if (hasSetup) {
      activate(connector)
      window.localStorage.setItem(connectorLocalStorageKey, 'injected')
      onDismiss()
    }
  }

  const getBalance = async () => {
    try {
      const decimals = await zooToken.methods.decimals().call()
      const rawBalance = await zooToken.methods.balanceOf(account).call()
      const divisor = parseFloat(Math.pow(10, decimals).toString())
      const balance = rawBalance / divisor
      setBalance(balance)
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

  const handleFunds = () => {
    console.log(chainId)
    switch (chainId) {
      case 97:
        handleFaucet()
        break
      default:
        const redirectWindow = window.open('https://pancakeswap.info/token/0x8e7788ee2b1d3e5451e182035d6b2b566c2fe997', '_blank')
      // redirectWindow.location
    }
  }

  const switchIcon = <FaExchangeAlt size='16px' style={{ margin: '0 8px -2px 0px' }} />
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
    <AltModal title='Your wallet' onDismiss={onDismiss} maxWidth='440px'>
      <div className='space-y-3'>
        <div className='space-y-3'>
          <HeaderModal onDismiss={onDismiss} title='Account' />
          <div className='space-y-3'>
            <div className='flex items-center justify-between'>
              <div className='font-medium text-baseline text-secondary'>Connected with {getNetwork(chainId)}</div>
              <div className='flex space-x-3'>
                <button
                  //  chainId !== 56 ? bscSwith('bsc') : null, chainId !== 97 ? bscSwith('chapel')

                  //  : null

                  onClick={() => onPresentWalletModal()}
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
                  onDismiss()
                }}
                className='bg-dark-700 bg-opacity-20 outline-gray rounded text-gray hover:bg-opacity-40 disabled:bg-opacity-20 px-2 py-1 text-xs rounded disabled:cursor-not-allowed focus:outline-none'>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <Label style={{ marginBottom: -20, padding: 0 }}>Address</Label>
      <ValueWrapper>{account}</ValueWrapper>
      <Flex justifyContent='space-evenly' flexDirection='column' mb={bscType ? '8px' : '32px'}>
        <LabelWrapper>
          <Label>Balance</Label>
        </LabelWrapper>
        <ValueWrapper>{balance} ZOO</ValueWrapper>
      </Flex>
      <Flex width='100%' alignItems='center' justifyContent='space-between' flexDirection={moreSpace ? 'column' : 'row'}>
        {chainId !== 56 ? (
          <BorderButton
            style={{ fontSize: 14 }}
            mb={moreSpace ? '8px' : null}
            onClick={() => {
              bscSwith('bsc')
            }}>
            {switchIcon}
            to BSC
          </BorderButton>
        ) : null}
        {chainId !== 97 ? (
          <BorderButton
            mb={moreSpace ? '8px' : null}
            style={{ fontSize: 14 }}
            onClick={() => {
              bscSwith('chapel')
            }}
            width={mobile ? 'auto' : '170px'}>
            {switchIcon}
            to BSC-Test
          </BorderButton>
        ) : null}
        <BorderButton
          scale='sm'
          style={{ fontSize: 14 }}
          onClick={() => {
            logout()
            window.localStorage.removeItem(connectorLocalStorageKey)
            history.push(`/login`)
            onDismiss()
          }}>
          Logout
        </BorderButton>
      </Flex> */}
    </AltModal>
  )
}

export default AccountModal

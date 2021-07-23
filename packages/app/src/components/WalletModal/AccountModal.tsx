import React from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { connectorLocalStorageKey, useMatchBreakpoints } from 'components'
import { setupNetwork } from 'util/wallet'
import { connectorsByName } from '../../connectors'
// import { useMoralis } from "react-moralis"
// import Moralis from 'moralis'
import { ethers } from 'ethers'
// import starterAppContract from 'config/abi/starterApp.json'
import Button from '../../components/Button/Button'
import Text from '../../components/Text/Text'
import Flex from '../../components/Box/Flex'
import { Modal } from '../Modal'
import CopyToClipboard from './CopyToClipboard'
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
  const mobile = isSm || isXs
  const moreSpace = mobile && !bscType
  // const { authenticate, isAuthenticated } = useMoralis();

  const bscSwith = async (network) => {
    console.log("CLICKING")
    const connector = connectorsByName.injected
    const hasSetup = await setupNetwork(network)
    if (hasSetup) {
      activate(connector)
      window.localStorage.setItem(connectorLocalStorageKey, 'injected')
      onDismiss()
    }
  }

  // const defineNewObject = async () => {
  //   const User = Moralis.Object.extend("User")
  //   const user = new User()
  //   user.set('health', 84)
  //   user.set('title', 'lala')
  //   await user.save()
  // }

  return (
    <Modal title="Your wallet" onDismiss={onDismiss} styles={{ minHeight: '250px', justifyContent: 'space-between' }}>
      <Text
        fontSize="20px"
        bold
        style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: '8px' }}
      >
        {account}
      </Text>
      {/* { !isAuthenticated ? 
              <GradientButton onClick = {() => authenticate()}>
          Validate
            </GradientButton> :
        <>
          <Text>Authenticated!</Text>
        </>
      } */}
      {/* <Flex justifyContent="space-evenly" flexDirection={moreSpace ? 'column' : 'row'} mb={bscType ? '8px' : '32px'}>
        <FitContent>
          <LinkExternal small href={profileLink} style={{marginRight: "16px"}}>
            {bscType ? 'View on BscScan' : 'View on Etherscan'}
          </LinkExternal>
        </FitContent>
        <CopyToClipboard toCopy={account}>Copy Address</CopyToClipboard>
      </Flex> */}

      <Flex justifyContent="space-evenly" flexDirection={moreSpace ? 'column' : 'row'}>
        {chainId !== 56 ? (
          <Button
            scale="sm"
            mb={moreSpace ? '8px' : null}
            variant="secondary"
            onClick={() => {
              bscSwith('bsc')
            }}
          >
            Switch to BSC
          </Button>
        ) : null}
        {chainId !== 97 ? (
          <Button
            scale="sm"
            mb={moreSpace ? '8px' : null}
            variant="secondary"
            onClick={() => {
              bscSwith('chapel')
            }}
          >
            Switch to BSC-Test
          </Button>
        ) : null}
        <Button
          scale="sm"
          variant="secondary"
          onClick={() => {
            logout()
            window.localStorage.removeItem(connectorLocalStorageKey)
            history.push(`/login`)
            onDismiss()
          }}
        >
          Logout
        </Button>
      </Flex>
    </Modal>
  )
}

export default AccountModal

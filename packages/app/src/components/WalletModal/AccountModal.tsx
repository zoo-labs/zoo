import React from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { connectorLocalStorageKey, useMatchBreakpoints } from 'components'
import { setupNetwork } from 'util/wallet'
import BorderButton from 'components/Button/BorderButton'
import { connectorsByName } from '../../connectors'
// import { useMoralis } from "react-moralis"
// import Moralis from 'moralis'
import { ethers } from "ethers";
// import starterAppContract from 'config/abi/starterApp.json'
import Button from '../../components/Button/Button'
import { Label, Text } from '../../components/Text'
import Flex from '../../components/Box/Flex'
import { Modal } from '../Modal'
import CopyToClipboard from './CopyToClipboard'
import { FaExchangeAlt } from 'react-icons/fa'
// import LinkExternal from '../../components/Link/LinkExternal'

interface Props {
   account: string;
   logout: () => void;
   onDismiss?: () => void;
   history?: any;
}

const FitContent = styled.div`
   * > * {
      width: fit-content;
   }
   svg {
      width: 24px;
   }
`;


const LabelWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    align-items: center;
`

const ValueWrapper = styled(Text)`
    font-size: 18px;
    color: white;
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
  const mobile = isSm || isXs
  const moreSpace = mobile && !bscType

  // PLACEHOLDER DATA
  const zooCount = 99999999999999999
  // const { authenticate, isAuthenticated } = useMoralis();

   const bscSwith = async (network) => {
      console.log("CLICKING");
      const connector = connectorsByName.injected;
      const hasSetup = await setupNetwork(network);
      if (hasSetup) {
         activate(connector);
         window.localStorage.setItem(connectorLocalStorageKey, "injected");
         onDismiss();
      }
   };


  const toLink = () => {
    const redirectWindow = window.open('https://pancakeswap.info/token/0x8e7788ee2b1d3e5451e182035d6b2b566c2fe997', '_blank');
    redirectWindow.location;
    // location.href = "https://pancakeswap.info/token/0x8e7788ee2b1d3e5451e182035d6b2b566c2fe997"
  }
  const switchIcon = (<FaExchangeAlt size="18px" style={{ margin: "0px 8px 0px 0px" }} />);
  return (
    <Modal title="Your wallet" onDismiss={onDismiss} styles={{ minHeight: '250px', justifyContent: 'space-between' }}>
      <Label>
        Address
      </Label>
      <ValueWrapper
      >
        {account}
      </ValueWrapper>
      <Flex justifyContent="space-evenly" flexDirection='column' mb={bscType ? '8px' : '32px'}>
        <LabelWrapper>
          <Label>
              Balance
          </Label>
          <BorderButton scale="xs" height="25px" onClick={toLink} width="130px">
              Add Funds
          </BorderButton>
        </LabelWrapper>
          <ValueWrapper>
              {zooCount} ZOO
          </ValueWrapper>
      </Flex>
      <Flex width="100%" alignItems="center" justifyContent="space-between" flexDirection={moreSpace ? 'column' : 'row'}>
        {chainId !== 56 ? (
          <BorderButton
            scale="sm"
            mb={moreSpace ? '8px' : null}
            onClick={() => {
              bscSwith('bsc')
            }}
          >
            {switchIcon}
             to BSC
          </BorderButton>
        ) : null}
        {chainId !== 97 ? (
          <BorderButton
            scale="sm"
            mb={moreSpace ? '8px' : null}
            onClick={() => {
              bscSwith('chapel')
            }}
            width={mobile ? "auto" : "250px"}
          >
            {switchIcon}
            to BSC-Test
          </BorderButton>
        ) : null}
        <BorderButton
          scale="sm"
          onClick={() => {
            logout()
            window.localStorage.removeItem(connectorLocalStorageKey)
            history.push(`/login`)
            onDismiss()
          }}
        >
          Logout
        </BorderButton>
      </Flex>
    </Modal>
  )
}

export default AccountModal;

import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { connectorLocalStorageKey, useMatchBreakpoints } from 'components'
import { setupNetwork } from 'util/wallet'
import BorderButton from 'components/Button/BorderButton'
import { connectorsByName } from '../../connectors'
// import { useMoralis } from "react-moralis"
// import Moralis from 'moralis'
import { ethers } from "ethers";
import Button from '../../components/Button/Button'
import { Label, Text } from '../../components/Text'
import Flex from '../../components/Box/Flex'
import { Modal } from '../Modal'
import CopyToClipboard from './CopyToClipboard'
import { FaExchangeAlt } from 'react-icons/fa'
import useWeb3 from "hooks/useWeb3";
import { getZooFaucet, getZooToken } from 'util/contractHelpers'
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
  const [wait, setWait] = useState(false);
  const [balance, setBalance] = useState(0.0);
  const web3 = useWeb3();
  const mobile = isSm || isXs
  const moreSpace = mobile && !bscType
  const zooToken = getZooToken(web3, chainId);
  const faucet = getZooFaucet(web3, chainId);
  const faucetAmt = web3.utils.toWei("50");


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

   const getBalance = async () => {
      try {
        const decimals = await zooToken.methods.decimals().call();
        const rawBalance = await zooToken.methods.balanceOf(account).call();
        const divisor = parseFloat(Math.pow(10, decimals).toString());
        const balance = rawBalance / divisor;
        setBalance(balance);
      } catch (e) {
        console.error("ISSUE LOADING ZOO BALANCE \n", e);
      }
    };

      useEffect(() => {
          getBalance();
      }, [account, chainId]);

      useEffect(() => {
          getBalance();
      }, []);


   const handleFaucet = () => {
      try {
         setWait(true);
         faucet.methods
            .buyZoo(account, faucetAmt)
            .send({ from: account })
            .then(() => {
               setWait(false);
               getBalance();
            })
            .catch((e) => {
               console.error("ISSUE USING FAUCET \n", e);
               setWait(false);
            });
      } catch (e) {
         console.error("ISSUE USING FAUCET \n", e);
      }
   };

   const handleFunds = () => {
      console.log(chainId);
      switch (chainId) {
         case 97:
            handleFaucet();
            break;
         default:
            const redirectWindow = window.open('https://pancakeswap.info/token/0x8e7788ee2b1d3e5451e182035d6b2b566c2fe997', '_blank');
            redirectWindow.location;
      }
   };



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
          <BorderButton scale="xs" height="25px" onClick={handleFunds} width="130px">
              Add Funds
          </BorderButton>
        </LabelWrapper>
          <ValueWrapper>
              {balance} ZOO
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
            width={mobile ? "auto" : "170px"}
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

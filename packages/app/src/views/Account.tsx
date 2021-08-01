import BorderButton from "components/Button/BorderButton";
import StickyBottomMenu from "components/Button/StickyBottomMenu"
import Page from "components/layout/Page";
import React, { useState, useEffect } from "react";
import { AppState } from "state";
import { useSelector } from "react-redux";
import { useWeb3React } from "@web3-react/core";
import { useHistory } from "react-router-dom";
import styles from "styled-components";
import { Label, Text } from "components/Text";
import { Flex, Heading, useMatchBreakpoints } from "components";
import Body from "components/layout/Body";
import { useModal } from "components/Modal";
import BuyEggs from "components/BuyEggs";
import MyZooAccount from "views/MyZooAccount";
import { getZooToken, getZooFaucet } from "util/contractHelpers";
import useWeb3 from "hooks/useWeb3";
import { FaShoppingCart } from "react-icons/fa";

const HeadingContainer = styles.div`
    width: 100%;
    display: flex;
    justify-content: start;
    margin: 0px 8px;
`;

const MyZooContainer = styles.div`
    width: 100%;
    display: flex;
    padding: 16px;

`;

const StyledButton = styles.button`
    cursor: pointer;
    text-decoration: underline;
    text-transform: uppercase;
`;

const LabelWrapper = styles.div`
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    align-items: center;
`;

const ValueWrapper = styles(Text)`
    color: ${({ theme }) => theme.colors.text};
    width: 100%;
    display: flex;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 18px;
`;
const RowWrapper = styles.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin: 16px;
`;

const StyledHeading = styles(Heading)`
   color: ${({ theme }) => theme.colors.text};
`

const Account: React.FC = () => {
   const [balance, setBalance] = useState(0.0);
   const [wait, setWait] = useState(false);
   const { account, chainId } = useWeb3React();
   const [allowance, setAllowance] = useState(false);
   const [disable, setDisable] = useState(false);
   const web3 = useWeb3();
   const { isXl } = useMatchBreakpoints();
   const history = useHistory();
   const [onBuyEggs] = useModal(<BuyEggs />);
   const allEggs = useSelector<AppState, AppState["zoo"]["eggs"]>(
      (state) => state.zoo.eggs
   );
   const currentEggsOwned = Object.values(allEggs).filter(
      (egg) => egg.owner === account
   ).length;
   // setEggsOwned(currentEggsOwned)
   const handleClick = () => {
      history.push("/bank");
   };

   const keeperAdd = "0x247124065114a03Cf51898b21F20C6C1Cf50679A"
   const zooToken = getZooToken(web3, chainId);
   const faucet = getZooFaucet(web3, chainId);

   const faucetAmt = web3.utils.toWei("50");
   const defaultAmt = web3.utils.toWei('1000000000', 'ether')

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
      try {
         const allowance = await zooToken.methods.allowance(account, keeperAdd).call()
         if(allowance > 0) setAllowance(true)
      } catch (error) {
         console.log(error)
      }
   };

   const approve = () => {
      setDisable(true)
      console.log("approval")
      const tsx = zooToken.methods.approve(keeperAdd, defaultAmt).send({ from: account })
         tsx
         .then(() => {
           setAllowance(true)
           setDisable(false)
         })
         .catch((e) => {
           console.error('APPROVE ERROR', e)
           setDisable(false)
         })
   }

   useEffect(() => {
      let mounted = true
      if(mounted){
         getBalance();
      }
      return () => {
         mounted = false
      }
   }, [account, chainId]);

   useEffect(() => {
      let mounted = true
      if(mounted){
         getBalance();
      }
      return () => {
         mounted = false
      }
   }, []);

   const pageHeading = (
      <HeadingContainer>
         <StyledHeading>My Account</StyledHeading>
         {/* <StyledButton
            style={{
               background: "transparent",
               border: "none",
               color: "white",
               marginLeft: "8px",
            }}
            onClick={() => handleClick()}>
            View Bank
         </StyledButton> */}
      </HeadingContainer>
   );

   const handleFaucet = () => {
      try {
          (true);
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

   const testContract = async () => {
      // setDisable(true)
      // const drops = await zooKeeper.methods.drops(0).call()
      // console.log(drops)
      // try {
      //    // buyEgg(uint256 _dropID) public returns (uint256)
      //    const buyEgg = zooKeeper.methods.buyEgg(1).send({ from: account })
      //    .then((res) => {
      //       console.log(res)
      //       setDisable(false)
      //     })
      //  } catch (error) {
      //     setDisable(false)
      //    console.log(error)
      //  }

      onBuyEggs()
   }

   const handleRedirect = () => {
      history.push('/feed')
   }

   return (
      <>
         <Page>
            {pageHeading}
            <Body>
               <LabelWrapper>
                  <Label small>Wallet Balance</Label>
                  <BorderButton
                     scale="sm"
                     minWidth={!isXl ? "120px" : "140px"}
                     style={{ fontSize: `${!isXl ? "14px" : "16px"}` }}
                     onClick={handleFunds}>
                     {(chainId !== 97 && chainId !== 31337)
                        ? "Add Funds"
                        : wait
                        ? "Processing..."
                        : "Get Zoo"}
                  </BorderButton>
               </LabelWrapper>
               <RowWrapper>
                  <ValueWrapper>{balance} ZOO</ValueWrapper>
               </RowWrapper>
               <LabelWrapper>
                  <Label small>{currentEggsOwned} Eggs Owned</Label>
                  <BorderButton
                     scale="sm"
                     minWidth={!isXl ? "120px" : "140px"}
                     onClick={allowance? () => testContract() : () => approve()}
                     style={{ fontSize: `${!isXl ? "14px" : "16px"}` }}>
                     {allowance? "BUY EGGS" : disable? "APPROVING": "APPROVE"}
                  </BorderButton>
               </LabelWrapper>

               <MyZooAccount />
                 </Body>
         </Page>
      </>
   );
};

export default Account;

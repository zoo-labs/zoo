import BorderButton from "components/Button/BorderButton";
import Page from "components/layout/Page";
import React, { useState, useEffect } from "react";
import { AppState } from "state";
import { useSelector } from "react-redux";
import { useWeb3React } from "@web3-react/core";
import useWeb3 from "hooks/useWeb3";
import { useHistory } from "react-router-dom";
import styles from "styled-components";
import { Label, Text } from "components/Text";
import { Heading } from "components";
import Body from "components/layout/Body";
import { useModal } from "components/Modal";
import BuyEggs from "components/BuyEggs";
import { getZooToken } from "util/contractHelpers";

const HeadingContainer = styles.div`
    width: 100%;
    display: flex;
    justify-content: start;
    margin: 0px 8px;
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
    color: white;
    width: 100%;
    display: flex;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;
const RowWrapper = styles.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin: 16px;
`;

const Bank: React.FC = () => {
   const [zooBalance, setBalance] = useState(0.0);
   const { account, chainId } = useWeb3React();
   const web3 = useWeb3();
   const history = useHistory();

   const zooToken = getZooToken(web3, chainId);

   const handleClick = () => {
      history.push("/account");
   };

   const getBalance = async () => {
      const decimals = await zooToken.methods.decimals().call();
      const rawBalance = await zooToken.methods.balanceOf(account).call();
      const divisor = parseFloat(Math.pow(10, decimals).toString());
      const balance = rawBalance / divisor;
      setBalance(balance);
   };

   useEffect(() => {
      getBalance();
   }, [account, chainId]);

   useEffect(() => {
      getBalance();
   }, []);

   const pageHeading = (
      <HeadingContainer>
         <Heading>My Bank</Heading>
         <StyledButton
            style={{
               background: "transparent",
               border: "none",
               color: "white",
               marginLeft: "8px",
            }}
            onClick={() => handleClick()}>
            View Account
         </StyledButton>
      </HeadingContainer>
   );

   return (
      <>
         <Page>
            {pageHeading}
            <Body>
               <LabelWrapper>
                  <Label>Wallet Balance</Label>
                  <BorderButton>Add Funds</BorderButton>
               </LabelWrapper>
               <ValueWrapper>{zooBalance} ZOOTOKENS</ValueWrapper>
               <ValueWrapper>~100 USD</ValueWrapper>
               <ValueWrapper>Total Daily Yield: 200 ZOOTOKENS</ValueWrapper>
            </Body>
         </Page>
      </>
   );
};

export default Bank;

import BorderButton from "components/Button/BorderButton";
import Page from "components/layout/Page";
import React, { useState } from "react";
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
    
`

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
    font-size: 18px;
`;
const RowWrapper = styles.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin: 16px;
`;

const Account: React.FC = () => {
   const { account } = useWeb3React();
   const {isXl} = useMatchBreakpoints();
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

   const pageHeading = (
      <HeadingContainer>
         <Heading>My Account</Heading>
         <StyledButton
            style={{
               background: "transparent",
               border: "none",
               color: "white",
               marginLeft: "8px",
            }}
            onClick={() => handleClick()}>
            View Bank
         </StyledButton>
      </HeadingContainer>
   );

   const toLink = () => {
    location.href = "https://pancakeswap.info/token/0x8e7788ee2b1d3e5451e182035d6b2b566c2fe997"
  }
   return (
      <>
         <Page>
            {pageHeading}
            <Body> 
               <LabelWrapper>
                  <Label small>Wallet Balance</Label>
                  <BorderButton scale="sm" minWidth={!isXl ? "140px" : "160px"}  style={{ fontSize: `${!isXl ? "14px" : "16px"}` }} onClick={toLink}>Add Funds</BorderButton>
               </LabelWrapper>
               <RowWrapper>
                  <ValueWrapper>Balance</ValueWrapper>
               </RowWrapper>
               <LabelWrapper>
                  <Label small>{currentEggsOwned} Eggs Owned</Label>
                  <BorderButton scale="sm" minWidth={!isXl ? "120px" : "140px"}  onClick={() => onBuyEggs()} style={{fontSize: `${!isXl ? "14px" : "16px"}`}}>
                     Buy Eggs
                  </BorderButton>
               </LabelWrapper>
            </Body>
            <MyZooAccount />
         </Page>
      </>
   );
};

export default Account;

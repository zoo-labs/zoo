import BorderButton from "components/Button/BorderButton";
import Page from "components/layout/Page";
import React, { useState } from "react";
import { AppState } from "state";
import { useSelector } from "react-redux";
import { useWeb3React } from "@web3-react/core";
import { useHistory } from "react-router-dom";
import styles from "styled-components";
import { Label, Text } from "components/Text";
import { Heading } from "components";
import Body from "components/layout/Body";
import { useModal } from "components/Modal";
import BuyEggs from "components/BuyEggs";

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
  const { account } = useWeb3React()
  const history = useHistory()
   // PLACEHOLDER DATA
  const zooCount = 99999999999999999
  
  const handleClick = () => {
    history.push('/account')
  }
  const toLink = () => {
    location.href = "https://pancakeswap.info/token/0x8e7788ee2b1d3e5451e182035d6b2b566c2fe997"
  }

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
        onClick={()=>handleClick()}
      >
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
              <BorderButton onClick={toLink}>Add Funds</BorderButton>
            </LabelWrapper>
            <ValueWrapper>
              {zooCount} ZOOTOKENS
            </ValueWrapper>
            <ValueWrapper>
              ~100 USD
            </ValueWrapper>
            <ValueWrapper>
              Total Daily Yield: 200 ZOOTOKENS
            </ValueWrapper>
          </Body>
      </Page>
    </>
  );
};

export default Bank;

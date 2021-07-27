import React, { useEffect, useState } from "react";
import useWeb3 from "hooks/useWeb3";
import { useWeb3React } from "@web3-react/core";
import Page from "components/layout/Page";
import styled from "styled-components";
import BorderButton from "components/Button/BorderButton";
import { getZooFaucet, getZooToken } from "util/contractHelpers";

interface FaucetProps {}

const FaucetWrapper = styled.div`
   color: white;
`;

export const Faucet: React.FC<FaucetProps> = () => {
   const [wait, setWait] = useState(false);
   const { chainId, account } = useWeb3React();
   const web3 = useWeb3();
   const [balance, setBalance] = useState(0);

   const zooToken = getZooToken(web3, chainId);
   const faucet = getZooFaucet(web3, chainId);

   const faucetAmt = 50000;

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

   useEffect(() => {
      getBalance();
   }, [account, chainId, wait]);

   useEffect(() => {
      getBalance();
   }, []);

   return (
      <>
         <Page>
            <FaucetWrapper>
               <BorderButton disabled={wait} scale="md" onClick={handleFaucet}>
                  {wait ? "Processing..." : "Get Zoo"}
               </BorderButton>
               <h1>Current balance {balance}</h1>
            </FaucetWrapper>
         </Page>
      </>
   );
};

export default Faucet;

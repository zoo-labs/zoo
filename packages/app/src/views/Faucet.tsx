import React, { useEffect, useState } from 'react'
import Page from "components/layout/Page";
import styled from 'styled-components'
import { useWeb3React } from "@web3-react/core";
// import {useWeb3, useContract} from 'hooks';

import {ethers} from 'ethers';

/* import CONTRACTS_JSON from '../contracts.json' */
import BorderButton from "components/Button/BorderButton";
// import ZooFaucet from '../artifacts/src/ZooFaucet.sol/ZooFaucet.json';

// deal with weird hardhat 
// const CONTRACTS = CONTRACTS_JSON['31337']['hardhat'].contracts

interface FaucetProps {
}

const FaucetWrapper = styled.div`
color: white;
`

export const Faucet: React.FC<FaucetProps> = () => {
	const { account } = useWeb3React();
	const [balance, setBalance] = useState(0);

	/* const ctx = useContract();

	const onBuy = async () => {
		const {senderContract} = ctx.getContract('ZooFaucet')
		const txn = await senderContract.buyZoo(account, 10000);
		await txn.wait();
		setBalance(0);
	} */

	/* useEffect(() => {
		const getBalance = async () => {

		const {contract} = ctx.getContract('ZooToken')
		const b = await contract.balanceOf(account);
		setBalance(b.toString());
		}

		getBalance();
	}, [balance]);
 */
	return (
      <>
         <Page>
	<FaucetWrapper>
            <BorderButton scale="md"/*  onClick={onBuy} */>
               Grant Zoo
            </BorderButton>
		<h1>Current balance {balance}</h1>
		</FaucetWrapper>
	 </Page>
      </>
	)
};

export default Faucet;

import React, { useEffect, useState } from 'react'
import Page from "components/layout/Page";
import styled from 'styled-components'
import { useWeb3React } from "@web3-react/core";
import {useWeb3} from 'hooks';
import {ethers} from 'ethers';
import CONTRACTS_JSON from '../contracts.json'
import BorderButton from "components/Button/BorderButton";
import ZooFaucet from '../artifacts/src/ZooFaucet.sol/ZooFaucet.json';

// deal with weird hardhat 
const CONTRACTS = CONTRACTS_JSON['31337']['hardhat'].contracts

interface FaucetProps {
}

const FaucetWrapper = styled.div`
color: white;
`

export const Faucet: React.FC<FaucetProps> = () => {
	const web3 = useWeb3();
	   const { account } = useWeb3React();

	const [faucetContract, setFaucetContract] = useState(null);
	const [faucetContractSend, setFaucetContractSend] = useState(null);
	const [provider, setProvider] = useState(null);

	useEffect(() => {
		const provider = new ethers.providers.Web3Provider((window as any).ethereum);
		setProvider(provider);
		const faucet = new ethers.Contract(CONTRACTS.ZooFaucet.address, ZooFaucet.abi, provider);
		setFaucetContract(faucet);
		const signer = provider.getSigner();
		const senderFaucet = new ethers.Contract(CONTRACTS.ZooFaucet.address, ZooFaucet.abi, signer);
		setFaucetContractSend(senderFaucet);
	
	}, [])


	const onBuy = async () => {
		const txn = await faucetContractSend.buyZoo(account, 1000);
		await txn.wait();
	}

	return (
      <>
         <Page>
		<FaucetWrapper>
            <BorderButton scale="md" onClick={onBuy}>
               Grant Zoo
            </BorderButton>
		</FaucetWrapper>
	 </Page>
      </>
	)
};

export default Faucet;

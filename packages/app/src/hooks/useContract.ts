import { useEffect, useState, useRef } from 'react'
// import { useWeb3React } from "@web3-react/core";

interface ContractType {
  contract: any
  senderContract: any
}

interface ContractMap {
  [name: string]: ContractType
}

// import { ethers } from 'ethers';

// const CONTRACTS_JSON = require('../contracts.json');
// const CONTRACTS = CONTRACTS_JSON['1337']['hardhat'].contracts;

// /**
//  * Can only be used in an useEffect() call
//  */
// const useContract = () => {
// 	const [contractMap, setContractMap]= useState({});

// 	const getProvider = () => new ethers.providers.Web3Provider((window as any).ethereum);

// 	const getContract = (contractName: string) => {
// 	// Should be using a set
// 	if (contractMap && !!contractMap[contractName]) {
// 		return contractMap[contractName];
// 	}

// 	const ContractDef = require(`../../../contracts/artifacts/src/${contractName}.sol/${contractName}.json`);
// 	// TODO: tie this to web3
// 	const provider = getProvider();
// 	const inst = new ethers.Contract(CONTRACTS[contractName].address,ContractDef.abi, provider);

// 	const signer = provider.getSigner();
// 	const sender = new ethers.Contract(CONTRACTS[contractName].address, ContractDef.abi, signer);

// 	const getBalance = async (account: string) => {
// 		const provider = getProvider();
// 	}

// 	const ct: ContractType = {
// 		contract: inst,
// 		senderContract: sender
// 	};

// 	const dupMap = Object.assign({}, contractMap, {
// 		[contractName]: ct
// 	});

// 	setContractMap(dupMap);
// 	  return ct;
// 	}

// 	return {getContract}

// }

// export default useContract

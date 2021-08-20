<<<<<<< HEAD
import {
  ARCHER_ROUTER_ADDRESS,
  BAR_ADDRESS,
  BENTOBOX_ADDRESS,
  BORING_HELPER_ADDRESS,
  CHAINLINK_ORACLE_ADDRESS,
  ENS_REGISTRAR_ADDRESS,
  FACTORY_ADDRESS,
  KASHI_ADDRESS,
  MAKER_ADDRESS,
  MASTERCHEF_ADDRESS,
  MASTERCHEF_V2_ADDRESS,
  MERKLE_DISTRIBUTOR_ADDRESS,
  MINICHEF_ADDRESS,
  MULTICALL2_ADDRESS,
  ROUTER_ADDRESS,
  STOP_LIMIT_ORDER_ADDRESS,
  SUSHI_ADDRESS,
  TIMELOCK_ADDRESS,
  WNATIVE_ADDRESS,
} from '@sushiswap/sdk'
import { ARGENT_WALLET_DETECTOR_ABI, ARGENT_WALLET_DETECTOR_MAINNET_ADDRESS } from '../constants/abis/argent-wallet-detector'

import ARCHER_ROUTER_ABI from '../constants/abis/archer-router.json'
import BAR_ABI from '../constants/abis/bar.json'
import BENTOBOX_ABI from '../constants/abis/bentobox.json'
import BORING_HELPER_ABI from '../constants/abis/boring-helper.json'
import CHAINLINK_ORACLE_ABI from '../constants/abis/chainlink-oracle.json'
import CLONE_REWARDER_ABI from '../constants/abis/clone-rewarder.json'
import COMPLEX_REWARDER_ABI from '../constants/abis/complex-rewarder.json'
import { Contract } from '@ethersproject/contracts'
import EIP_2612_ABI from '../constants/abis/eip-2612.json'
import ENS_ABI from '../constants/abis/ens-registrar.json'
import ENS_PUBLIC_RESOLVER_ABI from '../constants/abis/ens-public-resolver.json'
import ERC20_ABI from '../constants/abis/erc20.json'
import { ERC20_BYTES32_ABI } from '../constants/abis/erc20'
import FACTORY_ABI from '../constants/abis/factory.json'
import INARI_ABI from '../constants/abis/inari.json'
import IUniswapV2PairABI from '../constants/abis/uniswap-v2-pair.json'
import LIMIT_ORDER_ABI from '../constants/abis/limit-order.json'
import LIMIT_ORDER_HELPER_ABI from '../constants/abis/limit-order-helper.json'
import MAKER_ABI from '../constants/abis/maker.json'
import MASTERCHEF_ABI from '../constants/abis/masterchef.json'
import MASTERCHEF_V2_ABI from '../constants/abis/masterchef-v2.json'
import MEOWSHI_ABI from '../constants/abis/meowshi.json'
import MERKLE_DISTRIBUTOR_ABI from '../constants/abis/merkle-distributor.json'
import MINICHEF_ABI from '../constants/abis/minichef-v2.json'
import MULTICALL2_ABI from '../constants/abis/multicall2.json'
import ROUTER_ABI from '../constants/abis/router.json'
import SUSHI_ABI from '../constants/abis/sushi.json'
import TIMELOCK_ABI from '../constants/abis/timelock.json'
import UNI_FACTORY_ABI from '../constants/abis/uniswap-v2-factory.json'
import WETH9_ABI from '../constants/abis/weth.json'
import ZENKO_ABI from '../constants/abis/zenko.json'
import { getContract } from '../functions/contract'
import { useMemo } from 'react'
import { useWeb3 } from 'components'
import { useWeb3React } from '@web3-react/core'

const UNI_FACTORY_ADDRESS = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f'

export function useEIP2612Contract(tokenAddress?: string): Contract | null {
  return useContract(tokenAddress, EIP_2612_ABI, false)
}

// returns null on errors
export function useContract(address: string | undefined, ABI: any, withSignerIfPossible = true): Contract | null {
  const { library, account } = useWeb3()

  return useMemo(() => {
    if (!address || !ABI || !library) return null
    try {
      return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [address, ABI, library, withSignerIfPossible, account])
}

export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible)
}

export function useWETH9Contract(withSignerIfPossible?: boolean): Contract | null {
  const { chainID } = useWeb3()
  return useContract(chainID && WNATIVE_ADDRESS[chainID], WETH9_ABI, withSignerIfPossible)
}

export function useArgentWalletDetectorContract(): Contract | null {
  const { chainID } = useWeb3()
  return useContract(chainID === 1 ? ARGENT_WALLET_DETECTOR_MAINNET_ADDRESS : undefined, ARGENT_WALLET_DETECTOR_ABI, false)
}

export function useENSRegistrarContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainID } = useWeb3()
  return useContract(chainID && ENS_REGISTRAR_ADDRESS[chainID], ENS_ABI, withSignerIfPossible)
}

export function useENSResolverContract(address: string | undefined, withSignerIfPossible?: boolean): Contract | null {
  return useContract(address, ENS_PUBLIC_RESOLVER_ABI, withSignerIfPossible)
}

export function useBytes32TokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(tokenAddress, ERC20_BYTES32_ABI, withSignerIfPossible)
}

export function usePairContract(pairAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(pairAddress, IUniswapV2PairABI, withSignerIfPossible)
}

export function useMerkleDistributorContract(): Contract | null {
  const { chainID } = useWeb3()
  return useContract(chainID ? MERKLE_DISTRIBUTOR_ADDRESS[chainID] : undefined, MERKLE_DISTRIBUTOR_ABI, true)
}

export function useBoringHelperContract(): Contract | null {
  const { chainID } = useWeb3()
  return useContract(chainID && BORING_HELPER_ADDRESS[chainID], BORING_HELPER_ABI, false)
}

export function useMulticall2Contract() {
  const { chainID } = useWeb3()
  return useContract(chainID && MULTICALL2_ADDRESS[chainID], MULTICALL2_ABI, false)
}

export function useSushiContract(withSignerIfPossible = true): Contract | null {
  const { chainID } = useWeb3()
  return useContract(chainID && SUSHI_ADDRESS[chainID], SUSHI_ABI, withSignerIfPossible)
}

export function useMasterChefContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainID } = useWeb3()
  return useContract(chainID && MASTERCHEF_ADDRESS[chainID], MASTERCHEF_ABI, withSignerIfPossible)
}

export function useMasterChefV2Contract(withSignerIfPossible?: boolean): Contract | null {
  const { chainID } = useWeb3()
  return useContract(chainID && MASTERCHEF_V2_ADDRESS[chainID], MASTERCHEF_V2_ABI, withSignerIfPossible)
}
export function useMiniChefContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainID } = useWeb3()
  return useContract(chainID && MINICHEF_ADDRESS[chainID], MINICHEF_ABI, withSignerIfPossible)
}

export function useFactoryContract(): Contract | null {
  const { chainID } = useWeb3()
  return useContract(chainID && FACTORY_ADDRESS[chainID], FACTORY_ABI, false)
}

export function useRouterContract(useArcher = false, withSignerIfPossible?: boolean): Contract | null {
  const { chainID } = useWeb3()

  const address = useArcher ? ARCHER_ROUTER_ADDRESS[chainID] : ROUTER_ADDRESS[chainID]
  const abi = useArcher ? ARCHER_ROUTER_ABI : ROUTER_ABI

  return useContract(address, abi, withSignerIfPossible)
}

export function useSushiBarContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainID } = useWeb3()
  return useContract(chainID && BAR_ADDRESS[chainID], BAR_ABI, withSignerIfPossible)
}

export function useMakerContract(): Contract | null {
  const { chainID } = useWeb3()
  return useContract(chainID && MAKER_ADDRESS[chainID], MAKER_ABI, false)
}

export function useTimelockContract(): Contract | null {
  const { chainID } = useWeb3()
  return useContract(chainID && TIMELOCK_ADDRESS[chainID], TIMELOCK_ABI, false)
}

export function useBentoBoxContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainID } = useWeb3()
  return useContract(chainID && BENTOBOX_ADDRESS[chainID], BENTOBOX_ABI, withSignerIfPossible)
}
=======
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
>>>>>>> 372b5a7 (Typescript moralis)

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

<<<<<<< HEAD
export function useLimitOrderContract(withSignerIfPossibe?: boolean): Contract | null {
  const { chainID } = useWeb3()
  return useContract(STOP_LIMIT_ORDER_ADDRESS[chainID], LIMIT_ORDER_ABI, withSignerIfPossibe)
}
=======
// 	setContractMap(dupMap);
// 	  return ct;
// 	}
>>>>>>> 372b5a7 (Typescript moralis)

// 	return {getContract}

// }

// export default useContract

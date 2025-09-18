import { AddressZero } from "@ethersproject/constants";
import { Web3Provider } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import {
  AddressMap,
  ARCHER_ROUTER_ADDRESS,
  BAR_ADDRESS,
  BENTOBOX_ADDRESS,
  BORING_HELPER_ADDRESS,
  ChainId,
  CHAINLINK_ORACLE_ADDRESS,
  ENS_REGISTRAR_ADDRESS,
  FACTORY_ADDRESS,
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
} from "@zoolabs/zdk";
import { ethers } from "ethers";
import { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { abis, addresses } from "../constants";
import ARCHER_ROUTER_ABI from "../constants/abis/archer-router.json";
import {
  ARGENT_WALLET_DETECTOR_ABI,
  ARGENT_WALLET_DETECTOR_MAINNET_ADDRESS,
} from "../constants/abis/argent-wallet-detector";
import BAR_ABI from "../constants/abis/bar.json";
import BENTOBOX_ABI from "../constants/abis/bentobox.json";
import BORING_HELPER_ABI from "../constants/abis/boring-helper.json";
import CHAINLINK_ORACLE_ABI from "../constants/abis/chainlink-oracle.json";
import CLONE_REWARDER_ABI from "../constants/abis/clone-rewarder.json";
import COMPLEX_REWARDER_ABI from "../constants/abis/complex-rewarder.json";
import EIP_2612_ABI from "../constants/abis/eip-2612.json";
import ENS_PUBLIC_RESOLVER_ABI from "../constants/abis/ens-public-resolver.json";
import ENS_ABI from "../constants/abis/ens-registrar.json";
import { ERC20_BYTES32_ABI } from "../constants/abis/erc20";
import ERC20_ABI from "../constants/abis/erc20.json";
import FACTORY_ABI from "../constants/abis/factory.json";
import INARI_ABI from "../constants/abis/inari.json";
import LIMIT_ORDER_HELPER_ABI from "../constants/abis/limit-order-helper.json";
import LIMIT_ORDER_ABI from "../constants/abis/limit-order.json";
import MAKER_ABI from "../constants/abis/maker.json";
import MASTERCHEF_V2_ABI from "../constants/abis/masterchef-v2.json";
import MASTERCHEF_ABI from "../constants/abis/masterchef.json";
import MEOWSHI_ABI from "../constants/abis/meowshi.json";
import MERKLE_DISTRIBUTOR_ABI from "../constants/abis/merkle-distributor.json";
import MINICHEF_ABI from "../constants/abis/minichef-v2.json";
import MULTICALL2_ABI from "../constants/abis/multicall2.json";
import ROUTER_ABI from "../constants/abis/router.json";
import SUSHI_ABI from "../constants/abis/sushi.json";
import TIMELOCK_ABI from "../constants/abis/timelock.json";
import UNI_FACTORY_ABI from "../constants/abis/uniswap-v2-factory.json";
import IUniswapV2PairABI from "../constants/abis/uniswap-v2-pair.json";
import WETH9_ABI from "../constants/abis/weth.json";
import ZENKO_ABI from "../constants/abis/zenko.json";
import { getContract } from "../functions/contract";
import { isAddress } from "../functions/validate";
import { useActiveWeb3React } from "./useActiveWeb3React";

const UNI_FACTORY_ADDRESS = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f";

export function useEIP2612Contract(tokenAddress?: string): Contract | null {
  return useContract(tokenAddress, EIP_2612_ABI, false);
}

// returns null on errors
export function useContract(
  nameOrAddress: string | AddressMap | undefined,
  ABI: any = undefined,
  withSignerIfPossible = true,
  canUseDefaultProvider = false,
  altAddress?: string
): Contract | null {
  const { library, account, chainId } = useActiveWeb3React();

  //const provider = ethers.getDefaultProvider()

  let address: string | AddressMap | undefined = nameOrAddress;
  let chainIdStr = chainId ? chainId.toString() : "1";

  if (nameOrAddress && addresses[chainIdStr] && addresses[chainIdStr][nameOrAddress.toString()]) {
    address = addresses[chainIdStr][nameOrAddress.toString()];
    ABI =
      ABI || (abis[chainIdStr] && abis[chainIdStr][nameOrAddress.toString()])
        ? abis[chainIdStr][nameOrAddress.toString()]
        : null;
  }

  //const newLibrary = library ?? (canUseDefaultProvider && provider);

  return useMemo(() => {
    if (!address || !ABI || !library) return null;
    try {
      return getContract(
        altAddress ?? address.toString(),
        ABI,
        library,
        withSignerIfPossible && account ? account : undefined
      );
    } catch (error) {
      console.error("Failed to get contract", error);
      return null;
    }
  }, [address, ABI, library, withSignerIfPossible, account]);
}

export function useApp(): Contract | null {
  return useContract("App");
}

export function useDrop(useDefaultProvider?: boolean, altAddress?: string): Contract | null {
  return useContract(
    "Drop",
    undefined,
    true,
    useDefaultProvider ? true : false,
    altAddress
  );
}

export function useMedia(useDefaultProvider?: boolean): Contract | null {
  return useContract(
    "Media",
    undefined,
    true,
    useDefaultProvider ? true : false
  );
}

export function useTokenContract(
  tokenAddress?: string,
  withSignerIfPossible?: boolean
): Contract | null {
  return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible);
}

export function useWETH9Contract(
  withSignerIfPossible?: boolean
): Contract | null {
  const { chainId } = useActiveWeb3React();
  return useContract(
    WNATIVE_ADDRESS[chainId],
    WETH9_ABI,
    withSignerIfPossible
  );
}

export function useArgentWalletDetectorContract(): Contract | null {
  const { chainId } = useActiveWeb3React();
  return useContract(
    chainId === ChainId.MAINNET
      ? ARGENT_WALLET_DETECTOR_MAINNET_ADDRESS
      : undefined,
    ARGENT_WALLET_DETECTOR_ABI,
    false
  );
}

export function useENSRegistrarContract(
  withSignerIfPossible?: boolean
): Contract | null {
  const { chainId } = useActiveWeb3React();
  return useContract(
    ENS_REGISTRAR_ADDRESS[chainId],
    ENS_ABI,
    withSignerIfPossible
  );
}

export function useENSResolverContract(
  address: string | undefined,
  withSignerIfPossible?: boolean
): Contract | null {
  return useContract(address, ENS_PUBLIC_RESOLVER_ABI, withSignerIfPossible);
}

export function useBytes32TokenContract(
  tokenAddress?: string,
  withSignerIfPossible?: boolean
): Contract | null {
  return useContract(tokenAddress, ERC20_BYTES32_ABI, withSignerIfPossible);
}

export function usePairContract(
  pairAddress?: string,
  withSignerIfPossible?: boolean
): Contract | null {
  return useContract(pairAddress, IUniswapV2PairABI, withSignerIfPossible);
}

export function useMerkleDistributorContract(): Contract | null {
  const { chainId } = useActiveWeb3React();
  return useContract(
    chainId ? MERKLE_DISTRIBUTOR_ADDRESS[chainId] : undefined,
    MERKLE_DISTRIBUTOR_ABI,
    true
  );
}

export function useBoringHelperContract(): Contract | null {
  const { chainId } = useActiveWeb3React();
  return useContract(
    BORING_HELPER_ADDRESS[chainId],
    BORING_HELPER_ABI,
    false
  );
}

export function useMulticall2Contract() {
  const { chainId } = useActiveWeb3React();
  const contractAddressOrName = MULTICALL2_ADDRESS[chainId] || "Multicall2";
  return useContract(contractAddressOrName, MULTICALL2_ABI, false);
}

export function useSushiContract(withSignerIfPossible = true): Contract | null {
  const { chainId } = useActiveWeb3React();
  return useContract(
    SUSHI_ADDRESS[chainId],
    SUSHI_ABI,
    withSignerIfPossible
  );
}

export function useMasterChefContract(
  withSignerIfPossible?: boolean
): Contract | null {
  const { chainId } = useActiveWeb3React();
  return useContract(
    MASTERCHEF_ADDRESS[chainId],
    MASTERCHEF_ABI,
    withSignerIfPossible
  );
}

export function useMasterChefV2Contract(
  withSignerIfPossible?: boolean
): Contract | null {
  const { chainId } = useActiveWeb3React();
  return useContract(
    MASTERCHEF_V2_ADDRESS[chainId],
    MASTERCHEF_V2_ABI,
    withSignerIfPossible
  );
}
export function useMiniChefContract(
  withSignerIfPossible?: boolean
): Contract | null {
  const { chainId } = useActiveWeb3React();
  return useContract(
    MINICHEF_ADDRESS[chainId],
    MINICHEF_ABI,
    withSignerIfPossible
  );
}

export function useFactoryContract(): Contract | null {
  const { chainId } = useActiveWeb3React();
  return useContract(FACTORY_ADDRESS[chainId], FACTORY_ABI, false);
}

export function useRouterContract(
  useArcher = false,
  withSignerIfPossible?: boolean
): Contract | null {
  const { chainId } = useActiveWeb3React();

  const address = useArcher
    ? ARCHER_ROUTER_ADDRESS[chainId]
    : ROUTER_ADDRESS[chainId];
  const abi = useArcher ? ARCHER_ROUTER_ABI : ROUTER_ABI;

  return useContract(address, abi, withSignerIfPossible);
}

export function useSushiBarContract(
  withSignerIfPossible?: boolean
): Contract | null {
  const { chainId } = useActiveWeb3React();
  return useContract(
    BAR_ADDRESS[chainId],
    BAR_ABI,
    withSignerIfPossible
  );
}

export function useMakerContract(): Contract | null {
  const { chainId } = useActiveWeb3React();
  return useContract(MAKER_ADDRESS[chainId], MAKER_ABI, false);
}

export function useTimelockContract(): Contract | null {
  const { chainId } = useActiveWeb3React();
  return useContract(TIMELOCK_ADDRESS[chainId], TIMELOCK_ABI, false);
}

export function useBentoBoxContract(
  withSignerIfPossible?: boolean
): Contract | null {
  const { chainId } = useActiveWeb3React();
  return useContract(
    BENTOBOX_ADDRESS[chainId],
    BENTOBOX_ABI,
    withSignerIfPossible
  );
}

export function useChainlinkOracle(): Contract | null {
  const { chainId } = useActiveWeb3React();
  return useContract(
    CHAINLINK_ORACLE_ADDRESS[chainId],
    CHAINLINK_ORACLE_ABI,
    false
  );
}

export function useUniV2FactoryContract(): Contract | null {
  return useContract(UNI_FACTORY_ADDRESS, UNI_FACTORY_ABI, false);
}

export function useComplexRewarderContract(
  address: any,
  withSignerIfPossible?: boolean
): Contract | null {
  return useContract(address, COMPLEX_REWARDER_ABI, withSignerIfPossible);
}

export function useCloneRewarderContract(
  address: any,
  withSignerIfPossibe?: boolean
): Contract | null {
  return useContract(address, CLONE_REWARDER_ABI, withSignerIfPossibe);
}

export function useMeowshiContract(
  withSignerIfPossible?: boolean
): Contract | null {
  return useContract(
    "0x650F44eD6F1FE0E1417cb4b3115d52494B4D9b6D",
    MEOWSHI_ABI,
    withSignerIfPossible
  );
}

export function useLimitOrderContract(
  withSignerIfPossibe?: boolean
): Contract | null {
  const { chainId } = useActiveWeb3React();
  return useContract(
    STOP_LIMIT_ORDER_ADDRESS[chainId],
    LIMIT_ORDER_ABI,
    withSignerIfPossibe
  );
}

export function useLimitOrderHelperContract(
  withSignerIfPossible?: boolean
): Contract | null {
  return useContract(
    "0xe2f736B7d1f6071124CBb5FC23E93d141CD24E12",
    LIMIT_ORDER_HELPER_ABI,
    withSignerIfPossible
  );
}

export function useInariContract(
  withSignerIfPossible?: boolean
): Contract | null {
  return useContract(
    "0x195E8262AA81Ba560478EC6Ca4dA73745547073f",
    INARI_ABI,
    withSignerIfPossible
  );
}

export function useZenkoContract(
  withSignerIfPossible?: boolean
): Contract | null {
  return useContract(
    "0xa8f676c49f91655ab3b7c3ea2b73bb3088b2bc1f",
    ZENKO_ABI,
    withSignerIfPossible
  );
}
export function useZooToken(): Contract | null {
  return useContract("ZOO");
}
export function useZooKeeper(useDefaultProvider?: boolean): Contract | null {
  const zooKeeperContract = useContract(
    "ZooKeeper",
    undefined,
    true,
    useDefaultProvider ? true : false
  );
  return zooKeeperContract;
}
export function useFaucet(): Contract | null {
  const faucetContract = useContract("Faucet");

  return faucetContract;
}

export function useBnbToken(): Contract | null {
  return useContract("BNB");
}

export function useZooVoting(): Contract | null {
  return useContract("ZOOVOTING");
}

export function useAuction(useDefaultProvider?: boolean): Contract | null {
  return useContract(
    "Auction",
    undefined,
    true,
    useDefaultProvider ? true : false
  );
}

export function useTeleportContract(): (chain: any) => Contract | null {
  const { account, library } = useActiveWeb3React();
  const dispatch = useDispatch();
  return useCallback(
    (chain) => {
      const contract = altContract("TELEPORT", chain, account, library);

      return contract;
    },
    [dispatch]
  );
}

export function useLbtcContract(chain?: any): Contract | null {
  return useContract("LBTC", chain); // DYNAMICALLY FETCHES THE RIGHT CONTRACT BASED ON THE CURRENT CHAIN..USERS CAN ONLY BRIDGE FROM AN ACTIVE CHAIN
}

export const altContract = (nameOrAddress: any, chain: any, account: any, library: any) => {
  let chainIdStr = chain ? chain : "4";
  let address: string | undefined = nameOrAddress;
  let ABI;
  if (!isAddress(nameOrAddress) || nameOrAddress === AddressZero) {
    address = addresses[chainIdStr][nameOrAddress.toString()] || "";
    ABI =
      ABI || abis[chainIdStr]
        ? abis[chainIdStr][nameOrAddress.toString()]
        : null;
  }

  if (!address || !ABI || !library) return null;
  try {
    const contract = getContract(
      address.toString(),
      ABI,
      library,
      account ? account : undefined
    );
    return contract;
  } catch (error) {
    console.error("Failed to get contract", error);
    return null;
  }
};

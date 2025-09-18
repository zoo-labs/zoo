// NOTE: Try not to add anything to thie file, it's almost entirely refactored out.

import { ARCHER_ROUTER_ADDRESS, ChainId, ROUTER_ADDRESS } from '@zoolabs/zdk'
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers'

import { AddressZero } from '@ethersproject/constants'
import ArcherSwapRouterABI from '../constants/abis/archer-router.json'
import { Contract } from '@ethersproject/contracts'
import IUniswapV2Router02ABI from '../constants/abis/uniswap-v2-router-02.json'
import IUniswapV2Router02NoETHABI from '../constants/abis/uniswap-v2-router-02-no-eth.json'
import { isAddress } from '../functions/validate'
import { SUPPORTED_NETWORKS } from '../config/networks'

// account is not optional
export function getSigner(library: Web3Provider, account: string): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked()
}

// account is optional
export function getProviderOrSigner(library: Web3Provider, account?: string): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library
}

// account is optional
export function getContract(address: string, ABI: any, library: Web3Provider, account?: string): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }

  return new Contract(address, ABI, getProviderOrSigner(library, account) as any)
}

export function getRouterAddress(chainId?: ChainId) {
  if (!chainId) {
    throw Error(`Undefined 'chainId' parameter '${chainId}'.`)
  }
  return ROUTER_ADDRESS[chainId]
}

// account is optional
export function getRouterContract(chainId: number, library: Web3Provider, account?: string): Contract {
  return getContract(
    getRouterAddress(chainId),
    chainId !== ChainId.CELO ? IUniswapV2Router02ABI : IUniswapV2Router02NoETHABI,
    library,
    account
  )
}

export function getArcherRouterContract(chainId: number, library: Web3Provider, account?: string): Contract {
  return getContract(ARCHER_ROUTER_ADDRESS[chainId as ChainId] ?? '', ArcherSwapRouterABI, library, account)
}

export async function switchChain(chainId: any, library: any, account: any) {

  const params = SUPPORTED_NETWORKS[chainId];
  try {
    await library?.send("wallet_switchEthereumChain", [
      { chainId: `0x${chainId.toString(16)}` },
      account,
    ]);
  } catch (switchError) {
    // This error code indicates that the chain has not been added to MetaMask.
    // @ts-ignore TYPE NEEDS FIXING
    if (switchError.code === 4902) {
      try {
        await library?.send("wallet_addEthereumChain", [
          params,
          account,
        ]);
      } catch (addError) {
        // handle "add" error
        console.error(`Add chain error ${addError}`);
      }
    }
    console.error(`Switch chain error ${switchError}`);
    // handle other "switch" errors
  }
}

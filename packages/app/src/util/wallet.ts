// Set of helper functions to facilitate wallet setup

import getRandomNode from '../util/getRandomNode'
import useToast from 'hooks/useToast'

const rpcURLs = {
  mainnet: [getRandomNode(56)],
  testnet: [getRandomNode(97)],
}

/**
 * Prompt the user to add BSC as a network on Metamask, or switch to BSC if the wallet is on a different network
 * @returns {boolean} true if the setup succeeded, false otherwise
 */
export const setupNetwork = async (network) => {
  return true
  const main = network === 'bsc'
  const provider = (window as WindowChain).ethereum
  const chainId = main ? parseInt('56', 10) : parseInt('97', 10)
  try {
    await provider.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: `0x${chainId.toString(16)}`,
          chainName: main ? 'BSC Mainnet' : 'BSC Testnet',
          nativeCurrency: {
            name: 'BNB',
            symbol: 'BNB',
            decimals: 18,
          },
          rpcUrls: [main ? rpcURLs.mainnet : rpcURLs.testnet],
          blockExplorerUrls: [main ? 'https://bscscan.com/' : 'https://testnet.bscscan.com/'],
        },
      ],
    })
    return true
  } catch (error) {
    console.error(error)
    return false
  }
  /* } else {
    console.error("Can't setup the BSC network on metamask because window.ethereum is undefined")
    return false
  } */
}

/**
 * Prompt the user to add a custom token to metamask
 * @param tokenAddress
 * @param tokenSymbol
 * @param tokenDecimals
 * @param tokenImage
 * @returns {boolean} true if the token has been added, false otherwise
 */
export const registerToken = async (tokenAddress: string, tokenSymbol: string, tokenDecimals: number, tokenImage: string) => {
  const tokenAdded = await (window as WindowChain).ethereum.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC20',
      options: {
        address: tokenAddress,
        symbol: tokenSymbol,
        decimals: tokenDecimals,
        image: tokenImage,
      },
    },
  })

  return tokenAdded
}

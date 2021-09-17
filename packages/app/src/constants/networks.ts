import { ChainId } from '../constants/Chains'

const Arbitrum = '/static/images/networks/arbitrum-network.jpg'
const Avalanche = 'https://app.sushi.com/_next/image?url=%2Fimages%2Fnetworks%2Favalanche-network.jpg&w=64&q=75'
const Bsc = 'https://app.sushi.com/_next/image?url=%2Fimages%2Fnetworks%2Fbsc-network.jpg&w=64&q=75'
const Fantom = 'https://app.sushi.com/_next/image?url=%2Fimages%2Fnetworks%2Ffantom-network.jpg&w=64&q=75'
const Goerli = '/images/networks/goerli-network.jpg'
const Harmony = 'https://app.sushi.com/_next/image?url=%2Fimages%2Fnetworks%2Fharmonyone-network.jpg&w=64&q=75'
const Heco = 'https://app.sushi.com/_next/image?url=%2Fimages%2Fnetworks%2Fheco-network.jpg&w=64&q=75'
const Kovan = '/images/networks/kovan-network.jpg'
const Mainnet = '/static/images/networks/eth.jpg'
const Matic = 'https://app.sushi.com/_next/image?url=%2Fimages%2Fnetworks%2Fpolygon-network.jpg&w=64&q=75'
const Moonbeam = '/images/networks/moonbeam-network.jpg'
const OKEx = 'https://app.sushi.com/_next/image?url=%2Fimages%2Fnetworks%2Fokex-network.jpg&w=64&q=75'
const Polygon = 'https://app.sushi.com/_next/image?url=%2Fimages%2Fnetworks%2Fpolygon-network.jpg&w=64&q=75'
const Rinkeby = '/static/images/networks/eth.jpg'
const Ropsten = '/static/images/networks/eth.jpg'
const xDai = 'https://app.sushi.com/_next/image?url=%2Fimages%2Fnetworks%2Fxdai-network.jpg&w=64&q=75'
const Celo = 'https://app.sushi.com/_next/image?url=%2Fimages%2Fnetworks%2Fcelo-network.jpg&w=64&q=75'
const Palm = 'https://raw.githubusercontent.com/sushiswap/icons/master/network/palm.jpg'

export const SUPPORTED_NETWORKS: {
  [chainId in ChainId]?: {
    chainId: string
    chainName: string
    nativeCurrency: {
      name: string
      symbol: string
      decimals: number
    }
    rpcUrls: string[]
    blockExplorerUrls: string[]
  }
} = {
  [ChainId.MAINNET]: {
    chainId: '0x1',
    chainName: 'Ethereum',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://mainnet.infura.io/v3'],
    blockExplorerUrls: ['https://etherscan.com'],
  },
  [ChainId.BSC]: {
    chainId: '0x38',
    chainName: 'Binance Smart Chain',
    nativeCurrency: {
      name: 'Binance Coin',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: ['https://bsc-dataseed.binance.org'],
    blockExplorerUrls: ['https://bscscan.com'],
  },
  [ChainId.RINKEBY]: {
    chainId: '0x539',
    chainName: 'Rinkberry',
    nativeCurrency: {
      name: 'Rinkberry',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['http://localhost:8545/'],
    blockExplorerUrls: ['https://admin.moralis.io/servers'],
  },
  [ChainId.BSC_TESTNET]: {
    chainId: '0x61',
    chainName: 'BSCTESTNET',
    nativeCurrency: {
      name: 'BINANCE COIN',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
    blockExplorerUrls: ['https://testnet.bscscan.com/'],
  },
}

export const NETWORK_ICON = {
  [ChainId.MAINNET]: Mainnet,
  [ChainId.RINKEBY]: Rinkeby,
  [ChainId.BSC]: Bsc,
  [ChainId.BSC_TESTNET]: Bsc,
}

export const NETWORK_LABEL: { [chainId in ChainId]?: string } = {
  [ChainId.MAINNET]: 'Ethereum',
  [ChainId.RINKEBY]: 'Rinkeby',
  [ChainId.BSC]: 'BSC',
  [ChainId.BSC_TESTNET]: 'BSC Testnet',
}

export const NETWORK_SYMBOL: { [chainId in ChainId]?: string } = {
  [ChainId.MAINNET]: 'ETH',
  [ChainId.RINKEBY]: 'ETH',
  [ChainId.BSC]: 'BNB',
  [ChainId.BSC_TESTNET]: 'BNB',
}

export const NETWORK_URL: { [chainId in ChainId]?: string } = {
  [ChainId.MAINNET]: 'https://pancakeswap.finance/info/token/0x2170ed0880ac9a755fd29b2688956bd959f933f8',
  [ChainId.RINKEBY]: 'https://testnet.binance.org/faucet-smart/',
  [ChainId.BSC]: 'https://pancakeswap.finance/info/token/0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
  [ChainId.BSC_TESTNET]: 'https://testnet.binance.org/faucet-smart/',
}

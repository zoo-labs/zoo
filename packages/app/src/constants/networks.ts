import { ChainID } from '../constants/chains'

const Hardhat = 'https://pbs.twimg.com/profile_images/1317925773425168384/XQkaoFRg_400x400.jpg'
const Arbitrum = '/images/networks/arbitrum-network.jpg'
const Avalanche = 'https://app.sushi.com/_next/image?url=%2Fimages%2Fnetworks%2Favalanche-network.jpg&w=64&q=75'
const Bsc = 'https://app.sushi.com/_next/image?url=%2Fimages%2Fnetworks%2Fbsc-network.jpg&w=64&q=75'
const Fantom = 'https://app.sushi.com/_next/image?url=%2Fimages%2Fnetworks%2Ffantom-network.jpg&w=64&q=75'
const Goerli = '/images/networks/goerli-network.jpg'
const Harmony = 'https://app.sushi.com/_next/image?url=%2Fimages%2Fnetworks%2Fharmonyone-network.jpg&w=64&q=75'
const Heco = 'https://app.sushi.com/_next/image?url=%2Fimages%2Fnetworks%2Fheco-network.jpg&w=64&q=75'
const Kovan = '/images/networks/kovan-network.jpg'
const Mainnet = 'https://app.sushi.com/_next/image?url=%2Fimages%2Fnetworks%2Fmainnet-network.jpg&w=64&q=75'
const Matic = 'https://app.sushi.com/_next/image?url=%2Fimages%2Fnetworks%2Fpolygon-network.jpg&w=64&q=75'
const Moonbeam = '/images/networks/moonbeam-network.jpg'
const OKEx = 'https://app.sushi.com/_next/image?url=%2Fimages%2Fnetworks%2Fokex-network.jpg&w=64&q=75'
const Polygon = 'https://app.sushi.com/_next/image?url=%2Fimages%2Fnetworks%2Fpolygon-network.jpg&w=64&q=75'
const Rinkeby = '/images/networks/rinkeby-network.jpg'
const Ropsten = '/images/networks/ropsten-network.jpg'
const xDai = 'https://app.sushi.com/_next/image?url=%2Fimages%2Fnetworks%2Fxdai-network.jpg&w=64&q=75'
const Celo = 'https://app.sushi.com/_next/image?url=%2Fimages%2Fnetworks%2Fcelo-network.jpg&w=64&q=75'
const Palm = 'https://raw.githubusercontent.com/sushiswap/icons/master/network/palm.jpg'

export const NETWORK_ICON = {
  [ChainID.HARDHAT]:  Hardhat,
  [ChainID.HARDHAT2]: Hardhat,
  [ChainID.MAINNET]: Mainnet,
  [ChainID.ROPSTEN]: Ropsten,
  [ChainID.RINKEBY]: Rinkeby,
  [ChainID.GÖRLI]: Goerli,
  [ChainID.KOVAN]: Kovan,
  [ChainID.FANTOM]: Fantom,
  [ChainID.FANTOM_TESTNET]: Fantom,
  [ChainID.BSC]: Bsc,
  [ChainID.BSC_TESTNET]: Bsc,
  [ChainID.MATIC]: Polygon,
  [ChainID.MATIC_TESTNET]: Matic,
  [ChainID.XDAI]: xDai,
  [ChainID.ARBITRUM]: Arbitrum,
  [ChainID.ARBITRUM_TESTNET]: Arbitrum,
  [ChainID.MOONBEAM_TESTNET]: Moonbeam,
  [ChainID.AVALANCHE]: Avalanche,
  [ChainID.AVALANCHE_TESTNET]: Avalanche,
  [ChainID.HECO]: Heco,
  [ChainID.HECO_TESTNET]: Heco,
  [ChainID.HARMONY]: Harmony,
  [ChainID.HARMONY_TESTNET]: Harmony,
  [ChainID.OKEX]: OKEx,
  [ChainID.OKEX_TESTNET]: OKEx,
  [ChainID.CELO]: Celo,
  [ChainID.PALM]: Palm,
}

export const NETWORK_LABEL: { [chainID in ChainID]?: string } = {
  [ChainID.HARDHAT]: 'Hardhat',
  [ChainID.HARDHAT2]: 'Hardhat 2',
  [ChainID.MAINNET]: 'Ethereum',
  [ChainID.RINKEBY]: 'Rinkeby',
  [ChainID.ROPSTEN]: 'Ropsten',
  [ChainID.GÖRLI]: 'Görli',
  [ChainID.KOVAN]: 'Kovan',
  [ChainID.FANTOM]: 'Fantom',
  [ChainID.FANTOM_TESTNET]: 'Fantom Testnet',
  [ChainID.MATIC]: 'Polygon',
  [ChainID.MATIC_TESTNET]: 'Matic Testnet',
  [ChainID.XDAI]: 'xDai',
  [ChainID.ARBITRUM]: 'Arbitrum',
  [ChainID.ARBITRUM_TESTNET]: 'Arbitrum Testnet',
  [ChainID.BSC]: 'BSC',
  [ChainID.BSC_TESTNET]: 'BSC Testnet',
  [ChainID.MOONBEAM_TESTNET]: 'Moonbase',
  [ChainID.AVALANCHE]: 'Avalanche',
  [ChainID.AVALANCHE_TESTNET]: 'Fuji',
  [ChainID.HECO]: 'HECO',
  [ChainID.HECO_TESTNET]: 'HECO Testnet',
  [ChainID.HARMONY]: 'Harmony',
  [ChainID.HARMONY_TESTNET]: 'Harmony Testnet',
  [ChainID.OKEX]: 'OKEx',
  [ChainID.OKEX_TESTNET]: 'OKEx',
  [ChainID.CELO]: 'Celo',
  [ChainID.PALM]: 'Palm',
}

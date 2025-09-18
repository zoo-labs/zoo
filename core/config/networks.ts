import { ChainId } from "@zoolabs/zdk";
import { isEnvironment } from "../functions/environment";

const Arbitrum =
  "https://raw.githubusercontent.com/sushiswap/icons/master/network/arbitrum.jpg";
const Avalanche = "/images/networks/avalanche-network.jpg";
const Bsc = "/images/networks/bsc-network.jpg";
const Fantom = "/images/networks/fantom-network.jpg";
const Goerli = "/images/networks/goerli-network.jpg";
const Harmony = "/images/networks/harmonyone-network.jpg";
const Heco = "/images/networks/heco-network.jpg";
const Kovan = "/images/networks/kovan-network.jpg";
const Mainnet = "/images/networks/mainnet-network.jpg";
const Matic = "/images/networks/matic-network.jpg";
const Moonbeam = "/images/networks/moonbeam-network.jpg";
const OKEx = "/images/networks/okex-network.jpg";
const Polygon = "/images/networks/polygon-network.jpg";
const Rinkeby = "/images/networks/rinkeby-network.jpg";
const Ropsten = "/images/networks/ropsten-network.jpg";
const xDai = "/images/networks/xdai-network.jpg";
const Celo = "/images/networks/celo-network.jpg";
const Palm =
  "https://raw.githubusercontent.com/sushiswap/icons/master/network/palm.jpg";
const Moonriver =
  "https://raw.githubusercontent.com/sushiswap/icons/master/network/moonriver.jpg";
const Hardhat =
  "https://raw.githubusercontent.com/nomiclabs/hardhat/master/docs/.vuepress/public/favicon-32x32.png";

export const NETWORK_ICON = {
  [ChainId.MAINNET]: Mainnet,
  [ChainId.ROPSTEN]: Ropsten,
  [ChainId.RINKEBY]: Rinkeby,
  [ChainId.GÖRLI]: Goerli,
  [ChainId.KOVAN]: Kovan,
  [ChainId.FANTOM]: Fantom,
  [ChainId.FANTOM_TESTNET]: Fantom,
  [ChainId.BSC]: Bsc,
  [ChainId.BSC_TESTNET]: Bsc,
  [ChainId.MATIC]: Polygon,
  [ChainId.MATIC_TESTNET]: Matic,
  [ChainId.XDAI]: xDai,
  [ChainId.ARBITRUM]: Arbitrum,
  [ChainId.ARBITRUM_TESTNET]: Arbitrum,
  [ChainId.MOONBEAM_TESTNET]: Moonbeam,
  [ChainId.AVALANCHE]: Avalanche,
  [ChainId.AVALANCHE_TESTNET]: Avalanche,
  [ChainId.HECO]: Heco,
  [ChainId.HECO_TESTNET]: Heco,
  [ChainId.HARMONY]: Harmony,
  [ChainId.HARMONY_TESTNET]: Harmony,
  [ChainId.OKEX]: OKEx,
  [ChainId.OKEX_TESTNET]: OKEx,
  [ChainId.CELO]: Celo,
  [ChainId.PALM]: Palm,
  [ChainId.MOONRIVER]: Moonriver,
  [ChainId.HARDHAT]: Hardhat,
  [ChainId.HARDHAT2]: Hardhat,
};

export const NETWORK_LABEL: { [chainId: number]: string } = {
  [ChainId.MAINNET]: "Ethereum",
  [ChainId.RINKEBY]: "Rinkeby",
  [ChainId.ROPSTEN]: "Ropsten",
  [ChainId.GÖRLI]: "Görli",
  [ChainId.KOVAN]: "Kovan",
  [ChainId.FANTOM]: "Fantom",
  [ChainId.FANTOM_TESTNET]: "Fantom Testnet",
  [ChainId.MATIC]: "Polygon (Matic)",
  [ChainId.MATIC_TESTNET]: "Matic Testnet",
  [ChainId.XDAI]: "xDai",
  [ChainId.ARBITRUM]: "Arbitrum",
  [ChainId.ARBITRUM_TESTNET]: "Arbitrum Testnet",
  [ChainId.BSC]: "BSC",
  [ChainId.BSC_TESTNET]: "BSC Testnet",
  [ChainId.MOONBEAM_TESTNET]: "Moonbase",
  [ChainId.AVALANCHE]: "Avalanche",
  [ChainId.AVALANCHE_TESTNET]: "Fuji",
  [ChainId.HECO]: "HECO",
  [ChainId.HECO_TESTNET]: "HECO Testnet",
  [ChainId.HARMONY]: "Harmony",
  [ChainId.HARMONY_TESTNET]: "Harmony Testnet",
  [ChainId.OKEX]: "OKEx",
  [ChainId.OKEX_TESTNET]: "OKEx",
  [ChainId.CELO]: "Celo",
  [ChainId.PALM]: "Palm",
  [ChainId.MOONRIVER]: "Moonriver",
  [ChainId.HARDHAT]: "Hardhat",
  [ChainId.HARDHAT2]: "Hardhat (1338)",
};

export const DEFAULT_METAMASK_CHAIN_ID = [
  ChainId.MAINNET,
  ChainId.GÖRLI,
  ChainId.HARDHAT,
];

export const AVAILABLE_NETWORKS: number[] = [
  ChainId.MAINNET,
  // ChainId.MATIC,
  // ChainId.FANTOM,
  // ChainId.ARBITRUM,
  // ChainId.OKEX,
  // ChainId.HECO,
  ChainId.BSC,
  // ChainId.XDAI,
  // ChainId.HARMONY,
  // ChainId.AVALANCHE,
  // ChainId.CELO,
  // ChainId.PALM,
  // ChainId.MOONRIVER,
];

if (!isEnvironment("prod")) {
  AVAILABLE_NETWORKS.push(ChainId.GÖRLI);
  AVAILABLE_NETWORKS.push(ChainId.BSC_TESTNET);
}

export const SUPPORTED_NETWORKS: {
  [chainId: number]: {
    chainId: string;
    chainName: string;
    nativeCurrency: {
      name: string;
      symbol: string;
      decimals: number;
    };
    rpcUrls: string[];
    blockExplorerUrls: string[];
  };
} = {
  [ChainId.MAINNET]: {
    chainId: "0x1",
    chainName: "Ethereum",
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://mainnet.infura.io/v3"],
    blockExplorerUrls: ["https://etherscan.com"],
  },
  [ChainId.RINKEBY]: {
    chainId: "0x4",
    chainName: "Rinkeby",
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://rinkeby.infura.io/v3"],
    blockExplorerUrls: ["https://rinkeby.etherscan.com"],
  },
  [ChainId.GÖRLI]: {
    chainId: "0x5",
    chainName: "Goerli",
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://goerli.infura.io/v3"],
    blockExplorerUrls: ["https://goerli.etherscan.io"],
  },
  [ChainId.ROPSTEN]: {
    chainId: "0x3",
    chainName: "Ropsten",
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://ropsten.infura.io/v3"],
    blockExplorerUrls: ["https://ropsten.etherscan.com"],
  },
  [ChainId.FANTOM]: {
    chainId: "0xfa",
    chainName: "Fantom",
    nativeCurrency: {
      name: "Fantom",
      symbol: "FTM",
      decimals: 18,
    },
    rpcUrls: ["https://rpcapi.fantom.network"],
    blockExplorerUrls: ["https://ftmscan.com"],
  },
  [ChainId.BSC]: {
    chainId: "0x38",
    chainName: "Binance Smart Chain",
    nativeCurrency: {
      name: "Binance Coin",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: ["https://bsc-dataseed.binance.org"],
    blockExplorerUrls: ["https://bscscan.com"],
  },
  [ChainId.BSC_TESTNET]: {
    chainId: "0x61",
    chainName: "BSC Testnet",
    nativeCurrency: {
      name: "Binance Coin",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: [
      "https://data-seed-prebsc-1-s1.binance.org:8545",
      "https://speedy-nodes-nyc.moralis.io/1afec1fde198890860916a06/bsc/testnet",
    ],
    blockExplorerUrls: ["https://explorer.binance.org/smart-testnet", "https://testnet.bscscan.com/"],
  },
  [ChainId.MATIC]: {
    chainId: "0x89",
    chainName: "Matic",
    nativeCurrency: {
      name: "Matic",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://rpc-mainnet.maticvigil.com"], // ['https://matic-mainnet.chainstacklabs.com/'],
    blockExplorerUrls: ["https://explorer-mainnet.maticvigil.com"],
  },
  [ChainId.HECO]: {
    chainId: "0x80",
    chainName: "Heco",
    nativeCurrency: {
      name: "Heco Token",
      symbol: "HT",
      decimals: 18,
    },
    rpcUrls: ["https://http-mainnet.hecochain.com"],
    blockExplorerUrls: ["https://hecoinfo.com"],
  },
  [ChainId.XDAI]: {
    chainId: "0x64",
    chainName: "xDai",
    nativeCurrency: {
      name: "xDai Token",
      symbol: "xDai",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.xdaichain.com"],
    blockExplorerUrls: ["https://blockscout.com/poa/xdai"],
  },
  [ChainId.HARMONY]: {
    chainId: "0x63564C40",
    chainName: "Harmony",
    nativeCurrency: {
      name: "One Token",
      symbol: "ONE",
      decimals: 18,
    },
    rpcUrls: [
      "https://api.harmony.one",
      "https://s1.api.harmony.one",
      "https://s2.api.harmony.one",
      "https://s3.api.harmony.one",
    ],
    blockExplorerUrls: ["https://explorer.harmony.one/"],
  },
  [ChainId.AVALANCHE]: {
    chainId: "0xA86A",
    chainName: "Avalanche",
    nativeCurrency: {
      name: "Avalanche Token",
      symbol: "AVAX",
      decimals: 18,
    },
    rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
    blockExplorerUrls: ["https://cchain.explorer.avax.network"],
  },
  [ChainId.OKEX]: {
    chainId: "0x42",
    chainName: "OKEx",
    nativeCurrency: {
      name: "OKEx Token",
      symbol: "OKT",
      decimals: 18,
    },
    rpcUrls: ["https://exchainrpc.okex.org"],
    blockExplorerUrls: ["https://www.oklink.com/okexchain"],
  },
  [ChainId.ARBITRUM]: {
    chainId: "0xA4B1",
    chainName: "Arbitrum",
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://arb1.arbitrum.io/rpc"],
    blockExplorerUrls: ["https://mainnet-arb-explorer.netlify.app"],
  },
  [ChainId.CELO]: {
    chainId: "0xA4EC",
    chainName: "Celo",
    nativeCurrency: {
      name: "Celo",
      symbol: "CELO",
      decimals: 18,
    },
    rpcUrls: ["https://forno.celo.org"],
    blockExplorerUrls: ["https://explorer.celo.org"],
  },
  [ChainId.PALM]: {
    chainId: "0x2A15C308D",
    chainName: "Palm",
    nativeCurrency: {
      name: "Palm",
      symbol: "PALM",
      decimals: 18,
    },
    rpcUrls: [
      "https://palm-mainnet.infura.io/v3/da5fbfafcca14b109e2665290681e267",
    ],
    blockExplorerUrls: ["https://explorer.palm.io"],
  },
  [ChainId.MOONRIVER]: {
    chainId: "0x505",
    chainName: "Moonriver",
    nativeCurrency: {
      name: "Moonriver",
      symbol: "MOVR",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.moonriver.moonbeam.network"],
    blockExplorerUrls: ["https://blockscout.moonriver.moonbeam.network"],
  },
  [ChainId.HARDHAT]: {
    chainId: "0x539",
    chainName: "Hardhat",
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["http://127.0.0.1:8545"],
    blockExplorerUrls: ["https://rinkeby.etherscan.com"],
  },
  [ChainId.HARDHAT2]: {
    chainId: "0x53a",
    chainName: "Hardhat (1338)",
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["http://127.0.0.1:8546"],
    blockExplorerUrls: ["https://rinkeby.etherscan.com"],
  },
};

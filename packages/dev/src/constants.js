// MY INFURA_ID, SWAP IN YOURS FROM https://infura.io/dashboard/ethereum
export const INFURA_ID = '460f40a260564ac4a4f4b3fffb032dad'

// MY ETHERSCAN_ID, SWAP IN YOURS FROM https://etherscan.io/myapikey
export const ETHERSCAN_KEY = 'PSW8C433Q667DVEX5BCRMGNAH9FSGFZ7Q8'

// BLOCKNATIVE ID FOR Notify.js:
export const BLOCKNATIVE_DAPPID = '0b58206a-f3c0-4701-a62f-73c7243e8c77'

export const NETWORKS = {
  localhost: {
    name: 'hardhat',
    color: '#666666',
    chainId: 31337,
    blockExplorer: '',
    rpcUrl: 'http://' + window.location.hostname + ':8545',
  },
  mainnet: {
    name: 'mainnet',
    color: '#ff8b9e',
    chainId: 56,
    rpcUrl: `https://bsc-dataseed1.defibit.io`,
    blockExplorer: 'https://bscscan.com/',
  },
  testnet: {
    name: 'testnet',
    color: '#ff8b9e',
    chainId: 97,
    rpcUrl: `https://data-seed-prebsc-1-s1.binance.org:8545/`,
    blockExplorer: 'https://testnet.bscscan.com',
  },
  kovan: {
    name: 'kovan',
    color: '#7003DD',
    chainId: 42,
    rpcUrl: `https://kovan.infura.io/v3/${INFURA_ID}`,
    blockExplorer: 'https://kovan.etherscan.io/',
    faucet: 'https://gitter.im/kovan-testnet/faucet', // https://faucet.kovan.network/
  },
  xdai: {
    name: 'xdai',
    color: '#48a9a6',
    chainId: 100,
    price: 1,
    gasPrice: 1000000000,
    rpcUrl: 'https://dai.poa.network',
    faucet: 'https://xdai-faucet.top/',
    blockExplorer: 'https://blockscout.com/poa/xdai/',
  },
  matic: {
    name: 'matic',
    color: '#2bbdf7',
    chainId: 137,
    price: 1,
    gasPrice: 1000000000,
    rpcUrl: 'https://rpc-mainnet.maticvigil.com',
    faucet: 'https://faucet.matic.network/',
    blockExplorer: 'https://explorer-mainnet.maticvigil.com//',
  },
  mumbai: {
    name: 'mumbai',
    color: '#92D9FA',
    chainId: 80001,
    price: 1,
    gasPrice: 1000000000,
    rpcUrl: 'https://rpc-mumbai.maticvigil.com',
    faucet: 'https://faucet.matic.network/',
    blockExplorer: 'https://mumbai-explorer.matic.today/',
  },
}

export const NETWORK = (chainId) => {
  for (const n in NETWORKS) {
    if (NETWORKS[n].chainId === chainId) {
      return NETWORKS[n]
    }
  }
}

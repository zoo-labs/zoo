import { HardhatUserConfig } from 'hardhat/config'

import fs from 'fs'

function mnemonic() {
  try {
    return fs.readFileSync(`./mnemonic.txt`).toString().trim()
  } catch (e) {
    console.log('☢️  warning: No mnemonic file created for a deploy account. Try `yarn run generate` and then `yarn run account`.')
  }
  return ''
}

//
// Select the network you want to deploy to here:
//
const networks: HardhatUserConfig['networks'] = {
  hardhat: {
    chainId: 1337,
    allowUnlimitedContractSize: true,
    mining: {
      auto: true,
      interval: 5000,
    },
    accounts: {
      mnemonic: mnemonic(),
      count: 20,
      accountsBalance: '10000000000000000000000',
    },
  },
  luxlocal: {
    url: 'http://127.0.0.1:9630/ext/bc/C/rpc',
    chainId: 43112,
    allowUnlimitedContractSize: true,
    accounts: [
      // Pre-funded account from genesis: 0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC
      '56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027',
    ],
    gas: 8000000,
    gasPrice: 25000000000,
  },
  hardhat2: {
    url: 'http://127.0.0.1:3000',
    chainId: 1338,
    allowUnlimitedContractSize: true,
    mining: {
      auto: true,
      interval: 5000,
    },
    accounts: {
      mnemonic: mnemonic(),
      count: 20,
      accountsBalance: '10000000000000000000000',
    },
  },
  coverage: {
    url: 'http://127.0.0.1:8555',
    blockGasLimit: 200000000,
    allowUnlimitedContractSize: true,
  },
  mainnet: {
    url: `https://eth-mainnet.g.alchemy.com/v2/${process.env.ETH_ALCHEMY_ID}`,
    chainId: 1,
    accounts: {
      mnemonic: mnemonic(),
    },
  },
  testnet: {
    url: `https://eth-goerli.g.alchemy.com/v2/${process.env.GOERLI_ALCHEMY_ID}`,
    chainId: 5,
    gasPrice: 10e9,
    gas: 10e6,
    accounts: {
      mnemonic: mnemonic(),
    },
  },
  'zoo-mainnet': {
    url: 'http://127.0.0.1:9630/ext/bc/zy5VXh7KNFKWPFpvm3qfYsHauircZh9RNxALUv6cFueG2KKqE/rpc',
    chainId: 200200,
    allowUnlimitedContractSize: true,
    accounts: {
      mnemonic: process.env.LUX_MNEMONIC || mnemonic(),
    },
    gas: 8000000,
    gasPrice: 25000000000,
  },
  'lux-mainnet': {
    url: 'http://127.0.0.1:9630/ext/bc/C/rpc',
    chainId: 96369,
    allowUnlimitedContractSize: true,
    accounts: {
      mnemonic: process.env.LUX_MNEMONIC || mnemonic(),
    },
    gas: 8000000,
    gasPrice: 25000000000,
  },
}

export default networks

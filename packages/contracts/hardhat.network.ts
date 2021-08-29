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
  coverage: {
    url: 'http://127.0.0.1:8555',
    blockGasLimit: 200000000,
    allowUnlimitedContractSize: true,
  },
  bsc: {
    url: 'https://speedy-nodes-nyc.moralis.io/2d2690514d99c11ad72d31fd/bsc/mainnet',
    chainId: 56,
    accounts: {
      mnemonic: mnemonic(),
    },
  },
  testnet: {
    url: 'https://speedy-nodes-nyc.moralis.io/2d2690514d99c11ad72d31fd/bsc/testnet',
    chainId: 97,
    accounts: {
      mnemonic: mnemonic(),
    },
    // gasPrice: 12e9,
    // gas: 20e6,
  },
  eth: {
    url: 'https://speedy-nodes-nyc.moralis.io/2d2690514d99c11ad72d31fd/eth/mainnet',
    chainId: 1,
    accounts: {
      mnemonic: mnemonic(),
    },
  },
  ropsten: {
    url: 'https://speedy-nodes-nyc.moralis.io/2d2690514d99c11ad72d31fd/eth/ropsten',
    chainId: 3,
    accounts: {
      mnemonic: mnemonic(),
    },
  },
}

export default networks

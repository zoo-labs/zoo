import { HardhatUserConfig } from 'hardhat/config'

import fs from 'fs'

const alchemyKey = 'EuD-FVgI2gMBGf0aypDghsPHYWHB9nhn'

function mnemonic(filename = 'mnemonic') {
  try {
    return fs.readFileSync(`./${filename}.txt`).toString().trim()
  } catch (e) {
    console.log(
      '☢️  warning: No mnemonic file created for a deploy account. Try `yarn run generate` and then `yarn run account`.'
    )
  }
  return ''
}

//
// Select the network you want to deploy to here:
//
const networks: HardhatUserConfig['networks'] = {
  localhost: {
    chainId: 1337,
    url: 'http://127.0.0.1:8545',
    allowUnlimitedContractSize: true,
    accounts: {
      mnemonic: mnemonic(),
      accountsBalance: '10000000000000000000000',
      count: 20
    }
  },
  hardhat: {
    allowUnlimitedContractSize: true,
    accounts: {
      mnemonic: mnemonic(),
      accountsBalance: '10000000000000000000000',
      count: 20
    }
  },
  coverage: {
    url: 'http://127.0.0.1:8555',
    blockGasLimit: 200000000,
    allowUnlimitedContractSize: true,
  },
  mainnet: {
    url: 'https://bsc-dataseed.binance.org/',
    chainId: 56,
    // gasPrice: 1000000000,
    accounts: {
      mnemonic: mnemonic('mnemonic.mainnet'),
    },
  },
  testnet: {
    url: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    chainId: 97,
    gasPrice: 20e9,
    gas: 25e6,
    accounts: {
      mnemonic: mnemonic('mnemonic.testnet'),
    },
  },
}

// if (process.env.FORK_ENABLED == "true") {
//   networks.hardhat = {
//     chainId: 1,
//     forking: {
//       url: `https://eth-mainnet.alchemyapi.io/v2/${alchemyKey}`,
//       // blockNumber: 12226812
//     },
//     accounts: {
//       mnemonic,
//     },
//   }
// }  else {
// }

export default networks

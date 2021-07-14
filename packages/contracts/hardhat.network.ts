import { HardhatUserConfig } from 'hardhat/config'

import fs from 'fs'

const alchemyKey = 'EuD-FVgI2gMBGf0aypDghsPHYWHB9nhn'

function mnemonic() {
  try {
    return fs.readFileSync('./mnemonic.txt').toString().trim()
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
    }
  },
  hardhat: {
    allowUnlimitedContractSize: true,
    // chainId: 31337,
    accounts: {
      mnemonic: mnemonic(),
      count: 1
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
      mnemonic: mnemonic(),
    },
  },
  testnet: {
    url: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    chainId: 97,
    // gasPrice: 1000000000,
    accounts: {
      mnemonic: mnemonic(),
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

import contractsJSON from 'contracts.json'

const hardhat = contractsJSON['1337']['hardhat']['contracts']

// BSC
const testnet = hardhat // contracts['97']['testnet']['contracts']
const mainnet = testnet // contracts['56']['mainnet']['contracts']

export const contracts = hardhat

export const addresses = {
  token: {
    1337: hardhat['ZooV2']['address'], // local
    97: testnet['ZooV2']['address'],   // testnet
    56: mainnet['ZooV2']['address'],   // mainnet
  },
  bridge: {
    1337: hardhat['Bridge']['address'], // local
    97: testnet['Bridge']['address'],   // testnet
    56: mainnet['Bridge']['address'],   // mainnet
  },
  dao: {
    1337: hardhat['Dao']['address'], // local
    97: testnet['Dao']['address'],   // testnet
    56: mainnet['Dao']['address'],   // mainnet
  },
  market: {
    1337: hardhat['Market']['address'],
    97: testnet['Market']['address'],
    56: mainnet['Market']['address'],
  },
  media: {
    1337: hardhat['Media']['address'],
    97: testnet['Media']['address'],
    56: mainnet['Media']['address'],
  },
  auction: {
    1337: hardhat['Auction']['address'],
    97: testnet['Auction']['address'],
    56: mainnet['Auction']['address'],
  },
  drop: {
    1337: hardhat['Drop']['address'],
    97: testnet['Drop']['address'],
    56: mainnet['Drop']['address'],
  },
  faucet: {
    1337: hardhat['Faucet']['address'],
    97: testnet['Faucet']['address'],
    56: mainnet['Faucet']['address'],
  },
  zooKeeper: {
    1337: hardhat['ZooKeeper']['address'],
    97: testnet['ZooKeeper']['address'],
    56: mainnet['ZooKeeper']['address'],
  },
}

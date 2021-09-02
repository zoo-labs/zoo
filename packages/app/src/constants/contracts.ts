import contractsJSON from '../contracts.json'

const hardhat = contractsJSON['1337']['hardhat']['contracts']
const testnet = contractsJSON['97']['testnet']['contracts']
const mainnet = contractsJSON['56']['mainnet']['contracts']

export const contracts = hardhat

export const addresses = {
  ZOO: {
    1337: hardhat['ZOO']['address'], // local
    97: testnet['ZOO']['address'], // testnet
    56: '0x19263F2b4693da0991c4Df046E4bAA5386F5735E', //
  },
  Market: {
    1337: hardhat['Market']['address'],
    97: testnet['Market']['address'],
    56: mainnet['Market']['address'],
  },
  Media: {
    1337: hardhat['Media']['address'],
    97: testnet['Media']['address'],
    56: mainnet['Media']['address'],
  },
  Auction: {
    1337: hardhat['Auction']['address'],
    97: testnet['Auction']['address'],
    56: mainnet['Auction']['address'],
  },
  Drop: {
    1337: hardhat['Drop']['address'],
    97: testnet['Drop']['address'],
    56: mainnet['Drop']['address'],
  },
  Faucet: {
    1337: hardhat['Faucet']['address'],
    97: testnet['Faucet']['address'],
    56: mainnet['Faucet']['address'],
  },
  ZooKeeper: {
    1337: hardhat['ZooKeeper']['address'],
    97: testnet['ZooKeeper']['address'],
    56: mainnet['ZooKeeper']['address'],
  },
}

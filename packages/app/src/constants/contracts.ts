import contractsJSON from '../contracts.json'

const hardhat = contractsJSON['1337']['hardhat']['contracts']
const testnet = contractsJSON['97']['testnet']['contracts']
const mainnet = testnet // does not work yet

export const contracts = hardhat

export const addresses = {
  ZOO: {
    1337: hardhat['ZooToken']['address'], // local
    97: testnet['ZooToken']['address'], // testnet
    56: '0xB09FE1613fE03E7361319d2a43eDc17422f36B09', // mainnet
  },
  Market: {
    1337: hardhat['ZooMarket']['address'],
    97: testnet['ZooMarket']['address'],
    56: mainnet['ZooMarket']['address'],
  },
  Media: {
    1337: hardhat['ZooMedia']['address'],
    97: testnet['ZooMedia']['address'],
    56: mainnet['ZooMedia']['address'],
  },
  Auction: {
    1337: hardhat['ZooAuction']['address'],
    97: testnet['ZooAuction']['address'],
    56: mainnet['ZooAuction']['address'],
  },
  Drop: {
    1337: hardhat['ZooDrop']['address'],
    97: testnet['ZooDrop']['address'],
    56: mainnet['ZooDrop']['address'],
  },
  Faucet: {
    1337: hardhat['ZooFaucet']['address'],
    97: testnet['ZooFaucet']['address'],
    56: mainnet['ZooFaucet']['address'],
  },
  ZooKeeper: {
    1337: hardhat['ZooKeeper']['address'],
    97: testnet['ZooKeeper']['address'],
    56: mainnet['ZooKeeper']['address'],
  },
}

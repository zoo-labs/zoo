import contracts from "contracts.json";

const hardhat = contracts[31337]['localhost']['contracts'];
const testnet = contracts[97]['testnet']['contracts'];
// const mainnet = contracts[56]['mainnet']['contracts'];

export default {
   zooToken: {
      31337: hardhat['ZooToken']['address'],  // local
      97: testnet['ZooToken']['address'],     // testnet
      // 56: mainnet['ZooToken']['address'],     // mainnet
   },
   zooMarket: {
      31337: hardhat['ZooMarket']['address'],
      97: testnet['ZooMarket']['address'],
      // 56: mainnet['ZooMarket']['address'],
   },
   zooMedia: {
      31337: hardhat['ZooMedia']['address'],
      97: testnet['ZooMedia']['address'],
      // 56: mainnet['ZooMedia']['address'],
   },
   zooAuction: {
      31337: hardhat['ZooAuction']['address'],
      97: testnet['ZooAuction']['address'],
      // 56: mainnet['ZooAuction']['address'],
   },
   zooDrop: {
      31337: hardhat['ZooDrop']['address'],
      97: testnet['ZooDrop']['address'],
      // 56: mainnet['ZooDrop']['address'],
   },
   zooFaucet: {
      31337: hardhat['ZooFaucet']['address'],
      97: testnet['ZooFaucet']['address'],
      // 56: mainnet['ZooFaucet']['address'],
   },
   zooKeeper : {
      31337: hardhat['ZooKeeper']['address'],
      97: testnet['ZooKeeper']['address'],
      // 56: mainnet['ZooKeeper']['address'],
   }
};

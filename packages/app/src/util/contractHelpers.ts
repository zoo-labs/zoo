import Web3 from "web3";
import { AbiItem } from "web3-utils";
import Keeper from './abi/Keeper.json'

// Addresses
import {
   getZooAddress,
   getZooAuctionAddress,
   getZooDropAddress,
   getZooFaucetAddress,
   getZooMarketAddress,
   getZooMediaAddress,
   getZooKeeperAddress
} from "util/addressHelpers";

// Import ABIs from contracts.json. All ABIs should be identical.
import ZooContracts from "contracts.json";
const contracts = ZooContracts['31337']['hardhat']['contracts'];

const zooTokenAbi   = contracts["ZooToken"].abi;
const zooAuctionAbi = contracts["ZooAuction"].abi;
const zooDropAbi    = contracts["ZooDrop"].abi;
const zooFaucetAbi  = contracts["ZooFaucet"].abi;
const zooMarketAbi  = contracts["ZooMarket"].abi;
const zooMediaAbi   = contracts["ZooMedia"].abi;
const zooKeeperAbi  = contracts["ZooKeeper"].abi;
// const zooKeeperAbi  = Keeper;

const getContract = (abi: any, address: string, web3?: Web3) => {
   return new web3.eth.Contract(abi as unknown as AbiItem, address);
};

export const getZooToken = (web3?: Web3, chainID?: number) => {
   return getContract(zooTokenAbi, getZooAddress(chainID), web3);
};

export const getZooAuction = (web3?: Web3, chainID?: number) => {
   return getContract(zooAuctionAbi, getZooAuctionAddress(chainID), web3);
};

export const getZooDrop = (web3?: Web3, chainID?: number) => {
   return getContract(zooDropAbi, getZooDropAddress(chainID), web3);
};

export const getZooFaucet = (web3?: Web3, chainID?: number) => {
   return getContract(zooFaucetAbi, getZooFaucetAddress(chainID), web3);
};

export const getZooMarket = (web3?: Web3, chainID?: number) => {
   return getContract(zooMarketAbi, getZooMarketAddress(chainID), web3);
};

export const getZooMedia = (web3?: Web3, chainID?: number) => {
   return getContract(zooMediaAbi, getZooMediaAddress(chainID), web3);
};

export const getZooKeeper = (web3?: Web3, chainID?: number) => {
   return getContract(zooKeeperAbi, getZooKeeperAddress(chainID), web3);
};

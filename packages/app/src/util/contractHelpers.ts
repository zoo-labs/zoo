import Web3 from 'web3'
import { AbiItem } from 'web3-utils'

// Addresses
import {
  getZooAddress,
  getZooAuctionAddress,
  getZooDropAddress,
  getZooFaucetAddress,
  getZooMarketAddress,
  getZooMediaAddress,
} from 'util/addressHelpers'

// ABIs
import zooTokenAbi from 'config/abi/zooToken.json'
import zooAuctionAbi from 'config/abi/zooAuction.json'
import zooDropAbi from 'config/abi/zooToken.json'
import zooFaucetAbi from 'config/abi/zooToken.json'
import zooMarketAbi from 'config/abi/zooToken.json'
import zooMediaAbi from 'config/abi/zooToken.json'



const getContract = (abi: any, address: string, web3?: Web3) => {
  return new web3.eth.Contract((abi as unknown) as AbiItem, address)
}

export const getZooToken = (web3?: Web3, chainID?:number) => {
  return getContract(zooTokenAbi, getZooAddress(chainID), web3)
}

export const getZooAuction = (web3?: Web3, chainID?:number) => {
  return getContract(zooAuctionAbi, getZooAuctionAddress(chainID), web3)
}

export const getZooDrop = (web3?: Web3, chainID?:number) => {
  return getContract(zooDropAbi, getZooDropAddress(chainID), web3)
}

export const getZooFaucet = (web3?: Web3, chainID?:number) => {
  return getContract(zooFaucetAbi, getZooFaucetAddress(chainID), web3)
}

export const getZooMarket = (web3?: Web3, chainID?:number) => {
  return getContract(zooMarketAbi, getZooMarketAddress(chainID), web3)
}

export const getZooMedia = (web3?: Web3, chainID?:number) => {
  return getContract(zooMediaAbi, getZooMediaAddress(chainID), web3)
}

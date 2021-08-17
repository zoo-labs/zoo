import { addresses, contracts }  from 'constants/contracts'
import { AbiItem } from 'web3-utils'
import { Address } from 'constants/types'
import { CustomWeb3 as Web3 } from 'hooks/useWeb3'

// Get Address for any contract
export const getAddress = (contract: string, chainID: number): string => {
  return addresses[contract][chainID]
}

// Get ABI for any contract
export const getABI = (name: string) => {
  return contracts[name].abi
}

// Get instance of Contract
export const getContract = (name: string, web3?: Web3) => {
  return new web3.eth.Contract(getABI(name), getAddress(name, web3.chainID))
}

// Helpers
export const getZooToken = (web3?: Web3) => {
  return getContract('ZooToken', web3)
}

export const getZooKeeper = (web3?: Web3) => {
  return getContract('ZooKeeper', web3)
}

export const getZooDrop = (web3?: Web3) => {
  return getContract('ZooDrop', web3)
}

export const getZooMedia = (web3?: Web3) => {
  return getContract('ZooMedia', web3)
}

export const getZooMarket = (web3?: Web3) => {
  return getContract('ZooMarket', web3)
}

export const getZooAuction = (web3?: Web3) => {
  return getContract('ZooAuction', web3)
}

export const getZooFaucet = (web3?: Web3) => {
  return getContract('ZooFaucet', web3)
}

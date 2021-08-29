import { addresses, contracts } from 'constants/contracts'
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
export const getToken = (web3?: Web3) => {
  return getContract('ZooToken', web3)
}

export const getZooKeeper = (web3?: Web3) => {
  return getContract('ZooKeeper', web3)
}

export const getDrop = (web3?: Web3) => {
  return getContract('Drop', web3)
}

export const getMedia = (web3?: Web3) => {
  return getContract('Media', web3)
}

export const getMarket = (web3?: Web3) => {
  return getContract('Market', web3)
}

export const getAuction = (web3?: Web3) => {
  return getContract('Auction', web3)
}

export const getFaucet = (web3?: Web3) => {
  return getContract('Faucet', web3)
}

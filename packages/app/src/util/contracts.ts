import { addresses, abis } from 'constants/contracts'
import { Address } from 'constants/types'
import { CustomWeb3 as Web3 } from 'hooks/useWeb3'

// Get Address for any contract
export const getAddress = (contractName: string, chainID: number): string => {
  console.log('chainID',chainID)
  return addresses[chainID] ? addresses[chainID][contractName] : null
  // return addresses[contract][chainID]
  // return '0x34f3F270B85532f32c6F8039B960c569816Fc67a'
}

// Get ABI for any contract
export const getABI = (name: string, chainID: number | null) => {
  // console.log('name in getABI',contracts[name].abi)
  // return contracts[name].abi
  return abis[chainID] ? abis[chainID][name] : null
  // return abi
}


// Get instance of Contract
export const getContract = (name: string, web3?: Web3) => {
  const abi = getABI(name, web3.chainID)
  const address = getAddress(name, web3.chainID);
  return abi && address ? new web3.eth.Contract(abi, address) : null
}

// Helpers
export const getToken = (web3?: Web3) => {
  return getContract('ZOO', web3)
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

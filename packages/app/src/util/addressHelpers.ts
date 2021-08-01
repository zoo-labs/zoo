import addresses from 'constants/contracts'
import { Address } from 'constants/types'

export const getAddress = (address: Address, chainID?: number): string => {
  const mainNetChainId = 1
  const chainId = chainID || process.env.REACT_APP_CHAIN_ID
  return address[chainId] ? address[chainId] : address[mainNetChainId]
}

export const getZooAddress = (chainId?: number) => {
  return getAddress(addresses.zooToken, chainId)
}

export const getZooAuctionAddress = (chainId?: number) => {
  return getAddress(addresses.zooAuction, chainId)
}

export const getZooDropAddress = (chainId?: number) => {
  return getAddress(addresses.zooDrop, chainId)
}

export const getZooFaucetAddress = (chainId?: number) => {
  return getAddress(addresses.zooFaucet, chainId)
}

export const getZooMarketAddress = (chainId?: number) => {
  return getAddress(addresses.zooMarket, chainId)
}

export const getZooMediaAddress = (chainId?: number) => {
  return getAddress(addresses.zooMedia, chainId)
}

export const getZooKeeperAddress = (chainId?: number) => {
  return getAddress(addresses.zooKeeper, chainId)
}

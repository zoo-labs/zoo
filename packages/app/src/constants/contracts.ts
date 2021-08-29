import { contracts } from './contracts.json'
import { ChainID, supportedChains } from '@zoolabs/app/src/constants/chains'

const contractNames = ['ZooV2', 'ZooKeeper', 'Bridge', 'DAO', 'Market', 'Media', 'Auction', 'Faucet']

const getAddresses = () => {
  const addresses = {}
  contractNames.map((name) => {
    addresses[name] = {}
    supportedChains.map((chain) => {
      addresses[name][chain] = contracts[name].address
    })
  })
  return addresses
}

const addresses: { [key: string]: { [key: number]: string } } = getAddresses()

export { contracts, contractNames, addresses }

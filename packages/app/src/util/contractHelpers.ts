import Web3 from 'web3'
import { AbiItem } from 'web3-utils'

// Addresses
import {
  getZooAddress
} from 'util/addressHelpers'

// ABIs
import zooTokenAbi from 'config/abi/zooToken.json'


const getContract = (abi: any, address: string, web3?: Web3) => {
  return new web3.eth.Contract((abi as unknown) as AbiItem, address)
}

export const getZooToken = (web3?: Web3, chainID?:number) => {
  return getContract(zooTokenAbi, getZooAddress(chainID), web3)
}

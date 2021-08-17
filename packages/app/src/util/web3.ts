import Web3 from 'web3'
// import { HttpProviderOptions } from 'web3-core-helpers'
import getRpcUrl from 'util/getRpcUrl'

const RPC_URL = getRpcUrl()
const Rinkeby_URL = 'https://rinkeby.infura.io/v3/3676426207db478895555cd6b835766e'
const httpProvider = new Web3.providers.HttpProvider(RPC_URL, { timeout: 10000 })
const httpRinkProvider = new Web3.providers.HttpProvider(Rinkeby_URL, { timeout: 10000 })
const web3RinkNoAccount = new Web3(httpRinkProvider)
const web3NoAccount = new Web3(httpProvider)

const BSC_TEST_URL = 'https://data-seed-prebsc-1-s1.binance.org:8545/'
const httpBSCProvider = new Web3.providers.HttpProvider(BSC_TEST_URL, { timeout: 10000 })
const web3BSCTestNoAccount = new Web3(httpBSCProvider)

const getWeb3NoAccount = () => {
  return web3NoAccount
}

const getRinkWeb3NoAccount = () => {
  return web3RinkNoAccount
}

const getBSCTestWeb3NoAccount = () => {
  return web3BSCTestNoAccount
}

export { getBSCTestWeb3NoAccount }
export { getWeb3NoAccount }
export { getRinkWeb3NoAccount }
export default web3NoAccount

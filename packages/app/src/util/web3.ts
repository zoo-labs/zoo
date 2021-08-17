import Web3 from 'web3'
import getRandomNode from 'util/getRandomNode'

const httpProvider = new Web3.providers.HttpProvider(getRandomNode(97), { timeout: 10000 })
const web3NoAccount = new Web3(httpProvider)

const getWeb3NoAccount = () => {
  return web3NoAccount
}

export { getWeb3NoAccount }

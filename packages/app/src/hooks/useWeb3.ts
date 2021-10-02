import { useEffect, useState, useRef } from 'react'
import Web3 from 'web3'
import { useWeb3React } from '@web3-react/core'
import { getWeb3NoAccount } from 'util/web3'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { useActiveWeb3React } from './useActiveWeb3React'

// import Moralis from 'moralis'

export type Extra = {
  account: string
  chainID: number
  chainId: number
  gasPrice: number
  connector: AbstractConnector
  library: any
  web3: any
}

export type CustomWeb3 = any & Extra

/**
* Provides a web3 instance using the provider provided by useWallet
* with a fallback of an httpProver
* Recreate web3 instance only if the provider change
*/
export const useWeb3 = () => {
  const { account, chainId, library, connector } = useActiveWeb3React()
  const [gasPrice, setGasPrice] = useState(null)

  const web3 = new Web3(library as any)

  async function getGasPrice() {
    const weiPrice = Number(await web3.eth.getGasPrice())
    console.log('Gas price', weiPrice / 10 ** 9)
    setGasPrice(weiPrice)
  }

  useEffect(() => {
    getGasPrice()
  }, [])

  const custom = library as CustomWeb3
  custom.account = account
  custom.chainId = chainId
  custom.chainID = chainId
  custom.gasPrice = gasPrice
  custom.connector = connector
  custom.library = library
  custom.web3 = web3
  // custom.eth.handleRevert = true

  return custom
}

export default useWeb3

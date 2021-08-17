import { useEffect, useState, useRef } from 'react'
import Web3 from 'web3'
import { useWeb3React } from '@web3-react/core'
import { getWeb3NoAccount } from 'util/web3'

import Moralis from 'moralis'

export type Extra = {
    account: string
    chainID: number
    gasPrice: number
}

export type CustomWeb3 = Web3 & Extra

/**
 * Provides a web3 instance using the provider provided by useWallet
 * with a fallback of an httpProver
 * Recreate web3 instance only if the provider change
 */
export const useWeb3 = () => {
  const { account, chainId, library } = useWeb3React()
  const ref = useRef(library)
  const [gasPrice, setGasPrice] = useState(null)
  const [web3, setWeb3] = useState(library ? new Web3(library) : getWeb3NoAccount())

  useEffect(() => {
    if (library !== ref.current) {
      setWeb3(library ? new Web3(library) : getWeb3NoAccount())
      ref.current = library
    }
  }, [library])

  useEffect(() => {
    (async function getGasPrice() {
      let price = 8 // default to 8 for hardhat
      const results = await Moralis.Cloud.run('getAverageGasPrice')
      if (results.length > 0) price = results[0].avgGas
      console.log('Average Gas Price:', price)
      setGasPrice((price + 3) * (10 ** 9)) // Increase price so transactions go through quickly
    })()
  }, [])

  const custom = web3 as CustomWeb3
  custom.account = account
  custom.chainID = Number(chainId)
  custom.gasPrice = gasPrice
  custom.eth.handleRevert = true

  return custom
}

export default useWeb3

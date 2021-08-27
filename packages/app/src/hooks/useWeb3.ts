import { useEffect, useState, useRef } from 'react'
import Web3 from 'web3'
import { useWeb3React } from '@web3-react/core'
import { getWeb3NoAccount } from 'util/web3'
import { AbstractConnector } from '@web3-react/abstract-connector'

// import Moralis from 'moralis'

export type Extra = {
  account: string
  chainID: number
  gasPrice: number
  connector: AbstractConnector
  library: any
}

export type CustomWeb3 = Web3 & Extra

/**
 * Provides a web3 instance using the provider provided by useWallet
 * with a fallback of an httpProver
 * Recreate web3 instance only if the provider change
 */
export const useWeb3 = () => {
  const { account, chainId, library, connector } = useWeb3React()
  const ref = useRef(library)
  const [gasPrice, setGasPrice] = useState(null)
  const [web3, setWeb3] = useState(library ? new Web3(library) : getWeb3NoAccount())

  useEffect(() => {
    if (library !== ref.current) {
      setWeb3(library ? new Web3(library) : getWeb3NoAccount())
      ref.current = library
    }
  }, [library])


  async function getGasPrice() {
    const weiPrice = Number(await web3.eth.getGasPrice())
    console.log('Gas price', weiPrice / 10 ** 9)
    setGasPrice(weiPrice)
  }

  useEffect(() => {
    getGasPrice()
  }, [])

  const custom = web3 as CustomWeb3
  custom.account = account
  custom.chainID = Number(chainId)
  custom.gasPrice = gasPrice
  custom.connector = connector
  custom.library = library
  // custom.eth.handleRevert = true

  return custom
}

export default useWeb3
// import { ChainId } from '@sushiswap/sdk'
// import { NetworkContextName } from '../constants'
// import { Web3Provider } from '@ethersproject/providers'
// import { Web3ReactContextInterface } from '@web3-react/core/dist/types'
// import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'

// export function useActiveWeb3React(): Web3ReactContextInterface<Web3Provider> & {
//   chainId?: ChainId
// } {
//   // replace with address to impersonate
//   const impersonate = false
//   const context = useWeb3ReactCore<Web3Provider>()
//   const contextNetwork = useWeb3ReactCore<Web3Provider>(NetworkContextName)
//   return context.active
//     ? { ...context, account: impersonate || context.account }
//     : { ...contextNetwork, account: impersonate || contextNetwork.account }
// }

// export default useActiveWeb3React

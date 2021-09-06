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
  const { account: web3Account, chainId, library, connector } = useWeb3React()
  const ref = useRef(library)
  const [gasPrice, setGasPrice] = useState(null)
  const [web3, setWeb3] = useState(library ? new Web3(library) : getWeb3NoAccount())

  const ethereum = (window as any).ethereum || { chainId: null, on: () => {} }
  const [chainID, setChainID] = useState(Number(ethereum.chainId || 56))
  const [account, setAccount] = useState(web3Account)
  const customObject = web3 as CustomWeb3

  customObject.account = account
  customObject.chainID = Number(chainID)
  customObject.gasPrice = gasPrice
  customObject.connector = connector
  customObject.library = web3

  const [custom, setCustom] = useState(
    Object.assign({}, customObject, {
      account,
      chainID: Number(chainID),
      gasPrice,
      connector,
      library,
    }),
  )

  useEffect(() => {
    console.log('iitializing web3')
    ethereum.on('chainChanged', (chainID) => {
      console.log('chainChanged to',chainID)
      setChainID(Number(chainID))
      custom.chainID = Number(chainID)
      setCustom(Object.assign({}, { chainID: Number(chainID) }, custom))
       window.location.reload()

    })
    ethereum.on('accountsChanged', (accounts) =>{
      console.log('hitting accountsChanged',accounts)
      getAccounts(accounts)
    })
    return () => {
      ethereum.removeAllListeners()
    }
  }, [])

  useEffect(() => {
    if (library !== ref.current) {
      setWeb3(library ? new Web3(library) : getWeb3NoAccount())
      setCustom(Object.assign({}, { library: web3 }, custom))
      ref.current = library
      
    }
  }, [library, account, chainID])

  async function getAccounts(accounts) {
console.log('custom.account',custom.account)
    // if (custom.account && custom.account.length > 0) return
    const newAccounts = accounts||(web3Account ? [web3Account] : await web3.eth.getAccounts())
    const account = newAccounts[0]
    console.log('changing account in web3 to',account)
    setAccount(account)
      setCustom(Object.assign({}, custom, { account: account }))

  }

  // useEffect(() => {
  //   getAccounts()
  // }, [account, chainID, library])

  async function getGasPrice() {
    const weiPrice = Number(await web3.eth.getGasPrice())
    // console.log('Gas price', weiPrice / 10 ** 9)
    setGasPrice(weiPrice)
  }

  useEffect(() => {
    getGasPrice()
  }, [])
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

import { AbstractConnector } from '@web3-react/abstract-connector'
import { useWeb3React } from '@web3-react/core'
import Web3 from 'web3'

export type Extra = {
  account: string
  chainId: number
  gasPrice: number
  connector: AbstractConnector
  library: any
  web3: any
}

export type CustomWeb3 = Web3 & Extra

export const useWeb3 = useWeb3React
/**
 * Provides a web3 instance using the provider provided by useWallet
 * with a fallback of an httpProver
 * Recreate web3 instance only if the provider change
 */
// export const useWeb3 = () => {
//   const { account: web3Account, chainId, library, connector } = useWeb3React()
//   const ref = useRef(library)
//   const [gasPrice, setGasPrice] = useState(null)
//   const [web3, setWeb3] = useState(library ? new Web3(library) : getWeb3NoAccount())

//   const ethereum = (window as any).ethereum || { chainId: null, on: () => {} }
//   const [chainId, setChainID] = useState(Number(ethereum.chainId || 56))
//   const [account, setAccount] = useState(web3Account)
//   const customObject = web3 as CustomWeb3

//   customObject.account = account
//   customObject.chainId = Number(chainId)
//   customObject.chainId = Number(chainId)
//   customObject.gasPrice = gasPrice
//   customObject.connector = connector
//   customObject.library = web3
//   customObject.web3 = web3

//   const [custom, setCustom] = useState(
//     Object.assign({}, customObject, {
//       account,
//       chainId: Number(chainId),
//       gasPrice,
//       connector,
//       library,
//     }),
//   )

//   useEffect(() => {
//     console.log('iitializing web3')
//     ethereum.on('chainChanged', (chainId) => {
//       console.log('chainChanged to', chainId)
//       setChainID(Number(chainId))
//       custom.chainId = Number(chainId)
//       setCustom(Object.assign({}, { chainId: Number(chainId) }, custom))
//       //  window.location.reload()
//     })
//     ethereum.on('accountsChanged', (accounts) => {
//       console.log('hitting accountsChanged', accounts)
//       getAccounts(accounts)
//     })

//     return () => {
//       ethereum.removeAllListeners()
//     }
//   }, [])

//   useEffect(() => {
//     if (library !== ref.current) {
//       setWeb3(library ? new Web3(library) : getWeb3NoAccount())
//       setCustom(Object.assign({}, { library: web3 }, custom))
//       ref.current = library
//     }
//   }, [library, account, chainId])

//   async function getAccounts(accounts?: any) {
//     console.log('custom.account', custom.account)
//     // if (custom.account && custom.account.length > 0) return
//     const newAccounts = accounts || web3Account ? [web3Account] : await web3.eth.getAccounts()
//     const account = newAccounts[0]
//     console.log('changing account in web3 to', account)
//     setAccount(account)
//     setCustom(Object.assign({}, custom, { account: account }))
//   }

//   useEffect(() => {
//     getAccounts()
//   }, [account, chainId, library])

//   async function getGasPrice() {
//     const weiPrice = Number(await web3.eth.getGasPrice())
//     // console.log('Gas price', weiPrice / 10 ** 9)
//     setGasPrice(weiPrice)
//   }

//   useEffect(() => {
//     getGasPrice()
//   }, [])
//   // custom.eth.handleRevert = true

//   return custom
// }

export default useWeb3

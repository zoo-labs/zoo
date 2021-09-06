// import { useEffect } from 'react'
// import { connectorLocalStorageKey, ConnectorNames } from 'components'
// import useAuth from './useAuth'

// const useEagerConnect = () => {
//   const { login } = useAuth()

//   useEffect(() => {
//     const connectorId = window.localStorage.getItem(connectorLocalStorageKey) as ConnectorNames

//     // Disable eager connect for BSC Wallet. Currently the BSC Wallet extension does not inject BinanceChain
//     // into the Window object in time causing it to throw an error
//     // TODO: Figure out an elegant way to listen for when the BinanceChain object is ready
//     if (connectorId && connectorId !== ConnectorNames.BSC) {
//       login(connectorId)
//     }
//   }, [login])
// }

// export default useEagerConnect


import { useEffect, useState } from 'react'

import { injected } from '../config/wallets'
import { isMobile } from 'react-device-detect'
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'
declare let window: any;

function useEagerConnect() {
  const { activate, active } = useWeb3ReactCore() // specifically using useWeb3ReactCore because of what this hook does
  const [tried, setTried] = useState(false)

  useEffect(() => {
    injected.isAuthorized().then((isAuthorized) => {
      if (isAuthorized) {
        activate(injected, undefined, true).catch(() => {
          setTried(true)
        })
      } else {
        if (isMobile && window.ethereum) {
          activate(injected, undefined, true).catch(() => {
            setTried(true)
          })
        } else {
          setTried(true)
        }
      }
    })
  }, [activate]) // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (active) {
      setTried(true)
    }
  }, [active])

  return tried
}

export default useEagerConnect

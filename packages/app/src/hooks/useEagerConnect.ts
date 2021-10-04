import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'
import { connectorLocalStorageKey, ConnectorNames } from 'components'
import { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { injected } from '../config/wallets'
import useAuth from './useAuth'
declare let window: any

export function useEagerConnectAlt() {
  const { login } = useAuth()

  useEffect(() => {
    const connectorId = window.localStorage.getItem(connectorLocalStorageKey) as ConnectorNames

    // Disable eager connect for BSC Wallet. Currently the BSC Wallet extension does not inject BinanceChain
    // into the Window object in time causing it to throw an error
    // TODO: Figure out an elegant way to listen for when the BinanceChain object is ready
    if (connectorId && connectorId !== ConnectorNames.BSC) {
      login(connectorId)
    }
  }, [login])
}

function useEagerConnect() {
  const { activate, active } = useWeb3ReactCore() // specifically using useWeb3ReactCore because of what this hook does
  const [tried, setTried] = useState(false)

  useEffect(() => {
    injected.isAuthorized().then((isAuthorized) => {
      if (isAuthorized) {
        console.log('hitting this bast 1', injected)

        activate(injected, undefined, true).catch(() => {
          console.log('hitting this bast 1.5')

          setTried(true)
        })
      } else {
        console.log('hitting this bast 2')

        if (isMobile && window.ethereum) {
          console.log('hitting this bast 3')
          activate(injected, undefined, true).catch(() => {
            setTried(true)
          })
        } else {
          console.log('hitting this bast 4')

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

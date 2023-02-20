import { useEffect, useState } from 'react'

import { injected } from '../config/wallets'
import { isMobile } from 'react-device-detect'
// import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'
import useActiveWeb3React from './useActiveWeb3React'

function useEagerConnect() {
  const { connector, active } = useActiveWeb3React() // specifically using useWeb3ReactCore because of what this hook does
  const [tried, setTried] = useState(false)

  useEffect(() => {
    injected.isAuthorized().then((isAuthorized) => {

      if (isAuthorized) {
        connector.activate(injected, undefined, true)
      } else {
        if (isMobile && window.ethereum) {
          connector.activate(injected, undefined, true)
        } else {
          setTried(true)
        }
      }
    })

  }, []) // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (active) {
      setTried(true)
    }
  }, [active])

  return tried
}

export default useEagerConnect

import React, { ReactNode } from 'react'
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'

import { InjectedConnector } from '@web3-react/injected-connector'
import { MetamaskStateProvider } from '../../hooks/web3'

export const injectedConnector = new InjectedConnector({
    supportedChainIds: [
      1, // Mainet
      3, // Ropsten
      4, // Rinkeby
      5, // Goerli
      42, // Kovan
      1337, // local net
      31337, // hardhat
    ],
  })

  function getLibrary(provider: any): Web3Provider {
    const library = new Web3Provider(provider)
    console.log(`getLibrary >`, library);
    library.pollingInterval = 12000
    return library
  }


  export const Web3RootProvider = ({ children }: { children: ReactNode }) => {
          // FUTURE -- don't do this
      return (
          <MetamaskStateProvider>
        <Web3ReactProvider getLibrary={getLibrary}>
            {children}
            </Web3ReactProvider>
            </MetamaskStateProvider>
      )
  }
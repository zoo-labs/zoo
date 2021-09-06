import React from 'react'
import store from 'state'
import { Provider } from 'react-redux'
import { HelmetProvider } from 'react-helmet-async'
import { RefreshContextProvider } from 'contexts/RefreshContext'
import { ThemeContextProvider } from 'contexts/ThemeContext'
import { Web3ReactProvider } from '@web3-react/core'
import { getLibrary } from 'util/web3React'
import { ModalProvider } from './components'
import { MoralisProvider } from 'util/moralis/provider'
import Web3ProviderNetwork from 'components/Web3ProviderNetwork'
import Web3ReactManager from 'components/Web3ReactManager'

const Providers: React.FC = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>
        <Web3ReactManager>
          <MoralisProvider>
            <Provider store={store}>
              <HelmetProvider>
                <ThemeContextProvider>
                  <RefreshContextProvider>
                    <ModalProvider>{children}</ModalProvider>
                  </RefreshContextProvider>
                </ThemeContextProvider>
              </HelmetProvider>
            </Provider>
          </MoralisProvider>
        </Web3ReactManager>
      </Web3ProviderNetwork>
    </Web3ReactProvider>
  )
}

export default Providers

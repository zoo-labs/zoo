import { Web3ReactProvider } from '@web3-react/core'
import Web3ProviderNetwork from 'components/Web3ProviderNetwork'
import Web3ReactManager from 'components/Web3ReactManager'
import { RefreshContextProvider } from 'contexts/RefreshContext'
import { ThemeContextProvider } from 'contexts/ThemeContext'
import React from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import store from 'state'
import { MoralisProvider } from 'util/moralis/provider'
import { getLibrary } from 'util/web3React'
import { getApolloClient } from 'util/getApolloClient'
import { ModalProvider } from './components'
import { ApolloProvider } from "@apollo/client";

const Providers: React.FC = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>
        <Web3ReactManager>
          <MoralisProvider>
            <ApolloProvider client={getApolloClient}>
              <Provider store={store}>
                <HelmetProvider>
                  <ThemeContextProvider>
                    <RefreshContextProvider>
                      <ModalProvider>{children}</ModalProvider>
                    </RefreshContextProvider>
                  </ThemeContextProvider>
                </HelmetProvider>
              </Provider>
            </ApolloProvider>
          </MoralisProvider>
        </Web3ReactManager>
      </Web3ProviderNetwork>
    </Web3ReactProvider>
  )
}

export default Providers

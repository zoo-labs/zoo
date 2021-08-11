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

const Providers: React.FC = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
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
    </Web3ReactProvider>
  )
}

export default Providers

import React from 'react'
import { ModalProvider } from './components'
import { Web3ReactProvider } from '@web3-react/core'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import { getLibrary } from 'util/web3React'
// import { LanguageContextProvider } from 'contexts/Localisation/languageContext'
import { ThemeContextProvider } from 'contexts/ThemeContext'
import { RefreshContextProvider } from 'contexts/RefreshContext'
import { MoralisProvider } from "react-moralis";
import store from 'state'

const Providers: React.FC = ({ children }) => {
  return (
    <MoralisProvider appId="16weSJXK4RD3aYAuwiP46Cgzjm4Bng1Torxz5qiy" serverUrl="https://dblpeaqbqk32.usemoralis.com:2053/server">
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
        <HelmetProvider>
          <ThemeContextProvider>
            <RefreshContextProvider>
              <ModalProvider>{children}</ModalProvider>
            </RefreshContextProvider>
          </ThemeContextProvider>
        </HelmetProvider>
      </Provider>
    </Web3ReactProvider>
   </MoralisProvider >
  )
}

export default Providers
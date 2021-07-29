import React from "react";
import { ModalProvider } from "./components";
import { Web3ReactProvider } from "@web3-react/core";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { getLibrary } from "util/web3React";
// import { LanguageContextProvider } from 'contexts/Localisation/languageContext'
import { ThemeContextProvider } from "contexts/ThemeContext";
import { RefreshContextProvider } from "contexts/RefreshContext";
import store from "state";

const Providers: React.FC = ({ children }) => {
   return (
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
   );
};

export default Providers;

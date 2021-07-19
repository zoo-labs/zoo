import React, { MouseEvent } from 'react';
import { MetamaskStateProvider } from 'use-metamask'
import logo from './../../media/images/logo.jpg';

import './App.scss';
function App() {
  const metamaskLogin = (e: MouseEvent) => {
    console.log("metamask login", e);
  }
  if (localStorage.czUser) {
    window.location.href = '/feed';
    
  }
  return (
    <MetamaskStateProvider>
    <main className="HomePage">
      <div className="HomePage-inner">
        
        <a className="MetamaskLogin" onClick={metamaskLogin}>
          <img src={logo} alt="CryptoZoo"/>   
          Login with MetaMask
        </a>
      </div>
    </main>
    </MetamaskStateProvider>
  );
}

export default App;

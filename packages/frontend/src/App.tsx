import React, { MouseEvent, useEffect, useState } from 'react';
import logo from './media/images/logo.jpg';
import {ethers} from 'ethers'

import './App.scss';
function App() {
  const metamaskLogin = (e: MouseEvent) => {
    console.log("metamask login", e);
  }
  if (localStorage.czUser) {
    window.location.href = '/feed';
    
  }

  return (
    <main className="HomePage">
      <div className="HomePage-inner">
        <h1>Hello</h1>
        <div className="MetamaskLogin" onClick={metamaskLogin}>
          <img src={logo} alt="CryptoZoo"/>   
          Login with MetaMask
        </div>
      </div>
    </main>
  );
}

export default App;

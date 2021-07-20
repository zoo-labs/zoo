import React, { MouseEvent, useEffect } from 'react';
import logo from './../../media/images/logo.jpg';
import { useMetamask } from '../../hooks/metamask';

import './Homepage.scss';
import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';

export const Homepage = function () {
    const { connect, metaState } = useMetamask();
  const metamaskLogin = (e: MouseEvent) => {
    console.log("metamask login", e);
  }
  if (localStorage.czUser) {
    window.location.href = '/feed';  
  }

  useEffect(() => {
      if (!metaState.isConnected) {
          (async () => {
              try {
                  const provider = await detectEthereumProvider();
                  console.log(provider)
                  await connect(provider as ethers.providers.Provider);
              } catch (err) {
                  console.warn(err);
              }
          })();
      }
  }, [])

  return (
    <main className="HomePage">
      <div className="HomePage-inner">
        
        <a className="MetamaskLogin" onClick={metamaskLogin}>
          <img src={logo} alt="CryptoZoo"/>   
          Login with MetaMask
        </a>
      </div>
    </main>
  );
}

export default Homepage;

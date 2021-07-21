import { BigNumber } from 'ethers';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useMetamask } from '../../hooks/web3'
import { toShort } from '../../utils';


export const Homepage = () => {

    const [account, setAccount] = useState([]);
    const [chainId, setChainId] = useState();
    const [balance, setBalance] = useState(0);

    const { connect, active, state } = useMetamask();

    useEffect(() => {
        (async () => {
            await connect();

            if (state.web3) {
              const _balance = await state.web3.getBalance(state.account[0]);
              setBalance(Number(_balance));
            }
        })();
    }, [active])

  return (
    <div>
        <h1>Account</h1> {state.account ? state.account[0] : 0}
        <h4>Chain: {chainId}</h4>
        <h4>Balance: {balance}</h4>
  </div>
  )
}

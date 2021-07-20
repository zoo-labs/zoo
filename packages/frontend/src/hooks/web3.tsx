/**
 * TODO: make this pretty
 */
import { useContext, useEffect, useState, useRef, createContext, ReactNode, Dispatch }  from "react";
import { useWeb3React } from '@web3-react/core'
import { Web3ReactProvider } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'
import { Web3Provider } from '@ethersproject/providers'
import {ethers} from 'ethers'

import { useReducer } from "react";

export interface IChain {
  id: null | number;
  name: string;
}

export interface IWeb3State {
  account: any[]; // for now
  chain: IChain;
  isConnected: boolean;
  web3: Web3Provider | null;
}

export interface IWeb3Action {
  type: string;
  payload: any;
}

const typeStateMap = {
  SET_ACCOUNT: `account`,
  SET_CHAIN: 'chain',
  SET_CONNECTED: 'isConnected',
  SET_WEB3: 'web3'
}

const initialState: IWeb3State = {
  account: [],
  chain: {id: null, name: ''},
  isConnected: false,
  web3: null
}

const reducer = (state: IWeb3State, action: IWeb3Action) => {
  const stateName = (typeStateMap as any)[action.type];
  if (!stateName) {
    console.warn(`Unknown action: ${action.type}`);
    return state;
  }
  return {...state, [stateName]: action.payload};
}

interface DispatchValue {
  dispatch: any;
  state: IWeb3State;
}

export const MetaStateContext = createContext(initialState);
export const MetaDispatchContext = createContext<{
  state: IWeb3State,
  dispatch: Dispatch<IWeb3Action>,
} | null>(null);

export const MetamaskStateProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const dispatchValue = {state, dispatch}
  return (
    <MetaDispatchContext.Provider value={(dispatchValue as DispatchValue)}>
      <MetaStateContext.Provider value={state}>
      <Web3ReactProvider getLibrary={getLibrary}>
        {children}
        </Web3ReactProvider>
      </MetaStateContext.Provider>
    </MetaDispatchContext.Provider>
  )
}


export const injected = new InjectedConnector({
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
    library.pollingInterval = 12000
    return library
  }

  const chains = (chainId: string) => {
    if (!!Number(chainId) && chainId.length > 9) {
      return "local";
    }
    switch (chainId) {
      case "1" : return "mainnet";
      case "3" : return "ropsten";
      case "4" : return "rinkeby";
      case "5" : return "goerli";
      case "42": return "kovan";
      case "1337": return 'localhost';
      case "31337": return 'hardhat';
      default  : return `unknown`;
    }
  };

/**
 * Add Metamask onboarding
 */
export const useMetamask = () => {
  const state = useContext(MetaStateContext);
  const {dispatch} = useContext(MetaDispatchContext) as DispatchValue;

  const _isMounted = useRef(true);
  const _isConnectCalled = useRef(false);
  const [ provider ] = useState(window.ethereum);

  const ethereum = window.ethereum;
  

              const handleConnect = () => {
            console.log("'connect' event")
            activate(injected)
          }
          const handleChainChanged = (chainId: string | number) => {
            console.log("'chainChanged' event with payload", chainId)
            activate(injected)
            dispatch({ type: 'SET_CHAIN', payload: chainId });
          }
          const handleAccountsChanged = (accounts: string[]) => {
            console.log("'accountsChanged' event with payload", accounts)
            if (accounts.length > 0) {
              activate(injected)
              dispatch({ type: 'SET_ACCOUNT', payload: account});
            }
          }
        

      const unlisten = async () => {
              if (ethereum.removeListener) {
                ethereum.removeListener('connect', handleConnect)
                ethereum.removeListener('chainChanged', handleChainChanged)
                ethereum.removeListener('accountsChanged', handleAccountsChanged)
              }
              _isConnectCalled.current = false;
          }

          const listen = () => {
          ethereum.on('connect', handleConnect)
      ethereum.on('chainChanged', handleChainChanged)
      ethereum.on('accountsChanged', handleAccountsChanged)
      ethereum.on('close', unlisten);
          }

  useEffect(() => {
    listen();
    return () => {
      _isMounted.current = false;
      unlisten();
    }
  }, [listen, unlisten]);

  const { library, account, activate, active } = useWeb3React<Web3Provider>()
  
  const connect = async () => {
    if (_isConnectCalled.current) throw Error(`Connect already called`);
    _isConnectCalled.current = true;

    await activate(injected);

    const web3Provider = new ethers.providers.Web3Provider(window.ethereum)
    dispatch({ type: 'SET_WEB3', payload: web3Provider })

    await getAccounts({ requestPermission: true });
    await getChain();

    _isConnectCalled.current = false;

    return {state, provider}
  }

  const getAccounts = async ({ requestPermission }: { requestPermission: boolean } = { requestPermission: false }) => {
    if (!active) {
      console.warn(`Metamask is not available`);
      return;
    }

    try {
      const accounts = await provider.request({
        method: requestPermission ? `eth_requestAccounts` : `eth_accounts`,
        params: []
      });
      if (accounts.length) {
        dispatch({ type: 'SET_CONNECTED', payload: true });
        dispatch({ type: `SET_ACCOUNT`, payload: accounts });
      }
      return accounts;
    } catch (err) {
      throw Error(err);
    }
  }

  const getChain = async () => {
    if (!active) {
      console.warn(`Metamask is not available`);
      return;
    }

    try {
      const chainId = await provider.request({
        method: "eth_chainId",
      });
      const _chainInfo = { id: chainId, name: chains(chainId) };
      dispatch({ 
        type: "SET_CHAIN", 
        payload: _chainInfo 
      });
      return _chainInfo;
    } catch (error) {
      throw Error(error);
    }
  }

  return { connect, getAccounts, active, getChain, state };
}
import { useContext, useEffect, useState, useRef} from 'react'
import { typeStates, MetaStateContext, MetaDispatchContext} from './store'
import {ethers} from 'ethers'
import MetaMaskOnboarding from '@metamask/onboarding';


export interface IAccount {

}

const chains = (chainId: string) => {
    if (!!Number(chainId) && chainId.length > 9) {
        return 'local'
    }
    switch(chainId) {
        case "1": return "mainnet";
        case "3": return "ropsten";
        case "4": return "rinkby";
        case "5": return "goerli";
        case "42": return "kovan";
        default: return "unknown";
    }
};

const useMetamask = () => {
    const onboarding = useRef<MetaMaskOnboarding>();
    const state = useContext(MetaStateContext);
    const {dispatch} = useContext(MetaDispatchContext);
    const _isMounted = useRef(true);
    const _isConnectedCalled = useRef(false);
    const provider = useState();
    useEffect(() => {
        return () => {
            _isMounted.current = false;
        }
    }, []);

    useEffect(() => {
        if (!onboarding.current) {
            onboarding.current = new MetaMaskOnboarding();
        }
    }, []);

    const connect = async () => {
        useEffect(() => {
    
        })
        
        dispatch({type: 'SET_WEB3', payload: onboarding.current});

        await getAccounts({ requestPermission: true});
        await getChain();

        (window as any).ethereum.on('accountsChanged', (accounts: IAccount[]) => {
            if (!accounts.length) dispatch({ type: 'SET_CONNECTED', payload: false});
            dispatch({ type: 'SET_ACCOUNT', payload: accounts});
        });

        (window as any).ethereum.on('chainChanged', (chainId: string) => {
            const _chainId = parseInt(chainId, 16).toString();
            const _chainInfo = { id: _chainId, name: chains(_chainId) };
            dispatch({ type: typeStates.SET_CHAIN, payload: _chainInfo });
        });

        _isConnectedCalled.current = false;
    };

    const onboardMetamask = async () => {
        useEffect(() => {
            if (MetaMaskOnboarding.isMetaMaskInstalled()) {
                if (state.account.length > 0) {
                    // Not connected
                    onboarding.current?.startOnboarding();
                } else {
                    // Connected
                    onboarding.current?.stopOnboarding();
                }
            } else {
                return;
            }
        })
    }

    const getAccounts = async ({ requestPermission }: { requestPermission: boolean} = {requestPermission: false}) => {
        if (!provider) {
            console.warn(`Metamask is not available`);
            return;
        }

        try {
            const accounts = await (provider as any).request({
                method: requestPermission ? "eth_requestAccounts": "eth_accounts",
                params: [],
            });
            if (accounts.length) {
                dispatch({ type: 'SET_CONNECTED', payload: true });
                dispatch({ type: 'SET_ACCOUNT', payload: accounts });
            }
            return accounts;
        } catch (error) {
            throw Error(error);
        }
    };

    const getChain = async () => {
        if (!provider) {
            console.warn(`Metamask is not available`);
            return;
        }
        try {
            const chainId = await (provider as any).request({
                method: `net_version`,
                params: []
            });
            const _chainInfo = { id: chainId, name: chains(chainId) };
            dispatch({ type: 'SET_CHAIN', payload: _chainInfo});
            return _chainInfo;
        } catch (error) {
            throw Error(error);
        }
    }

    return {
        connect, getAccounts, getChain, metaState: { ...state, isAvailable: !!provider }
    };
}

export default useMetamask;
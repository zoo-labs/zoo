import { useContext, useEffect, useState, useRef} from 'react'
import { typeStates, MetaStateContext, MetaDispatchContext} from './store'
import {ethers} from 'ethers'

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
    const state = useContext(MetaStateContext);
    const dispatch = useContext(MetaDispatchContext);
    const _isMounted = useRef(true);
    const _isConnectedCalled = useRef(false);
    const provider = useState(ethers);
    useEffect(() => {
        return () => {
            _isMounted.current = false;
        }
    }, []);

    const connect = async (Web3Interface, settings = {}) => {
        if (!provider) throw Error(`Metamask is not available`);
        if (!Web3Interface) throw Error(`Web3Provider is required`);
        if (!_isMounted.current) throw Error(`Component is not mounted`);
        if (_isConnectedCalled.current) throw Error(`Connect method already called`);
        _isConnectedCalled.current = true;

        const _web3 = new Web3Interface(
            ...Web3Interface(Object.keys(settings).length ? [provider, settings] : [provider])
        );
        dispatch({type: typeStates.SET_WEB3, payload: _web3});

        await getAccounts({ requestPermission: true});
        await getChain();

        (window as any).ethereum.on('accountsChanged', (accounts: IAccount[]) => {
            if (!accounts.length) dispatch({ type: typeStates.SET_CONNECTED, payload: false});
            dispatch({ type: typeStates.SET_ACCOUNT, payload: accounts});
        });

        (window as any).ethereum.on('chainChanged', (chainId: string) => {
            const _chainId = parseInt(chainId, 16).toString();
            const _chainInfo = { id: _chainId, name: chains(_chainId) };
            dispatch({ type: typeStates.SET_CHAIN, payload: _chainInfo });
        });

        _isConnectedCalled.current = false;
    };

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
                dispatch({ type: typeStates.SET_CONNECTED, payload: true });
                dispatch({ type: typeStates.SET_ACCOUNT, payload: accounts });
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
            dispatch({ type: typeStates.SET_CHAIN, payload: _chainInfo});
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
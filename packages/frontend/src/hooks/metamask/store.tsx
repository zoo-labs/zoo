
import React, {createContext, ReactNode, useReducer} from 'react';

export interface IChain {
    id: null | number;
    name: string;
}

export interface MetamaskAction {
    type: string;
    payload: any;
}

export interface MetamaskState {
    account: any[];
    chain: IChain;
    isConnected: boolean;
    web3: any;
    ethers: any;
}

export const typeStates = {
    SET_ACCOUNT: 'account',
    SET_CHAIN: 'chain',
    SET_CONNECTED: 'isConnected',
    SET_WEB3: 'web3',
    SET_ETHERS: 'ethers'
};
const initialState: MetamaskState = {
    account: [],
    chain: { id: null, name: ''},
    isConnected: false,
    web3: null,
    ethers: null,
};

const reducer = (state: MetamaskState, action: MetamaskAction) => {
    const stateName = typeStates[action.type];
    if (!stateName) {
        console.warn(`Unknown action type: ${action.type}`);
        return state;
    }
    return {...state, [stateName]: action.payload};
}

export const MetaStateContext = createContext(initialState);
export const MetaDispatchContext = createContext(null);

export const MetamaskStateProvider = ({ children }: {children: ReactNode}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <MetaDispatchContext.Provider value={dispatch}>
            <MetaStateContext.Provider value={state}>
                {children}
            </MetaStateContext.Provider>
        </MetaDispatchContext.Provider>
    );
};

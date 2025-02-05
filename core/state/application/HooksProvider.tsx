// HooksProvider.tsx
//import { hooks as metaMaskHooks, metaMask } from "connectors/metaMask";
//import { hooks as networkHooks, network } from "connectors/network";
//import {
//  hooks as walletConnectHooks,
//  walletConnect,
//} from "connectors/walletConnect";
//import { CoinbaseWallet } from "@web3-react/coinbase-wallet";
//import {
//  useWeb3React,
//  Web3ReactHooks,
//  Web3ReactProvider,
//} from "@web3-react/core";
//import { MetaMask } from "@web3-react/metamask";
//import { Network } from "@web3-react/network";
//import type { Connector } from "@web3-react/types";
//import { WalletConnect } from "@web3-react/walletconnect";
//import {
//  coinbaseWallet,
//  hooks as coinbaseWalletHooks,
//} from "connectors/coinbaseWallet";

//const connectors: [
//  MetaMask | WalletConnect | CoinbaseWallet | Network,
//  Web3ReactHooks
//][] = [
//  [metaMask, metaMaskHooks],
//  [walletConnect, walletConnectHooks],
//  [coinbaseWallet, coinbaseWalletHooks],
//  [network, networkHooks],
//];

const HooksProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
    {children}
    </>
  )
  //return (
  //  <Web3ReactProvider connectors={connectors}>{children}</Web3ReactProvider>
  //);
};

export default HooksProvider;

import { create } from 'zustand';
import { NetworkConfig } from '../../types/network';
import { networks } from './networks';
import { localhostConfig } from './networks/localhost';

type NetworkConfigStore = NetworkConfig & {
  getConfigByChainId: (chainId?: number) => NetworkConfig;
  setCurrentConfig: (config: NetworkConfig) => void;
};

export const supportedNetworks = Object.values(networks).sort((a, b) => a.order - b.order);
export const supportedEnsNetworks = Object.values(networks)
  .filter(n => n.isENSSupported)
  .map(n => n.chain.id);

export const moralisSupportedChainIds = supportedNetworks
  .filter(network => network.moralis.chainSupported)
  .map(network => network.chain.id);

export const getNetworkConfig = (chainId?: number): NetworkConfig => {
  const foundChain = supportedNetworks.find(network => network.chain.id === chainId);
  if (foundChain) {
    return foundChain;
  } else {
    throw new Error(`Can't get network config for chain ${chainId}`);
  }
};

// Create the Zustand store - default to localhost for development
export const useNetworkConfigStore = create<NetworkConfigStore>(set => ({
  ...localhostConfig,
  getConfigByChainId: getNetworkConfig,
  setCurrentConfig: (config: NetworkConfig) => set({ ...config }),
}));

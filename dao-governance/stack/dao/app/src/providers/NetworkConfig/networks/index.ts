import base from './base';
import localhost from './localhost';
import mainnet from './mainnet';
import optimism from './optimism';
import polygon from './polygon';
import sepolia from './sepolia';

export const networks = { base, localhost, mainnet, optimism, polygon, sepolia };
export const validPrefixes = new Set(Object.values(networks).map(network => network.addressPrefix));

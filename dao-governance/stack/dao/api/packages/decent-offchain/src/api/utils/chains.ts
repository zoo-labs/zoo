import { SUPPORTED_CHAIN_IDS, SupportedChainId } from 'sdk';

export const getChainId = (chainId: number | string | undefined): SupportedChainId => {
  const chainIdNumber = Number(chainId);
  if (isNaN(chainIdNumber)) throw new Error(`Invalid chainId: ${chainId}`);
  if (!SUPPORTED_CHAIN_IDS.includes(chainIdNumber as SupportedChainId)) {
    throw new Error(`Unsupported chainId: ${chainId}`);
  }
  return chainIdNumber as SupportedChainId;
};

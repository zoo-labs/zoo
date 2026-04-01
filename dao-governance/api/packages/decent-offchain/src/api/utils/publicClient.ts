import { mainnet, base, optimism, polygon } from 'viem/chains';
import { SupportedChainId } from 'sdk';
import { createPublicClient, http, PublicClient } from 'viem';

export const publicClients: Record<SupportedChainId, PublicClient> = {
  1: createPublicClient({
    chain: mainnet,
    transport: http(process.env.PONDER_RPC_URL_1),
  }),
  8453: createPublicClient({
    chain: base,
    transport: http(process.env.PONDER_RPC_URL_8453),
  }) as PublicClient,
  10: createPublicClient({
    chain: optimism,
    transport: http(process.env.PONDER_RPC_URL_10),
  }) as PublicClient,
  137: createPublicClient({
    chain: polygon,
    transport: http(process.env.PONDER_RPC_URL_137),
  }),
};

export const getPublicClient = (chainId: SupportedChainId): PublicClient => {
  const client = publicClients[chainId];
  if (!client) {
    throw new Error(`No public client available for chainId: ${chainId}`);
  }
  return client;
};

export const publicClient = publicClients[1];

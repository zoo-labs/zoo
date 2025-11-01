export const SUPPORTED_CHAIN_IDS = [
  1, // Mainnet
  10, // Optimism
  137, // Polygon
  8453, // Base
] as const;

export type SupportedChainId = typeof SUPPORTED_CHAIN_IDS[number];

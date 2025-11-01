// Copied from React Dune Hooks package
// https://github.com/duneanalytics/hooks/blob/main/src/evm/types.ts

import { Address, Hex } from 'viem';
import { SupportedChainId } from 'sdk';

// Use 'type' for simple type aliases
type TokenBalance = {
  chain: string;
  chain_id: SupportedChainId;
  address: string;
  amount: string;
  symbol?: string;
  name?: string;
  decimals?: number;
  price_usd?: number;
  value_usd?: number;
  token_metadata?: {
    logo?: string;
    url?: string;
  };
  pool_size?: number;
  low_liquidity?: boolean;
};

export type BalanceData = {
  request_time: string;
  response_time: string;
  wallet_address: string;
  next_offset?: string | null;
  balances: TokenBalance[];
  errors?: {
    token_errors?: {
      address: string;
      chain_id: number;
      description?: string;
    }[];
  };
};

export type FetchError = Error & {
  status?: number;
  info?: unknown;
};

export type ResponseData = {
  data?: BalanceData;
  error?: FetchError;
  isLoading: boolean;
};

export type TokenBalancesParams = {
  /** Specify this to get native balances for a long tail of EVM chains, where we don't support ERC20 assets */
  allChains?: boolean;
  /** Comma separated list of chain ids to get balances for */
  chainIds?: string;
  /** Specify this to exclude spam tokens from the response */
  excludeSpamTokens?: boolean;
  /** Specify `erc20` or `native` to get only ERC20 tokens or native assets, respectively */
  filters?: 'erc20' | 'native';
  /** Maximum number of transactions to return */
  limit?: number;
  /** The offset to paginate through result sets. This is a cursor being passed from the previous response, only use what the backend returns here. */
  offset?: string;
  /** A comma separated list of additional metadata fields to include for each token. Supported values: logo, url */
  metadata?: boolean;
};

export type TransactionsParams = {
  /** The offset to paginate through result sets. This is a cursor being passed from the previous response, only use what the backend has returned on previous responses. */
  offset?: string | null;

  /** Maximum number of transactions to return */
  limit?: number | null;

  /** Return only transactions before this block time */
  block_time?: number | null;

  /** Comma separated list of chain ids to get transactions for */
  chainIds?: string | null;

  /** Filter transactions to a given address */
  to?: string | null;

  /** Return only transactions with this method id */
  method_id?: string | null;

  /** Return abi decoded transactions and logs */
  decode?: boolean | null;

  /** Return only transactions with this address in logs */
  log_address?: string | null;

  /** Return only transactions with this topic0 */
  topic0?: string | null;

  /** Return only transactions with this block number */
  min_block_number?: number | null;
};

export type UseTokenBalancesConfig = {
  queryOptions?: {
    refetchOnWindowFocus?: boolean;
    staleTime?: number;
    refetchInterval?: number;
  };
};

export type LogEntry = {
  address: Address;
  data: Hex;
  topics: Hex[];
  decoded?: {
    name: string;
    inputs: {
      name: string;
      type: string;
      value: string;
    }[];
  };
};

export type Transaction = {
  chain: string;
  chain_id: SupportedChainId;
  address: string;
  block_time: string;
  block_number: number;
  index: number;
  hash: Hex;
  block_hash: Hex;
  value: string;
  transaction_type: string;
  from: Address;
  to: Address;
  nonce: Hex;
  gas_price: Hex;
  gas_used: Hex;
  effective_gas_price: Hex;
  success: boolean;
  data: Hex;
  logs: LogEntry[];
};

export type TransactionData = {
  transactions: Transaction[];
  next_offset?: string | null;
};

export type TokenInfo = {
  chain_id: SupportedChainId;
  chain: string;
  price_usd?: number;
  pool_size?: number;
  total_supply?: string;
  symbol: string;
  name?: string;
  decimals?: number;
  logo?: string;
};

export type TokenQueryParams = {
  /** The offset to paginate through result sets. This is a cursor being passed from the previous response, only use what the backend has returned on previous responses. */
  offset?: string | null;

  /** Maximum number of transactions to return */
  limit?: number | null;

  /** Comma separated list of chain ids to get transactions for */
  chainIds?: string | null;
};

export type TokenData = {
  // hacky: its not exactly TokenBalance, but it has most fields
  // https://docs.sim.dune.com/evm/token-info
  contract_address: string;
  tokens: TokenInfo[];
  next_offset?: string | null;
};

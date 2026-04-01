// Modified from React Dune Hooks package
// https://github.com/duneanalytics/hooks/blob/main/src/evm/duneApi.ts
import { Address } from 'viem';
import {
  BalanceData,
  TokenBalancesParams,
  TokenData,
  TokenQueryParams,
  TransactionData,
  TransactionsParams,
} from './types';

const BASE_URL = 'https://api.sim.dune.com';
const BALANCES_ROUTE = 'v1/evm/balances';
const TRANSACTIONS_ROUTE = 'v1/evm/transactions';
const TOKEN_ROUTE = 'v1/evm/token-info';

const DUNE_API_KEY = process.env.DUNE_API_KEY;

const headers = {
  'X-Sim-Api-Key': DUNE_API_KEY || '',
};

const getBalanceQueryParams = (params: TokenBalancesParams): URLSearchParams => {
  const queryParams = new URLSearchParams();
  if (params.allChains) queryParams.append('all_chains', 'true');
  if (params.chainIds) queryParams.append('chain_ids', params.chainIds);
  if (params.excludeSpamTokens) queryParams.append('exclude_spam_tokens', 'true');
  if (params.filters) queryParams.append('filters', params.filters);
  if (params.offset) queryParams.append('offset', params.offset.toString());
  if (params.limit) queryParams.append('limit', params.limit.toString());
  if (params.metadata) queryParams.append('metadata', 'logo,url');
  return queryParams;
};

const getTransactionsQueryParams = (params: TransactionsParams): URLSearchParams => {
  const queryParams = new URLSearchParams();
  if (params.chainIds) queryParams.append('chain_ids', params.chainIds);
  if (params.offset) queryParams.append('offset', params.offset.toString());
  if (params.limit) queryParams.append('limit', params.limit.toString());
  if (params.method_id) queryParams.append('method_id', params.method_id);
  if (params.to) queryParams.append('to', params.to);
  if (params.decode) queryParams.append('decode', params.decode.toString());
  return queryParams;
};

const getTokenQueryParams = (params: TokenQueryParams): URLSearchParams => {
  const queryParams = new URLSearchParams();
  if (params.chainIds) queryParams.append('chain_ids', params.chainIds);
  if (params.offset) queryParams.append('offset', params.offset.toString());
  if (params.limit) queryParams.append('limit', params.limit.toString());
  return queryParams;
};

export async function duneFetchBalances(
  address: Address,
  params: TokenBalancesParams,
): Promise<BalanceData> {
  if (!DUNE_API_KEY) throw new Error('DUNE_API_KEY is not set');

  const queryParams = getBalanceQueryParams(params);

  const url = `${BASE_URL}/${BALANCES_ROUTE}/${address}?${queryParams.toString()}`;

  const response = await fetch(url, {
    method: 'GET',
    headers,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json() as Promise<BalanceData>;
}

export async function duneFetchTransactions(
  address: Address,
  params: TransactionsParams,
): Promise<TransactionData> {
  if (!DUNE_API_KEY) throw new Error('DUNE_API_KEY is not set');

  const queryParams = getTransactionsQueryParams(params);
  const url = `${BASE_URL}/${TRANSACTIONS_ROUTE}/${address}?${queryParams.toString()}`;

  const response = await fetch(url, {
    method: 'GET',
    headers,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json() as Promise<TransactionData>;
}

export async function duneFetchToken(
  address: Address,
  params: TokenQueryParams,
): Promise<TokenData> {
  if (!DUNE_API_KEY) throw new Error('DUNE_API_KEY is not set');

  const queryParams = getTokenQueryParams(params);
  const url = `${BASE_URL}/${TOKEN_ROUTE}/${address}?${queryParams.toString()}`;

  const response = await fetch(url, {
    method: 'GET',
    headers,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json() as Promise<TokenData>;
}

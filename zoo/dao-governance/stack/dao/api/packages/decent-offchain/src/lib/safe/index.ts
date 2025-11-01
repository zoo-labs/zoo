import { SupportedChainId } from 'sdk';
import { getAddress, decodeAbiParameters, parseAbiParameters } from 'viem';
import { ListResponse, SafeMultisigTransactionResponse } from './types';

const ADDRESS_MULTISIG_METADATA = '0xdA00000000000000000000000000000000000Da0';

const API_URL = (chainId: SupportedChainId) => {
  let chain = 'mainnet';
  if (chainId === 1) {
    chain = 'mainnet';
  } else if (chainId === 137) {
    chain = 'polygon';
  } else if (chainId === 8453) {
    chain = 'base';
  } else if (chainId === 10) {
    chain = 'optimism';
  } else {
    throw new Error(`Unsupported chainId: ${chainId}`);
  }
  return `https://safe-transaction-${chain}.safe.global/api/v2`;
};

export const getSafeTransactions = async (
  chainId: SupportedChainId,
  _address: string,
  since?: Date,
) => {
  const url = API_URL(chainId);
  const address = getAddress(_address);
  const params = new URLSearchParams({
    limit: '1000',
    submission_date__gte: since?.toISOString() || ''
  });

  const response = await fetch(
    `${url}/safes/${address}/multisig-transactions?${params.toString()}`,
  );
  const data = await response.json() as ListResponse<SafeMultisigTransactionResponse>;
  return data;
};

export const getCIDFromSafeTransaction = (tx: SafeMultisigTransactionResponse): string | null => {
  let cid: string | null = null;
  if (tx.dataDecoded?.method === 'multiSend') {
    tx.dataDecoded?.parameters.find(p => {
      p.valueDecoded?.find(v => {
        if (v.to === ADDRESS_MULTISIG_METADATA) {
          const data = v.data as `0x${string}`;
          [cid] = decodeAbiParameters(parseAbiParameters('string'), data);
          return true;
        }
      });
    });
  }
  return cid;
};

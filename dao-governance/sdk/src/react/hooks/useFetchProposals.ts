import { useContext, useQuery } from './imports';
import { SupportedChainId } from '../../core/types/Chains';
import { Proposal } from '../../core/types/Proposal';
import { Address } from '../../core/types/Common';
import { getAllProposals } from '../../core/fetch/proposal';
import { QueryReturn, TanstackQueryOptions } from '../types';
import { DAOApiContext } from '../contexts/DAOApiContext';
import { skipToken } from '@tanstack/react-query';

type FetchProposalsOptions = {
  chainId?: SupportedChainId;
  address?: Address;
}

type FetchProposalsParams = FetchProposalsOptions & TanstackQueryOptions;

/**
 * React hook to fetch all proposals for a specific DAO.
 *
 * @param {FetchProposalsParams} params - Object containing chainId and address.
 * @param {SupportedChainId} params.chainId - The EIP155 chain ID
 * @param {Address} params.address - The contract address of the DAO
 * @returns {QueryReturn<Proposal[]>} Object with { data: Proposal[], isLoading: boolean, error: Error | null }
 */
export const useFetchProposals = (params: FetchProposalsParams): QueryReturn<Proposal[]> => {
  const { chainId, address, enabled } = params;
  const { apiUrl } = useContext(DAOApiContext);

  const shouldFetch = !!(chainId && address) && enabled;

  const { data, error, isLoading } = useQuery({
    queryKey: ['proposals', chainId, address, apiUrl],
    queryFn: shouldFetch ? () => getAllProposals({ chainId, address, apiUrl }) : skipToken,
    initialData: [],
  });

  return { data, isLoading, error };
};

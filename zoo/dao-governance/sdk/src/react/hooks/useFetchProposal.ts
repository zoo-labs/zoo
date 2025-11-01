import { useContext, useQuery } from './imports';
import { SupportedChainId } from '../../core/types/Chains';
import { Proposal } from '../../core/types/Proposal';
import { Address } from '../../core/types/Common';
import { getProposal } from '../../core/fetch/proposal';
import { QueryReturn, TanstackQueryOptions } from '../types';
import { DAOApiContext } from '../contexts/DAOApiContext';
import { skipToken } from '@tanstack/react-query';

type FetchProposalOptions = {
  chainId?: SupportedChainId;
  address?: Address;
  slug?: string;
};

type FetchProposalParams = FetchProposalOptions & TanstackQueryOptions;

/**
 * React hook to fetch a specific proposal by its slug.
 *
 * @param {FetchProposalParams} params - Object containing chainId, address, and slug.
 * @param {SupportedChainId} params.chainId - The chain ID of the blockchain
 * @param {Address} params.address - The contract address of the proposal
 * @param {string} params.slug - Unique identifier for the specific proposal
 * @returns {QueryReturn<Proposal>} Object with { data: Proposal, isLoading: boolean, error: Error | null }
 */
export const useFetchProposal = (params: FetchProposalParams): QueryReturn<Proposal> => {
  const { chainId, address, slug, enabled } = params;
  const { apiUrl } = useContext(DAOApiContext);

  const shouldFetch = !!(chainId && address && slug) && enabled;

  const { data, error, isLoading } = useQuery({
    queryKey: ['proposal', chainId, address, slug, apiUrl],
    queryFn: shouldFetch ? () => getProposal({ chainId, address, slug, apiUrl }) : skipToken,
    initialData: {} as Proposal,
  });

  return { data, isLoading, error };
};

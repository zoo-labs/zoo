import { useContext, useQuery } from './imports';
import { SupportedChainId } from '../../core/types/Chains';
import { apiChains } from '../../core/fetch/meta';
import { QueryReturn, TanstackQueryOptions } from '../types';
import { DAOApiContext } from '../contexts/DAOApiContext';
import { skipToken } from '@tanstack/react-query';

type ApiChainsParams = TanstackQueryOptions;

/**
 * React hook to fetch the list of supported chains from the API.
 *
 * @returns {QueryReturn<SupportedChainId[]>} Object with { data: SupportedChainId[], loading: boolean, error: Error | null }
 */
export const useApiChains = (params: ApiChainsParams): QueryReturn<SupportedChainId[]> => {
  const { apiUrl } = useContext(DAOApiContext);
  const shouldFetch = params.enabled;
  const { data, error, isLoading } = useQuery({
    queryKey: ['chains', apiUrl],
    queryFn: shouldFetch ? () => apiChains({ apiUrl }) : skipToken,
    initialData: []
  });

  return { data, isLoading, error };
};

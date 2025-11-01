import { useContext, useQuery } from './imports';
import { Dao } from '../../core/types/Dao';
import { SupportedChainId } from '../../core/types/Chains';
import { getAllDaos } from '../../core/fetch/dao';
import { QueryReturn, TanstackQueryOptions } from '../types';
import { DAOApiContext } from '../contexts/DAOApiContext';
import { skipToken } from '@tanstack/react-query';

type FetchDaosOptions = {
  chainId?: SupportedChainId;
};

type FetchDaosParams = FetchDaosOptions & TanstackQueryOptions;

/**
 * React hook to fetch all DAOs.
 *
 * @param {FetchDaosParams} params - Optional parameters to filter DAOs by chainId.
 * @param {SupportedChainId} params.chainId - The EIP155 chain ID
 * @returns {QueryReturn<Dao[]>} Object with { data: Dao[], isLoading: boolean, error: Error | null }
 */
export const useFetchDaos = (params?: FetchDaosParams): QueryReturn<Dao[]> => {
  const { chainId, enabled } = params ?? {};
  const { apiUrl } = useContext(DAOApiContext);

  const shouldFetch = !!chainId && enabled;

  const { data, error, isLoading } = useQuery({
    queryKey: ['daos', chainId, apiUrl],
    queryFn: shouldFetch ? () => getAllDaos({ chainId, apiUrl }) : skipToken,
    initialData: [],
  });

  return { data, isLoading, error };
};

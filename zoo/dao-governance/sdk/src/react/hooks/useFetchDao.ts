import { useContext, useQuery } from './imports';
import { Dao } from '../../core/types/Dao';
import { Address } from '../../core/types/Common';
import { SupportedChainId } from '../../core/types/Chains';
import { getDao } from '../../core/fetch/dao';
import { QueryReturn, TanstackQueryOptions } from '../types';
import { DAOApiContext } from '../contexts/DAOApiContext';
import { skipToken } from '@tanstack/react-query';

type FetchDaoOptions = {
  chainId?: SupportedChainId;
  address?: Address;
};

type FetchDaoParams = FetchDaoOptions & TanstackQueryOptions

/**
 * React hook to fetch a specific DAO.
 *
 * @param {FetchDaoParams} params - Object containing chainId and address
 * @param {SupportedChainId} params.chainId - The EIP155 chain ID
 * @param {Address} params.address - The contract address of the DAO
 * @returns {QueryReturn<Dao>} Object with { data: Dao, isLoading: boolean, error: Error | null }
 */
export const useFetchDao = (params: FetchDaoParams): QueryReturn<Dao> => {
  const { chainId, address, enabled } = params;
  const { apiUrl } = useContext(DAOApiContext);

  const shouldFetch = !!(chainId && address) && enabled;

  const { data, error, isLoading } = useQuery({
    queryKey: ['dao', chainId, address, apiUrl],
    queryFn: shouldFetch ? () => getDao({ chainId, address, apiUrl }) : skipToken,
    initialData: {} as Dao,
  });

  return { data, isLoading, error };
};

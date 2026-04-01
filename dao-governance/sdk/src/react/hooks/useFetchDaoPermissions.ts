import { useContext, useQuery } from './imports';
import { Permissions } from '../../core/types/Api';
import { Address } from '../../core/types/Common';
import { SupportedChainId } from '../../core/types/Chains';
import { getDaoPermissions } from '../../core/fetch/dao';
import { QueryReturn, TanstackQueryOptions } from '../types';
import { DAOApiContext } from '../contexts/DAOApiContext';
import { skipToken } from '@tanstack/react-query';

type FetchDaoPermissionsOptions = {
  chainId?: SupportedChainId;
  address?: Address;
};

type FetchDaoPermissionsParams = FetchDaoPermissionsOptions & TanstackQueryOptions;

/**
 * React hook to fetch permissions for the current user within a specific DAO.
 *
 * @param {FetchDaoPermissionsParams} params - Object containing chainId and address
 * @param {SupportedChainId} params.chainId - The EIP155 chain ID
 * @param {Address} params.address - The contract address of the DAO
 * @returns {QueryReturn<Permissions>} Object with { data: Permissions, isLoading: boolean, error: Error | null }
 */
export const useFetchDaoPermissions = (params: FetchDaoPermissionsParams): QueryReturn<Permissions> => {
  const { chainId, address, enabled } = params;
  const { apiUrl } = useContext(DAOApiContext);
  const shouldFetch = !!(chainId && address) && enabled;

  const { data, error, isLoading } = useQuery({
    queryKey: ['daoPermissions', chainId, address, apiUrl],
    queryFn: shouldFetch ? async () => {
      const user = await getDaoPermissions({ chainId, address, apiUrl });
      return user.permissions as Permissions;
    } : skipToken,
    initialData: {} as Permissions,
  });

  return { data, isLoading, error };
};

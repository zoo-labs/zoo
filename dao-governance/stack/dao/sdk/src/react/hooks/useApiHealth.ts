import { useContext, useQuery } from './imports';
import { Health } from '../../core/types/Api';
import { apiHealth } from '../../core/fetch/meta';
import { QueryReturn, TanstackQueryOptions } from '../types';
import { DAOApiContext } from '../contexts/DAOApiContext';
import { skipToken } from '@tanstack/react-query';

type ApiHealthParams = TanstackQueryOptions;

/**
 * React hook to fetch API health status.
 *
 * @returns {QueryReturn<Health>} Object with { data: Health, loading: boolean, error: Error | null }
 */
export const useApiHealth = (params: ApiHealthParams): QueryReturn<Health> => {
  const { apiUrl } = useContext(DAOApiContext);
  const shouldFetch = params.enabled;
  const { data, error, isLoading } = useQuery({
    queryKey: ['health', apiUrl],
    queryFn: shouldFetch ? () => apiHealth({ apiUrl }) : skipToken,
    initialData: ''
  });

  return { data, isLoading, error };
};

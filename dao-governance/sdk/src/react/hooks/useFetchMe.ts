import { useContext, useQuery } from './imports';
import { User } from '../../core/types/Api';
import { me } from '../../core/fetch/auth';
import { QueryReturn, TanstackQueryOptions } from '../types';
import { DAOApiContext } from '../contexts/DAOApiContext';
import { skipToken } from '@tanstack/react-query';

type FetchMeParams = TanstackQueryOptions;

type FetchMeResult = QueryReturn<User> & {
  refetch: () => Promise<User | undefined>;
};

/**
 * React hook to fetch the currently authenticated user.
 *
 * @returns {FetchMeResult} Object with { data: User, isLoading: boolean, error: Error | null, refetch: Function }
 */
export const useFetchMe = (params: FetchMeParams): FetchMeResult => {
  const { apiUrl } = useContext(DAOApiContext);

  const shouldFetch = !!apiUrl && params.enabled;

  const { data, error, isLoading, refetch: queryRefetch } = useQuery({
    queryKey: ['me', apiUrl],
    queryFn: shouldFetch ? () => me({ apiUrl }) : skipToken,
    initialData: {} as User,
  });

  const refetch = async (): Promise<User | undefined> => {
    if (shouldFetch) {
      const result = await queryRefetch();
      return result.data;
    }
    return Promise.resolve(undefined);
  };

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};

import { ApiResponse } from '../../types/Api';
import { DEFAULT_API_URL } from './constants';
import { GenericFetchParams } from './params';

export const SessionIdKeyInLocalStorage = 'sessionId';

/**
 * Generic fetch function that handles API calls and error checking.
 * @param params - The parameters for the fetch request.
 * @param params.route - The API route to call.
 * @param params.options - Optional RequestInit options.
 * @param params.apiUrl - Optional API URL override.
 * @returns {Promise<T>} A promise with the data from the API response.
 * @throws {Error} Will throw an error if the API response indicates failure.
 */
export const genericFetchAndThrowIfError = async <T>(
  params: GenericFetchParams,
): Promise<T> => {
  const { route, options = {}, apiUrl = DEFAULT_API_URL } = params;
  const sessionId = localStorage.getItem(SessionIdKeyInLocalStorage);
  const defaultOptions: RequestInit = {
    credentials: 'include',
    ...options,
    headers: {
      ...(sessionId ? { Authorization: `Bearer ${sessionId}` } : {}),
      ...options.headers,
    },
  };
  const url = `${apiUrl}${route ? `/${route}` : ''}`;
  const response = await fetch(url, defaultOptions);

  const json = (await response.json()) as ApiResponse<T>;

  if (!json.success) {
    throw new Error(json.error?.message || 'Unknown API error');
  }

  return json.data as T;
};

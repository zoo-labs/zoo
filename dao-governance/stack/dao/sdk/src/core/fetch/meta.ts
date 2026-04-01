import { SupportedChainId } from '../types/Chains';
import { Health, Meta } from '../types/Api';
import { genericFetchAndThrowIfError } from './common/generic';
import { routes } from './common/routes';
import { BaseParams } from './common/params';

/**
 * Fetches API metadata information.
 * @param params - The parameters for fetching API info.
 * @param params.apiUrl - Optional API URL override.
 * @returns {Promise<Meta>} A promise with the API metadata.
 */
export const apiInfo = async (params?: BaseParams): Promise<Meta> => {
  const { apiUrl } = params ?? {};
  const response = await genericFetchAndThrowIfError<Meta>({
    route: `${routes.meta}`,
    apiUrl,
  });
  return response;
};

/**
 * Fetches API health status.
 * @param params - The parameters for fetching API health.
 * @param params.apiUrl - Optional API URL override.
 * @returns {Promise<Health>} A promise with the API health status.
 */
export const apiHealth = async (params?: BaseParams): Promise<Health> => {
  const { apiUrl } = params ?? {};
  const response = await genericFetchAndThrowIfError<Health>({
    route: routes.health,
    apiUrl,
  });
  return response;
};

/**
 * Fetches the list of supported chains from the API.
 * @param params - The parameters for fetching supported chains.
 * @param params.apiUrl - Optional API URL override.
 * @returns {Promise<SupportedChainId[]>} A promise with an array of supported chain IDs.
 */
export const apiChains = async (params?: BaseParams): Promise<SupportedChainId[]> => {
  const { apiUrl } = params ?? {};
  const response = await genericFetchAndThrowIfError<SupportedChainId[]>({
    route: routes.chains,
    apiUrl,
  });
  return response;
};

import { Dao } from '../types/Dao';
import { User } from '../types/Api';
import { genericFetchAndThrowIfError } from './common/generic';
import { routes } from './common/routes';
import { GetDaoParams, GetAllDaosFilterParams } from './common/params';

/**
 * Fetches information for a specific DAO.
 * @param params - The parameters for fetching DAO information.
 * @param params.chainId - The ID of the chain.
 * @param params.address - The address of the DAO.
 * @param params.apiUrl - Optional API URL override.
 * @returns {Promise<Dao>} A promise with the DAO information.
 */
export const getDao = async (params: GetDaoParams): Promise<Dao> => {
  const { chainId, address, apiUrl } = params;
  const dao = await genericFetchAndThrowIfError<Dao>({
    route: `${routes.dao}/${chainId}/${address}`,
    apiUrl,
  });
  return dao;
};

/**
 * Fetches all DAOs, optionally filtered by chain ID.
 * @param params - The parameters for fetching all DAOs.
 * @param params.chainId - Optional chain ID to filter by.
 * @param params.apiUrl - Optional API URL override.
 * @returns {Promise<Dao[]>} A promise with an array of DAOs.
 */
export const getAllDaos = async (params?: GetAllDaosFilterParams): Promise<Dao[]> => {
  const { chainId, apiUrl } = params ?? {};
  const daos = await genericFetchAndThrowIfError<Dao[]>({
    route: `${routes.dao}${chainId ? `${chainId}` : ''}`,
    apiUrl,
  });
  return daos;
};

/**
 * Fetches the permissions for the current user within a specific DAO.
 * @param params - The parameters for fetching DAO permissions.
 * @param params.chainId - The ID of the chain.
 * @param params.address - The address of the DAO.
 * @param params.apiUrl - Optional API URL override.
 * @returns {Promise<User>} A promise with the user's permissions in the DAO.
 */
export const getDaoPermissions = async (params: GetDaoParams): Promise<User> => {
  const { chainId, address, apiUrl } = params;
  const permissions = await genericFetchAndThrowIfError<User>({
    route: `${routes.dao}/${chainId}/${address}/me`,
    apiUrl,
  });
  return permissions;
};

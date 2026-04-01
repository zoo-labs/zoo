import { Logout, Nonce, User } from '../types/Api';
import {
  genericFetchAndThrowIfError,
  SessionIdKeyInLocalStorage,
} from './common/generic';
import { BaseParams, VerifySiweParams } from './common/params';
import { routes } from './common/routes';

/**
 * Fetches a nonce for signing messages.
 * @param params - The parameters for fetching the nonce.
 * @param params.apiUrl - Optional API URL override.
 * @returns {Promise<string>} A promise that resolves to a nonce string.
 */
export const getNonce = async (params?: BaseParams): Promise<string> => {
  const { apiUrl } = params ?? {};
  const response = await genericFetchAndThrowIfError<Nonce>({
    route: `${routes.auth}/nonce`,
    apiUrl,
  });
  localStorage.setItem(SessionIdKeyInLocalStorage, response.sessionId);
  return response.nonce;
};

/**
 * Verifies a signed message (e.g., SIWE) to authenticate the user.
 * @param params - The parameters for verification.
 * @param params.message - The message to verify.
 * @param params.signature - The signature to verify.
 * @param params.apiUrl - Optional API URL override.
 * @returns {Promise<User>} A promise with the authenticated user data.
 */
export const verify = async (params: VerifySiweParams): Promise<User> => {
  const { message, signature, apiUrl } = params;
  const response = await genericFetchAndThrowIfError<User>({
    route: `${routes.auth}/verify`,
    options: {
      method: 'POST',
      body: JSON.stringify({ message, signature }),
    },
    apiUrl,
  });
  return response;
};

/**
 * Fetches the currently authenticated user's information.
 * Requires a valid session/cookie.
 * @param params - The parameters for fetching the user data.
 * @param params.apiUrl - Optional API URL override.
 * @returns {Promise<User>} A promise with the authenticated user data.
 */
export const me = async (params?: BaseParams): Promise<User> => {
  const { apiUrl } = params ?? {};
  const response = await genericFetchAndThrowIfError<User>({
    route: `${routes.auth}/me`,
    apiUrl,
  });
  return response;
};

/**
 * Logs the current user out by clearing the session/cookie.
 * @param params - The parameters for logging out.
 * @param params.apiUrl - Optional API URL override.
 * @returns {Promise<Logout>} A promise with the "ok" message.
 */
export const logout = async (params?: BaseParams): Promise<Logout> => {
  const { apiUrl } = params ?? {};
  const response = await genericFetchAndThrowIfError<Logout>({
    route: `${routes.auth}/logout`,
    options: {
      method: 'POST',
    },
    apiUrl,
  });
  return response;
};

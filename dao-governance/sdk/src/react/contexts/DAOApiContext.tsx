import React, { createContext, PropsWithChildren } from 'react';
import { DEFAULT_API_URL } from '../../core/fetch/common/constants';

export type DAOApiContextData = {
  apiUrl: string;
};

export const DAOApiContext = createContext<DAOApiContextData>({
  apiUrl: DEFAULT_API_URL,
});

export function DAOApiProvider(
  { apiUrl = DEFAULT_API_URL, children }: PropsWithChildren<Partial<DAOApiContextData>>
) {
  return (
    <DAOApiContext.Provider value={{ apiUrl }}>
      {children}
    </DAOApiContext.Provider>
  );
}

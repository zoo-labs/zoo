import React, { createContext, FC, ReactNode, useState } from 'react'
import {
  ZooClientOptions,
  ZooClient,
  createClient,
} from '@zoolabs/sdk'
import { version } from '../package.json'
export interface ZooClientProviderProps {
  children: ReactNode
  options: ZooClientOptions
}

export const ZooClientContext = createContext<ZooClient | null>(
  null
)

export const ZooClientProvider: FC<ZooClientProviderProps> =
  function ({ children, options }: ZooClientProviderProps) {
    const [clientContext, _] = useState<ZooClient | null>(
      createClient({ ...options, uiVersion: version })
    )

    return (
      <ZooClientContext.Provider value={clientContext}>
        {children}
      </ZooClientContext.Provider>
    )
  }

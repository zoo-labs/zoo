import React, {
  createContext,
  FC,
  ReactNode,
  useEffect,
  useState,
  useRef,
  ComponentPropsWithoutRef,
  useCallback,
} from 'react'
import { ZooClientOptions } from '@zoolabs/sdk'
import { Theme, darkTheme } from './themes'
import { ZooClientProvider } from './ZooClientProvider'
import { SWRConfig } from 'swr'

type ZooProviderOptions = {
  disablePoweredByZoo?: boolean
}
export interface ZooProviderProps {
  children: ReactNode
  options?: ZooClientOptions & ZooProviderOptions
  theme?: Theme
  swrOptions?: ComponentPropsWithoutRef<typeof SWRConfig>['value']
}

import { createTheme, ThemeContext as stitchesThemeContext} from '../stitches.config'
import { swrDefaultOptions } from './lib/swr'

export const ThemeContext = createContext<undefined | stitchesThemeContext>(
  undefined
)
export const ProviderOptionsContext =
  createContext<ZooProviderOptions>({})

const defaultOptions = {
  chains: [{ baseApiUrl: 'https://api.reservoir.tools', id: 1, default: true }],
}

const classNameObserverOptions = {
  attributeFilter: ['class'],
}

import calendarCss from './styles/calendar'
import useMutationObservable from './hooks/useMutationObservable'

export const ZooProvider: FC<ZooProviderProps> = function ({
  children,
  options = defaultOptions,
  theme,
  swrOptions = {},
}: ZooProviderProps) {
  const [globalTheme, setGlobalTheme] = useState<
    undefined | stitchesThemeContext
  >()
  const [providerOptions, setProviderOptions] =
    useState<ZooProviderOptions>({})
  const currentTheme = useRef(null as any)
  const classNameCallback = useCallback(
    (mutationList: MutationRecord[]) => {
      mutationList.forEach((mutation) => {
        const body = mutation.target as HTMLBodyElement
        if (
          mutation.attributeName === 'class' &&
          body &&
          !body.className.includes(currentTheme.current)
        ) {
          document.body.classList.add(currentTheme.current)
        }
      })
    },
    [currentTheme]
  )

  useMutationObservable(
    classNameCallback,
    typeof window !== 'undefined' ? document.body : null,
    classNameObserverOptions
  )

  calendarCss()

  useEffect(() => {
    let newTheme = createTheme(theme ? (theme as any) : (darkTheme() as any))
    let oldTheme = currentTheme.current
    currentTheme.current = newTheme

    document.body.classList.add(newTheme)

    if (oldTheme) {
      document.body.classList.remove(oldTheme)
    }

    setGlobalTheme(newTheme as any)
  }, [JSON.stringify(theme)])

  useEffect(() => {
    setProviderOptions(options)
  }, [options])

  return (
    <ThemeContext.Provider value={globalTheme}>
      <ProviderOptionsContext.Provider value={providerOptions}>
        <ZooClientProvider options={options}>
          <SWRConfig value={{ ...swrDefaultOptions, ...swrOptions }}>
            {children}
          </SWRConfig>
        </ZooClientProvider>
      </ProviderOptionsContext.Provider>
    </ThemeContext.Provider>
  )
}

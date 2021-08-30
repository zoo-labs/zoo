import { AppDispatch, AppState } from '..'
<<<<<<< HEAD
import { BASES_TO_TRACK_LIQUIDITY_FOR, PINNED_PAIRS } from '../../config/routing'
=======
import { BASES_TO_TRACK_LIQUIDITY_FOR, PINNED_PAIRS } from '../../constants'
>>>>>>> acaaf34 (New app interface)
import { ChainId, FACTORY_ADDRESS, JSBI, Pair, Percent, Token, computePairAddress } from '@sushiswap/sdk'
import {
  SerializedPair,
  SerializedToken,
  addSerializedPair,
  addSerializedToken,
  removeSerializedToken,
  toggleURLWarning,
  updateUserArcherETHTip,
  updateUserArcherGasEstimate,
  updateUserArcherGasPrice,
  updateUserArcherTipManualOverride,
  updateUserArcherUseRelay,
  updateUserDarkMode,
  updateUserDeadline,
  updateUserExpertMode,
  updateUserSingleHopOnly,
  updateUserSlippageTolerance,
} from './actions'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { useAppDispatch, useAppSelector } from '../hooks'
import { useCallback, useMemo } from 'react'

<<<<<<< HEAD
import flatMap from 'lodash/flatMap'
import { useAllTokens } from '../../hooks/Tokens'
import { useWeb3React } from '@web3-react/core'
=======
import ReactGA from 'react-ga'
import flatMap from 'lodash/flatMap'
import { useActiveWeb3React } from '../../hooks/useActiveWeb3React'
import { useAllTokens } from '../../hooks/Tokens'
>>>>>>> acaaf34 (New app interface)

function serializeToken(token: Token): SerializedToken {
  return {
    chainId: token.chainId,
    address: token.address,
    decimals: token.decimals,
    symbol: token.symbol,
    name: token.name,
  }
}

function deserializeToken(serializedToken: SerializedToken): Token {
<<<<<<< HEAD
  return new Token(serializedToken.chainId, serializedToken.address, serializedToken.decimals, serializedToken.symbol, serializedToken.name)
=======
  return new Token(
    serializedToken.chainId,
    serializedToken.address,
    serializedToken.decimals,
    serializedToken.symbol,
    serializedToken.name
  )
>>>>>>> acaaf34 (New app interface)
}

export function useIsDarkMode(): boolean {
  const { userDarkMode, matchesDarkMode } = useAppSelector(
    ({ user: { matchesDarkMode, userDarkMode } }) => ({
      userDarkMode,
      matchesDarkMode,
    }),
<<<<<<< HEAD
    shallowEqual,
=======
    shallowEqual
>>>>>>> acaaf34 (New app interface)
  )

  return userDarkMode === null ? matchesDarkMode : userDarkMode
}

export function useDarkModeManager(): [boolean, () => void] {
  const dispatch = useAppDispatch()
  const darkMode = useIsDarkMode()

  const toggleSetDarkMode = useCallback(() => {
    dispatch(updateUserDarkMode({ userDarkMode: !darkMode }))
  }, [darkMode, dispatch])

  return [darkMode, toggleSetDarkMode]
}

export function useIsExpertMode(): boolean {
  return useAppSelector((state) => state.user.userExpertMode)
}

export function useExpertModeManager(): [boolean, () => void] {
  const dispatch = useAppDispatch()
  const expertMode = useIsExpertMode()

  const toggleSetExpertMode = useCallback(() => {
    dispatch(updateUserExpertMode({ userExpertMode: !expertMode }))
  }, [expertMode, dispatch])

  return [expertMode, toggleSetExpertMode]
}

export function useUserSingleHopOnly(): [boolean, (newSingleHopOnly: boolean) => void] {
  const dispatch = useAppDispatch()

  const singleHopOnly = useAppSelector((state) => state.user.userSingleHopOnly)

  const setSingleHopOnly = useCallback(
    (newSingleHopOnly: boolean) => {
<<<<<<< HEAD
      // ReactGA.event({
      //   category: 'Routing',
      //   action: newSingleHopOnly ? 'enable single hop' : 'disable single hop',
      // })
      dispatch(updateUserSingleHopOnly({ userSingleHopOnly: newSingleHopOnly }))
    },
    [dispatch],
=======
      ReactGA.event({
        category: 'Routing',
        action: newSingleHopOnly ? 'enable single hop' : 'disable single hop',
      })
      dispatch(updateUserSingleHopOnly({ userSingleHopOnly: newSingleHopOnly }))
    },
    [dispatch]
>>>>>>> acaaf34 (New app interface)
  )

  return [singleHopOnly, setSingleHopOnly]
}

export function useSetUserSlippageTolerance(): (slippageTolerance: Percent | 'auto') => void {
  const dispatch = useAppDispatch()

  return useCallback(
    (userSlippageTolerance: Percent | 'auto') => {
      let value: 'auto' | number
      try {
<<<<<<< HEAD
        value = userSlippageTolerance === 'auto' ? 'auto' : JSBI.toNumber(userSlippageTolerance.multiply(10_000).quotient)
=======
        value =
          userSlippageTolerance === 'auto' ? 'auto' : JSBI.toNumber(userSlippageTolerance.multiply(10_000).quotient)
>>>>>>> acaaf34 (New app interface)
      } catch (error) {
        value = 'auto'
      }
      dispatch(
        updateUserSlippageTolerance({
          userSlippageTolerance: value,
<<<<<<< HEAD
        }),
      )
    },
    [dispatch],
=======
        })
      )
    },
    [dispatch]
>>>>>>> acaaf34 (New app interface)
  )
}

/**
 * Return the user's slippage tolerance, from the redux store, and a function to update the slippage tolerance
 */
export function useUserSlippageTolerance(): Percent | 'auto' {
  const userSlippageTolerance = useAppSelector((state) => {
    return state.user.userSlippageTolerance
  })

<<<<<<< HEAD
  return useMemo(() => (userSlippageTolerance === 'auto' ? 'auto' : new Percent(userSlippageTolerance, 10_000)), [userSlippageTolerance])
=======
  return useMemo(
    () => (userSlippageTolerance === 'auto' ? 'auto' : new Percent(userSlippageTolerance, 10_000)),
    [userSlippageTolerance]
  )
>>>>>>> acaaf34 (New app interface)
}

export function useUserTransactionTTL(): [number, (slippage: number) => void] {
  const dispatch = useDispatch<AppDispatch>()
  const userDeadline = useSelector<AppState, AppState['user']['userDeadline']>((state) => {
    return state.user.userDeadline
  })

  const setUserDeadline = useCallback(
    (userDeadline: number) => {
      dispatch(updateUserDeadline({ userDeadline }))
    },
<<<<<<< HEAD
    [dispatch],
=======
    [dispatch]
>>>>>>> acaaf34 (New app interface)
  )

  return [userDeadline, setUserDeadline]
}

export function useAddUserToken(): (token: Token) => void {
  const dispatch = useDispatch<AppDispatch>()
  return useCallback(
    (token: Token) => {
      dispatch(addSerializedToken({ serializedToken: serializeToken(token) }))
    },
<<<<<<< HEAD
    [dispatch],
=======
    [dispatch]
>>>>>>> acaaf34 (New app interface)
  )
}

export function useRemoveUserAddedToken(): (chainId: number, address: string) => void {
  const dispatch = useAppDispatch()
  return useCallback(
    (chainId: number, address: string) => {
      dispatch(removeSerializedToken({ chainId, address }))
    },
<<<<<<< HEAD
    [dispatch],
=======
    [dispatch]
>>>>>>> acaaf34 (New app interface)
  )
}

export function useUserAddedTokens(): Token[] {
<<<<<<< HEAD
  const { chainId } = useWeb3React()
=======
  const { chainId } = useActiveWeb3React()
>>>>>>> acaaf34 (New app interface)
  const serializedTokensMap = useAppSelector(({ user: { tokens } }) => tokens)

  return useMemo(() => {
    if (!chainId) return []
    return Object.values(serializedTokensMap?.[chainId] ?? {}).map(deserializeToken)
  }, [serializedTokensMap, chainId])
}

function serializePair(pair: Pair): SerializedPair {
  return {
    token0: serializeToken(pair.token0),
    token1: serializeToken(pair.token1),
  }
}

export function usePairAdder(): (pair: Pair) => void {
  const dispatch = useAppDispatch()

  return useCallback(
    (pair: Pair) => {
      dispatch(addSerializedPair({ serializedPair: serializePair(pair) }))
    },
<<<<<<< HEAD
    [dispatch],
=======
    [dispatch]
>>>>>>> acaaf34 (New app interface)
  )
}

export function useURLWarningVisible(): boolean {
  return useAppSelector((state: AppState) => state.user.URLWarningVisible)
}

export function useURLWarningToggle(): () => void {
  const dispatch = useAppDispatch()
  return useCallback(() => dispatch(toggleURLWarning()), [dispatch])
}

/**
 * Given two tokens return the liquidity token that represents its liquidity shares
 * @param tokenA one of the two tokens
 * @param tokenB the other token
 */
export function toV2LiquidityToken([tokenA, tokenB]: [Token, Token]): Token {
  if (tokenA.chainId !== tokenB.chainId) throw new Error('Not matching chain IDs')
  if (tokenA.equals(tokenB)) throw new Error('Tokens cannot be equal')
  if (!FACTORY_ADDRESS[tokenA.chainId]) throw new Error('No V2 factory address on this chain')

<<<<<<< HEAD
  return new Token(tokenA.chainId, computePairAddress({ factoryAddress: FACTORY_ADDRESS[tokenA.chainId], tokenA, tokenB }), 18, 'UNI-V2', 'Uniswap V2')
=======
  return new Token(
    tokenA.chainId,
    computePairAddress({ factoryAddress: FACTORY_ADDRESS[tokenA.chainId], tokenA, tokenB }),
    18,
    'UNI-V2',
    'Uniswap V2'
  )
>>>>>>> acaaf34 (New app interface)
}

/**
 * Returns all the pairs of tokens that are tracked by the user for the current chain ID.
 */
export function useTrackedTokenPairs(): [Token, Token][] {
<<<<<<< HEAD
  const { chainId } = useWeb3React()
=======
  const { chainId } = useActiveWeb3React()
>>>>>>> acaaf34 (New app interface)
  const tokens = useAllTokens()

  // pinned pairs
  const pinnedPairs = useMemo(() => (chainId ? PINNED_PAIRS[chainId] ?? [] : []), [chainId])

  // pairs for every token against every base
  const generatedPairs: [Token, Token][] = useMemo(
    () =>
      chainId
        ? flatMap(Object.keys(tokens), (tokenAddress) => {
            const token = tokens[tokenAddress]
            // for each token on the current chain,
            return (
              // loop though all bases on the current chain
              (BASES_TO_TRACK_LIQUIDITY_FOR[chainId] ?? [])
                // to construct pairs of the given token with each base
                .map((base) => {
                  if (base.address === token.address) {
                    return null
                  } else {
                    return [base, token]
                  }
                })
                .filter((p): p is [Token, Token] => p !== null)
            )
          })
        : [],
<<<<<<< HEAD
    [tokens, chainId],
=======
    [tokens, chainId]
>>>>>>> acaaf34 (New app interface)
  )

  // pairs saved by users
  const savedSerializedPairs = useAppSelector(({ user: { pairs } }) => pairs)

  const userPairs: [Token, Token][] = useMemo(() => {
    if (!chainId || !savedSerializedPairs) return []
    const forChain = savedSerializedPairs[chainId]
    if (!forChain) return []

    return Object.keys(forChain).map((pairId) => {
      return [deserializeToken(forChain[pairId].token0), deserializeToken(forChain[pairId].token1)]
    })
  }, [savedSerializedPairs, chainId])

<<<<<<< HEAD
  const combinedList = useMemo(() => userPairs.concat(generatedPairs).concat(pinnedPairs), [generatedPairs, pinnedPairs, userPairs])
=======
  const combinedList = useMemo(
    () => userPairs.concat(generatedPairs).concat(pinnedPairs),
    [generatedPairs, pinnedPairs, userPairs]
  )
>>>>>>> acaaf34 (New app interface)

  return useMemo(() => {
    // dedupes pairs of tokens in the combined list
    const keyed = combinedList.reduce<{ [key: string]: [Token, Token] }>((memo, [tokenA, tokenB]) => {
      const sorted = tokenA.sortsBefore(tokenB)
      const key = sorted ? `${tokenA.address}:${tokenB.address}` : `${tokenB.address}:${tokenA.address}`
      if (memo[key]) return memo
      memo[key] = sorted ? [tokenA, tokenB] : [tokenB, tokenA]
      return memo
    }, {})

    return Object.keys(keyed).map((key) => keyed[key])
  }, [combinedList])
}

export function useUserArcherUseRelay(): [boolean, (newUseRelay: boolean) => void] {
  const dispatch = useAppDispatch()

<<<<<<< HEAD
  const useRelay = useSelector<AppState, AppState['user']['userArcherUseRelay']>((state) => state.user.userArcherUseRelay)
=======
  const useRelay = useSelector<AppState, AppState['user']['userArcherUseRelay']>(
    (state) => state.user.userArcherUseRelay
  )
>>>>>>> acaaf34 (New app interface)

  const setUseRelay = useCallback(
    (newUseRelay: boolean) => {
      dispatch(updateUserArcherUseRelay({ userArcherUseRelay: newUseRelay }))
    },
<<<<<<< HEAD
    [dispatch],
=======
    [dispatch]
>>>>>>> acaaf34 (New app interface)
  )

  return [useRelay, setUseRelay]
}

export function useUserArcherGasPrice(): [string, (newGasPrice: string) => void] {
  const dispatch = useAppDispatch()
  const userGasPrice = useSelector<AppState, AppState['user']['userArcherGasPrice']>((state) => {
    return state.user.userArcherGasPrice
  })

  const setUserGasPrice = useCallback(
    (newGasPrice: string) => {
      dispatch(updateUserArcherGasPrice({ userArcherGasPrice: newGasPrice }))
    },
<<<<<<< HEAD
    [dispatch],
=======
    [dispatch]
>>>>>>> acaaf34 (New app interface)
  )

  return [userGasPrice, setUserGasPrice]
}

export function useUserArcherETHTip(): [string, (newETHTip: string) => void] {
  const dispatch = useAppDispatch()
  const userETHTip = useSelector<AppState, AppState['user']['userArcherETHTip']>((state) => {
    return state.user.userArcherETHTip
  })

  const setUserETHTip = useCallback(
    (newETHTip: string) => {
      dispatch(updateUserArcherETHTip({ userArcherETHTip: newETHTip }))
    },
<<<<<<< HEAD
    [dispatch],
=======
    [dispatch]
>>>>>>> acaaf34 (New app interface)
  )

  return [userETHTip, setUserETHTip]
}

export function useUserArcherGasEstimate(): [string, (newGasEstimate: string) => void] {
  const dispatch = useAppDispatch()
  const userGasEstimate = useSelector<AppState, AppState['user']['userArcherGasEstimate']>((state) => {
    return state.user.userArcherGasEstimate
  })

  const setUserGasEstimate = useCallback(
    (newGasEstimate: string) => {
      dispatch(
        updateUserArcherGasEstimate({
          userArcherGasEstimate: newGasEstimate,
<<<<<<< HEAD
        }),
      )
    },
    [dispatch],
=======
        })
      )
    },
    [dispatch]
>>>>>>> acaaf34 (New app interface)
  )

  return [userGasEstimate, setUserGasEstimate]
}

export function useUserArcherTipManualOverride(): [boolean, (newManualOverride: boolean) => void] {
  const dispatch = useAppDispatch()
  const userTipManualOverride = useSelector<AppState, AppState['user']['userArcherTipManualOverride']>((state) => {
    return state.user.userArcherTipManualOverride
  })

  const setUserTipManualOverride = useCallback(
    (newManualOverride: boolean) => {
      dispatch(
        updateUserArcherTipManualOverride({
          userArcherTipManualOverride: newManualOverride,
<<<<<<< HEAD
        }),
      )
    },
    [dispatch],
=======
        })
      )
    },
    [dispatch]
>>>>>>> acaaf34 (New app interface)
  )

  return [userTipManualOverride, setUserTipManualOverride]
}

/**
 * Same as above but replaces the auto with a default value
 * @param defaultSlippageTolerance the default value to replace auto with
 */
export function useUserSlippageToleranceWithDefault(defaultSlippageTolerance: Percent): Percent {
  const allowedSlippage = useUserSlippageTolerance()
<<<<<<< HEAD
  return useMemo(() => (allowedSlippage === 'auto' ? defaultSlippageTolerance : allowedSlippage), [allowedSlippage, defaultSlippageTolerance])
=======
  return useMemo(
    () => (allowedSlippage === 'auto' ? defaultSlippageTolerance : allowedSlippage),
    [allowedSlippage, defaultSlippageTolerance]
  )
>>>>>>> acaaf34 (New app interface)
}

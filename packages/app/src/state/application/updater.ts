<<<<<<< HEAD
import { useWeb3React } from '@web3-react/core'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
=======
import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useActiveWeb3React } from '../../hooks/useActiveWeb3React'
>>>>>>> acaaf34 (New app interface)
import useDebounce from '../../hooks/useDebounce'
import useIsWindowVisible from '../../hooks/useIsWindowVisible'
import { updateBlockNumber } from './actions'

export default function Updater(): null {
<<<<<<< HEAD
  const { library, chainId } = useWeb3React()
=======
  const { library, chainId } = useActiveWeb3React()
>>>>>>> acaaf34 (New app interface)
  const dispatch = useDispatch()

  const windowVisible = useIsWindowVisible()

  const [state, setState] = useState<{
    chainId: number | undefined
    blockNumber: number | null
  }>({
    chainId,
    blockNumber: null,
  })

  const blockNumberCallback = useCallback(
    (blockNumber: number) => {
      setState((state) => {
        if (chainId === state.chainId) {
          if (typeof state.blockNumber !== 'number') return { chainId, blockNumber }
          return {
            chainId,
            blockNumber: Math.max(blockNumber, state.blockNumber),
          }
        }
        return state
      })
    },
<<<<<<< HEAD
    [chainId, setState],
=======
    [chainId, setState]
>>>>>>> acaaf34 (New app interface)
  )

  // attach/detach listeners
  useEffect(() => {
    if (!library || !chainId || !windowVisible) return undefined

    setState({ chainId, blockNumber: null })

    library
      .getBlockNumber()
      .then(blockNumberCallback)
      .catch((error) => console.error(`Failed to get block number for chainId: ${chainId}`, error))

    library.on('block', blockNumberCallback)
    return () => {
      library.removeListener('block', blockNumberCallback)
    }
  }, [dispatch, chainId, library, blockNumberCallback, windowVisible])

  const debouncedState = useDebounce(state, 100)

  useEffect(() => {
    if (!debouncedState.chainId || !debouncedState.blockNumber || !windowVisible) return
    dispatch(
      updateBlockNumber({
        chainId: debouncedState.chainId,
        blockNumber: debouncedState.blockNumber,
<<<<<<< HEAD
      }),
=======
      })
>>>>>>> acaaf34 (New app interface)
    )
  }, [windowVisible, dispatch, debouncedState.blockNumber, debouncedState.chainId])

  return null
}

'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { probe, readValidators, type Probe, type ValidatorSet } from './chain'

export type ChainState = { probe: Probe | null; validators: ValidatorSet | null }

const Ctx = createContext<ChainState>({ probe: null, validators: null })

/**
 * One poll for the whole app.
 *
 * The stats row, the block list and the transaction list all render the same
 * head. Letting each fetch its own would put three times the load on a public
 * endpoint AND allow them to disagree — the block list showing a block the
 * height tile had not reached yet. One read, one truth, shared.
 *
 * The interval is what makes a chain AT REST distinguishable from one that is
 * STUCK: a single sample cannot tell them apart, and a chain that wakes up
 * should be seen promptly rather than on the next navigation.
 *
 * The two legs are set independently, so a P-Chain flap cannot blank the
 * C-Chain figures. `null` means "not read yet" and becomes `pending`
 * downstream — it never becomes a zero.
 */
export function ChainProvider({ children, everyMs = 20_000 }: { children: ReactNode; everyMs?: number }) {
  const [state, setState] = useState<ChainState>({ probe: null, validators: null })

  useEffect(() => {
    let alive = true
    const read = () => {
      probe().then((p) => alive && setState((s) => ({ ...s, probe: p })))
      readValidators().then((v) => alive && setState((s) => ({ ...s, validators: v })))
    }
    read()
    const t = setInterval(read, everyMs)
    return () => {
      alive = false
      clearInterval(t)
    }
  }, [everyMs])

  return <Ctx.Provider value={state}>{children}</Ctx.Provider>
}

export const useChainState = (): ChainState => useContext(Ctx)

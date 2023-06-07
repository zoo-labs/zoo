import { ApprovalState, useActiveWeb3React, useInariContract } from '../../../hooks'
import { CurrencyAmount, Token } from '@zoolabs/zdk'
import useBentoMasterApproveCallback, { BentoMasterApproveCallback } from '../../../hooks/useBentoMasterApproveCallback'
import useTrait, { BaseTrait } from './useTrait'

import { BaseStrategyHook } from '../strategies/useBaseStrategy'
import { useCallback } from 'react'
import { useDerivedInariState } from '../hooks'
import { useTransactionAdder } from '../../transactions/hooks'

import { utils } from 'ethers'

type TraitConfig = {
  overrides?: string[];
};

const TRAIT_CONFIG: TraitConfig = {
  overrides: ['execute', 'approveCallback', 'bentoApproveCallback'],
}

export interface BaseStrategyWithBentoBoxTraitHook
  extends Omit<BaseStrategyHook, 'approveCallback' | 'bentoApproveCallback'>,
  BaseTrait {
  approveCallback: [ApprovalState, () => Promise<void>] | null
  bentoApproveCallback?: BentoMasterApproveCallback
  overrides: string[]
}

// Use this trait when strategies have BentoBox as their output.
// Strategies that end up in BentoBox don't need to to approve inari to spend tokens when unzapping
// hence the approveCallback is null when unzapping
const useBentoBoxTrait = (props: BaseStrategyHook): BaseStrategyWithBentoBoxTraitHook => {
  const trait = useTrait(props, TRAIT_CONFIG);
  //const trait = useTrait<BaseStrategyHook, BaseStrategyWithBentoBoxTraitHook>(props, TRAIT_CONFIG as BaseTraitConfig<BaseStrategyHook>);
  const { account } = useActiveWeb3React()
  const { zapIn } = useDerivedInariState()
  const addTransaction = useTransactionAdder()
  const inariContract = useInariContract()

  let bentoApproveCallback: any = null;

  if (inariContract) {
    bentoApproveCallback = useBentoMasterApproveCallback(inariContract.address, {
      otherBentoBoxContract: inariContract,
      contractName: 'Inari',
      functionFragment: 'setBentoApproval',
    })
  }

  // Batch execute with permit if one is provided or else execute normally
  const batchExecute = useCallback(
    async (val: CurrencyAmount<Token>) => {
      if (!inariContract) return

      const method = zapIn ? props.general.zapMethod : props.general.unzapMethod

      try {
        // If we have a permit, batch tx with permit
        if (bentoApproveCallback.permit) {
          const exactValue = val.toExact(); // Get the exact value as a string
          const valueWithDecimals = utils.parseUnits(exactValue, val.currency.decimals); // Convert to BigNumber

          const batch = [
            bentoApproveCallback.permit.data,
            inariContract?.interface?.encodeFunctionData(method, [
              account,
              valueWithDecimals,
            ]),
          ]

          const tx = await inariContract.batch(batch, true)
          addTransaction(tx, {
            summary: `Approve Inari Master Contract and ${zapIn ? 'Deposit' : 'Withdraw'} ${props.general.outputSymbol
              }`,
          })

          return tx
        }

        // Else proceed normally
        else return props.execute(val)
      } catch (error) {
        console.error(error)
      }
    },
    [account, addTransaction, bentoApproveCallback.permit, inariContract, props, zapIn]
  )

  // When we unzap from bentoBox we only need an EIP-712 permit,
  // so we don't have to check if we have approved inari to spend the token
  return {
    ...trait,
    execute: batchExecute,
    approveCallback: !zapIn ? null : props.approveCallback,
    bentoApproveCallback,
  }
}

export default useBentoBoxTrait

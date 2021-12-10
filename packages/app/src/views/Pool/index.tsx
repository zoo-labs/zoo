import { ChainId, CurrencyAmount, JSBI, NATIVE, Pair } from '@zoolabs/sdk'
import React, { useMemo } from 'react'
import { currencyId } from '../../functions'
import { toV2LiquidityToken, useTrackedTokenPairs } from '../../state/user/hooks'
import { MigrationSupported } from '../../functions/migration'
import FullPositionCard from './PositionCard'
import { Currency } from '@zoolabs/sdk'
import { useV2Pairs } from '../../hooks/useV2Pairs'
import { useWeb3React } from '@web3-react/core'
import { useHistory } from 'react-router-dom'
import { useETHBalances, useTokenBalancesWithLoadingIndicator } from 'hooks/useWallet'
import { Alert } from 'components'

export default function Pool() {
  const history = useHistory()
  const { account, chainId } = useWeb3React()

  // fetch the user's balances of all tracked V2 LP tokens
  const trackedTokenPairs = useTrackedTokenPairs()
  const tokenPairsWithLiquidityTokens = useMemo(
    () =>
      trackedTokenPairs.map((tokens) => ({
        liquidityToken: toV2LiquidityToken(tokens),
        tokens,
      })),
    [trackedTokenPairs],
  )
  const liquidityTokens = useMemo(() => tokenPairsWithLiquidityTokens.map((tpwlt) => tpwlt.liquidityToken), [tokenPairsWithLiquidityTokens])
  const [v2PairsBalances, fetchingV2PairBalances] = useTokenBalancesWithLoadingIndicator(account ?? undefined, liquidityTokens)

  // fetch the reserves for all V2 pools in which the user has a balance
  const liquidityTokensWithBalances = useMemo(
    () => tokenPairsWithLiquidityTokens.filter(({ liquidityToken }) => v2PairsBalances[liquidityToken.address]?.greaterThan('0')),
    [tokenPairsWithLiquidityTokens, v2PairsBalances],
  )

  const v2Pairs = useV2Pairs(liquidityTokensWithBalances.map(({ tokens }) => tokens))
  const v2IsLoading = fetchingV2PairBalances || v2Pairs?.length < liquidityTokensWithBalances.length || v2Pairs?.some((V2Pair) => !V2Pair)

  const allV2PairsWithLiquidity = v2Pairs.map(([, pair]) => pair).filter((v2Pair): v2Pair is Pair => Boolean(v2Pair))

  // TODO: Replicate this!
  // show liquidity even if its deposited in rewards contract
  // const stakingInfo = useStakingInfo()
  // const stakingInfosWithBalance = stakingInfo?.filter((pool) =>
  //   JSBI.greaterThan(pool.stakedAmount.quotient, BIG_INT_ZERO)
  // )
  // const stakingPairs = useV2Pairs(stakingInfosWithBalance?.map((stakingInfo) => stakingInfo.tokens))

  // // remove any pairs that also are included in pairs with stake in mining pool
  // const v2PairsWithoutStakedAmount = allV2PairsWithLiquidity.filter((v2Pair) => {
  //   return (
  //     stakingPairs
  //       ?.map((stakingPair) => stakingPair[1])
  //       .filter((stakingPair) => stakingPair?.liquidityToken.address === v2Pair.liquidityToken.address).length === 0
  //   )
  // })
  const migrationSupported = chainId in MigrationSupported
  return (
    <main className='flex flex-col items-center justify-start flex-grow w-full h-full'>
      <div id='pool-page' className='py-4 md:py-8 lg:py-12 max-w-2xl w-full'>
        <div className='p-4 mb-3 space-y-3'>
          <div onClick={() => history.goBack()}>
            <a className='flex items-center space-x-2 text-base text-center cursor-pointer font text-secondary hover:text-high-emphesis'>
              <svg xmlns='http://www.w3.org/2000/svg' className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M15 19l-7-7 7-7'></path>
              </svg>
              <span>Go Back</span>
            </a>
          </div>
          <h1 className='text-3xl font-medium currentColor'>My Liquidity Positions</h1>
        </div>
        <div className='block relative w-full rounded text-sm p-4 pr-10 bg-purple bg-opacity-20 text-high-emphesis'>
          <Alert title='Liquidity Provider Rewards' variant={'info'} onClick={() => null}>
            Liquidity providers earn a 0.25% fee on all trades proportional to their share of the pool. Fees are added to the pool, accrue in real time and can be claimed by
            withdrawing your liquidity
          </Alert>
        </div>

        <div className='p-4 space-y-4 rounded bg-dark-900'>
          <div className='grid grid-flow-row gap-3'>
            {!account ? (
              <div></div>
            ) : // <Web3Connect size='lg' color='blue' className='w-full' />
            v2IsLoading ? (
              <div className='flex flex-col justify-center items-center py-4 px-3 rounded min-h-empty'>
                <span className='after:inline-block dots after:animate-ellipsis after:w-4 after:text-left'>Loading</span>
              </div>
            ) : allV2PairsWithLiquidity?.length > 0 ? (
              <>
                {/* <div className="flex items-center justify-center">
                  <ExternalLink
                    href={"https://analytics.sushi.com/user/" + account}
                  >
                    Account analytics and accrued fees <span> ↗</span>
                  </ExternalLink>
                </div> */}
                {allV2PairsWithLiquidity.map((v2Pair) => (
                  <FullPositionCard key={v2Pair.liquidityToken.address} pair={v2Pair} stakedBalance={CurrencyAmount.fromRawAmount(v2Pair.liquidityToken, '0')} />
                ))}
              </>
            ) : (
              <div className='flex text-lg text-center text-low-emphesis'>
                <div className='px-4 py-2'>No liquidity was found.</div>
              </div>
            )}
            <div className={`grid gap-4 ${migrationSupported ? 'grid-cols-3' : 'grid-cols-2'} `}>
              <button
                id='add-pool-button'
                color='gradient'
                className='w-full text-high-emphesis bg-gradient-to-b from-blue-600 to-pink-600 opacity-80 hover:opacity-100 disabled:bg-opacity-80 px-4 py-3 text-base rounded disabled:cursor-not-allowed focus:outline-none grid items-center justify-center grid-flow-col gap-2 whitespace-nowrap'
                onClick={() => history.push(`/add/${currencyId(NATIVE[chainId])}`)}>
                Add
              </button>
              <button
                id='add-pool-button'
                color='gray'
                onClick={() => history.push(`/find`)}
                className='border rounded shadow-sm focus:ring-2 focus:ring-offset-2 bg-dark-700 bg-opacity-80 w-full text-primary border-dark-800 hover:bg-opacity-100 focus:ring-offset-dark-700 focus:ring-dark-800 disabled:bg-opacity-80 px-4 py-3 text-base rounded disabled:cursor-not-allowed focus:outline-none'>
                Import
              </button>

              {migrationSupported && (
                <button id='create-pool-button' color='gray' onClick={() => history.push(`/migrate`)}>
                  Migrate
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

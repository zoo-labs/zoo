import { ARCHER_ROUTER_ADDRESS, ChainId, Currency, CurrencyAmount, JSBI, Token, TradeType, Trade as V2Trade } from '@zoolabs/sdk'
import { ApprovalState, useApproveCallbackFromTrade } from '../../hooks/useApproveCallback'
// import { ArrowWrapper, div, SwapCallbackError } from '../../../features/exchange-v1/swap/styleds'
// import { div, div } from '../../../components/div'
// import div, { AutoColumn } from '../../../components/div'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
// import { UseERC20PermitState, useERC20PermitFromTrade } from '../../../hooks/useERC20Permit'
import { getToken, getDrop, getFaucet, getZooKeeper } from 'util/contracts'
import { useAllTokens, useCurrency } from '../../hooks/Tokens'
import { useDefaultsFromURLSearch, useDerivedSwapInfo, useSwapActionHandlers, useSwapState } from '../../state/swap/hooks'
import Lottie from 'lottie-react'
import {
  useExpertModeManager,
  useUserArcherETHTip,
  useUserArcherGasPrice,
  useUserArcherUseRelay,
  useUserSingleHopOnly,
  useUserSlippageTolerance,
  useUserTransactionTTL,
} from '../../state/user/hooks'
// import { useNetworkModalToggle, useToggleSettingsMenu, useWalletModalToggle } from '../../../state/application/hooks'
import useWrapCallback, { WrapType } from '../../hooks/useWrapCallback'

import { ARCHER_RELAY_URI } from '../../config/archer'
import AddressInputPanel from '../../components/AddressInputPanel'
// import { AdvancedSwapDetails } from '../../../features/exchange-v1/swap/AdvancedSwapDetails'
// import AdvancedSwapDetailsDropdown from '../../../features/exchange-v1/swap/AdvancedSwapDetailsDropdown'
// import Alert from '../../../components/Alert'
// import { ArrowDownIcon } from '@heroicons/react/outline'
// import div from '../../../components/div'
// import Container from '../../../components/Container'
import CurrencyInputPanel from '../../components/CurrencyInputPanel'
import DoubleGlowShadow from '../../components/DoubleGlowShadow'
import { Field } from '../../state/swap/actions'
import { INITIAL_ALLOWED_SLIPPAGE } from '../../constants'
import Loader from '../../components/Loader'
// import MinerTip from '../../../features/exchange-v1/swap/MinerTip'
import ProgressSteps from '../../components/ProgressSteps'
// import ReactGA from 'react-ga'
import SwapHeader from './Header'
// import TokenWarningModal from '../../../modals/TokenWarningModal'
import UnsupportedCurrencyFooter from './UnsupportedCurrencyFooter'
import { computeFiatValuePriceImpact } from '../../functions/trade'
import confirmPriceImpactWithoutFee from '../../functions/confirmPriceImpactWithoutFee'
import { maxAmountSpend } from '../../functions/currency'
import swapArrowsAnimationData from '../../assets/animations/swap-arrows.json'
// import { useActiveWeb3React } from '../../../hooks/useActiveWeb3React'
import useENSAddress from '../../hooks/useENSAddress'
import useIsArgentWallet from '../../hooks/useIsArgentWallet'
import { useIsSwapUnsupported } from '../../hooks/useIsSwapUnsupported'
import usePrevious from '../../hooks/usePrevious'
// import { useRouter } from 'next/router'
import { useSwapCallback } from '../../hooks/useSwapCallback'
import { useUSDCValue } from '../../hooks/useUSDCPrice'
import TradePrice from 'components/TradePrice'
import { useWeb3React } from '@web3-react/core'
import { AlertTriangle } from 'react-feather'
import { warningSeverity } from '../../functions/prices'
import { Alert } from 'components'
import ConfirmSwapModal from 'components/modals/ConfirmSwap'
import { useHistory } from 'react-router'
import NetworkGuard from 'components/guards/Network'

function Swap() {
  const loadedUrlParams = useDefaultsFromURLSearch()
  const history = useHistory()
  //   // token warning stuff
  const [loadedInputCurrency, loadedOutputCurrency] = [useCurrency(loadedUrlParams?.inputCurrencyId), useCurrency(loadedUrlParams?.outputCurrencyId)]

  const [dismissTokenWarning, setDismissTokenWarning] = useState<boolean>(false)
  const urlLoadedTokens: Token[] = useMemo(
    () => [loadedInputCurrency, loadedOutputCurrency]?.filter((c): c is Token => c?.isToken ?? false) ?? [],
    [loadedInputCurrency, loadedOutputCurrency],
  )
  const handleConfirmTokenWarning = useCallback(() => {
    setDismissTokenWarning(true)
  }, [])

  //   // dismiss warning if all imported tokens are in active lists
  //   const defaultTokens = useAllTokens()
  //   const importTokensNotInDefault =
  //     urlLoadedTokens &&
  //     urlLoadedTokens.filter((token: Token) => {
  //       return !Boolean(token.address in defaultTokens)
  //     })

  const { account, chainId } = useWeb3React()

  //   const toggleNetworkModal = useNetworkModalToggle()

  //   const router = useRouter()

  //   // toggle wallet when disconnected
  //   const toggleWalletModal = useWalletModalToggle()

  //   // for expert mode
  const [isExpertMode] = useExpertModeManager()
  //   const toggleSettings = useToggleSettingsMenu()

  //   // get custom setting values for user
  const [ttl] = useUserTransactionTTL()
  const [useArcher] = useUserArcherUseRelay()
  const [archerETHTip] = useUserArcherETHTip()
  //   const [archerGasPrice] = useUserArcherGasPrice()

  // archer
  const archerRelay = chainId ? ARCHER_RELAY_URI?.[chainId] : undefined
  const doArcher = archerRelay !== undefined && useArcher

  //   // swap state
  const { independentField, typedValue, recipient } = useSwapState()
  const { v2Trade, currencyBalances, parsedAmount, currencies, inputError: swapInputError, allowedSlippage } = useDerivedSwapInfo(doArcher)
  const { wrapType, execute: onWrap, inputError: wrapInputError } = useWrapCallback(currencies[Field.INPUT], currencies[Field.OUTPUT], typedValue)
  const showWrap: boolean = wrapType !== WrapType.NOT_APPLICABLE
  const { address: recipientAddress } = useENSAddress(recipient)

  const trade = showWrap ? undefined : v2Trade

  const parsedAmounts = useMemo(
    () =>
      showWrap
        ? {
            [Field.INPUT]: parsedAmount,
            [Field.OUTPUT]: parsedAmount,
          }
        : {
            [Field.INPUT]: independentField === Field.INPUT ? parsedAmount : trade?.inputAmount,
            [Field.OUTPUT]: independentField === Field.OUTPUT ? parsedAmount : trade?.outputAmount,
          },
    [independentField, parsedAmount, showWrap, trade],
  )

  const fiatValueInput = useUSDCValue(parsedAmounts[Field.INPUT])
  const fiatValueOutput = useUSDCValue(parsedAmounts[Field.OUTPUT])
  const priceImpact = computeFiatValuePriceImpact(fiatValueInput, fiatValueOutput)

  const { onSwitchTokens, onCurrencySelection, onUserInput, onChangeRecipient } = useSwapActionHandlers()

  const isValid = !swapInputError

  const dependentField: Field = independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT

  const handleTypeInput = useCallback(
    (value: string) => {
      onUserInput(Field.INPUT, value)
    },
    [onUserInput],
  )

  const handleTypeOutput = useCallback(
    (value: string) => {
      onUserInput(Field.OUTPUT, value)
    },
    [onUserInput],
  )

  //   // reset if they close warning without tokens in params
  //   const handleDismissTokenWarning = useCallback(() => {
  //     setDismissTokenWarning(true)
  //     router.push('/swap/')
  //   }, [router])

  // modal and loading
  const [{ showConfirm, tradeToConfirm, swapErrorMessage, attemptingTxn, txHash }, setSwapState] = useState<{
    showConfirm: boolean
    tradeToConfirm: V2Trade<Currency, Currency, TradeType> | undefined
    attemptingTxn: boolean
    swapErrorMessage: string | undefined
    txHash: string | undefined
  }>({
    showConfirm: false,
    tradeToConfirm: undefined,
    attemptingTxn: false,
    swapErrorMessage: undefined,
    txHash: undefined,
  })

  const formattedAmounts = {
    [independentField]: typedValue,
    [dependentField]: typedValue,
    // [dependentField]: showWrap ? parsedAmounts[independentField]?.toExact() ?? '' : parsedAmounts[dependentField]?.toSignificant(6) ?? '',
  }

  const userHasSpecifiedInputOutput = Boolean(currencies[Field.INPUT] && currencies[Field.OUTPUT] && parsedAmounts[independentField]?.greaterThan(JSBI.BigInt(0)))

  const routeNotFound = !trade?.route
  //   // check whether the user has approved the router on the input token
  const [approvalState, approveCallback] = useApproveCallbackFromTrade(trade, allowedSlippage, doArcher)

  const signatureData = undefined

  //   // const {
  //   //   state: signatureState,
  //   //   signatureData,
  //   //   gatherPermitSignature,
  //   // } = useERC20PermitFromTrade(trade, allowedSlippage)

  const handleApprove = useCallback(async () => {
    await approveCallback()
    // if (signatureState === UseERC20PermitState.NOT_SIGNED && gatherPermitSignature) {
    //   try {
    //     await gatherPermitSignature()
    //   } catch (error) {
    //     // try to approve if gatherPermitSignature failed for any reason other than the user rejecting it
    //     if (error?.code !== 4001) {
    //       await approveCallback()
    //     }
    //   }
    // } else {
    //   await approveCallback()
    // }
  }, [approveCallback])
  // }, [approveCallback, gatherPermitSignature, signatureState])

  //   // check if user has gone through approval process, used to show two step buttons, reset on token change
  const [approvalSubmitted, setApprovalSubmitted] = useState<boolean>(false)

  //   // mark when a user has submitted an approval, reset onTokenSelection for input field
  //   useEffect(() => {
  //     if (approvalState === ApprovalState.PENDING) {
  //       setApprovalSubmitted(true)
  //     }
  //   }, [approvalState, approvalSubmitted])

  const maxInputAmount: CurrencyAmount<Currency> | undefined = maxAmountSpend(currencyBalances[Field.INPUT])
  const showMaxButton = Boolean(maxInputAmount?.greaterThan(0) && !parsedAmounts[Field.INPUT]?.equalTo(maxInputAmount))

  //   // the callback to execute the swap
  const { callback: swapCallback, error: swapCallbackError } = useSwapCallback(trade, allowedSlippage, recipient, signatureData, doArcher ? ttl : undefined)

  const [singleHopOnly] = useUserSingleHopOnly()

  const handleSwap = useCallback(() => {
    if (!swapCallback) {
      return
    }
    if (priceImpact && !confirmPriceImpactWithoutFee(priceImpact)) {
      return
    }
    setSwapState({
      attemptingTxn: true,
      tradeToConfirm,
      showConfirm,
      swapErrorMessage: undefined,
      txHash: undefined,
    })
    swapCallback()
      .then((hash) => {
        setSwapState({
          attemptingTxn: false,
          tradeToConfirm,
          showConfirm,
          swapErrorMessage: undefined,
          txHash: hash,
        })

        // ReactGA.event({
        //   category: 'Swap',
        //   action: recipient === null ? 'Swap w/o Send' : (recipientAddress ?? recipient) === account ? 'Swap w/o Send + recipient' : 'Swap w/ Send',
        //   label: [trade?.inputAmount?.currency?.symbol, trade?.outputAmount?.currency?.symbol, singleHopOnly ? 'SH' : 'MH'].join('/'),
        // })

        // ReactGA.event({
        //   category: 'Routing',
        //   action: singleHopOnly ? 'Swap with multihop disabled' : 'Swap with multihop enabled',
        // })
      })
      .catch((error) => {
        setSwapState({
          attemptingTxn: false,
          tradeToConfirm,
          showConfirm,
          swapErrorMessage: error.message,
          txHash: undefined,
        })
      })
  }, [
    swapCallback,
    priceImpact,
    tradeToConfirm,
    showConfirm,
    recipient,
    recipientAddress,
    account,
    trade?.inputAmount?.currency?.symbol,
    trade?.outputAmount?.currency?.symbol,
    singleHopOnly,
  ])

  //   // errors
  const [showInverted, setShowInverted] = useState<boolean>(false)

  // warnings on slippage
  // const priceImpactSeverity = warningSeverity(priceImpactWithoutFee);
  const priceImpactSeverity = useMemo(() => {
    const executionPriceImpact = trade?.priceImpact
    return warningSeverity(
      executionPriceImpact && priceImpact ? (executionPriceImpact.greaterThan(priceImpact) ? executionPriceImpact : priceImpact) : executionPriceImpact ?? priceImpact,
    )
  }, [priceImpact, trade])

  const isArgentWallet = useIsArgentWallet()

  //   // show approve flow when: no error on inputs, not approved or pending, or approved in current session
  //   // never show if price impact is above threshold in non expert mode
  const showApproveFlow =
    !isArgentWallet &&
    !swapInputError &&
    (approvalState === ApprovalState.NOT_APPROVED || approvalState === ApprovalState.PENDING || (approvalSubmitted && approvalState === ApprovalState.APPROVED)) &&
    !(priceImpactSeverity > 3 && !isExpertMode)

  const handleConfirmDismiss = useCallback(() => {
    setSwapState({
      showConfirm: false,
      tradeToConfirm,
      attemptingTxn,
      swapErrorMessage,
      txHash,
    })
    // if there was a tx hash, we want to clear the input
    if (txHash) {
      onUserInput(Field.INPUT, '')
    }
  }, [attemptingTxn, onUserInput, swapErrorMessage, tradeToConfirm, txHash])

  const handleAcceptChanges = useCallback(() => {
    setSwapState({
      tradeToConfirm: trade,
      swapErrorMessage,
      txHash,
      attemptingTxn,
      showConfirm,
    })
  }, [attemptingTxn, showConfirm, swapErrorMessage, trade, txHash])

  const handleInputSelect = useCallback(
    (inputCurrency) => {
      setApprovalSubmitted(false) // reset 2 step UI for approvals
      onCurrencySelection(Field.INPUT, inputCurrency)
    },
    [onCurrencySelection],
  )

  const handleMaxInput = useCallback(() => {
    maxInputAmount && onUserInput(Field.INPUT, maxInputAmount.toExact())
  }, [maxInputAmount, onUserInput])

  const handleOutputSelect = useCallback((outputCurrency) => onCurrencySelection(Field.OUTPUT, outputCurrency), [onCurrencySelection])

  //   // useEffect(() => {
  //   //   if (
  //   //     doArcher &&
  //   //     parsedAmounts[Field.INPUT] &&
  //   //     maxAmountInput &&
  //   //     parsedAmounts[Field.INPUT]?.greaterThan(maxAmountInput)
  //   //   ) {
  //   //     handleMaxInput();
  //   //   }
  //   // }, [handleMaxInput, parsedAmounts, maxAmountInput, doArcher]);

  const swapIsUnsupported = useIsSwapUnsupported(currencies?.INPUT, currencies?.OUTPUT)

  //   const priceImpactTooHigh = priceImpactSeverity > 3 && !isExpertMode

  const [animateSwapArrows, setAnimateSwapArrows] = useState<boolean>(false)

  const previousChainId = usePrevious<ChainId>(chainId)

  // useEffect(() => {
  //   if (
  //     previousChainId &&
  //     previousChainId !== chainId &&
  //     history.location.pathname.includes(Currency.getNativeCurrencySymbol(previousChainId))
  //   ) {
  //     history.push(`/swap/${Currency.getNativeCurrencySymbol(chainId)}`);
  //   }
  // }, [chainId, previousChainId, history]);
  useEffect(() => {
    // console.log('chainIdsssssssss', chainId)
    if (chainId === 56) {
      handleOutputSelect({
        _checksummedAddress: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
        _tags: null,
        isNative: false,
        isToken: true,
        address: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
        chainId: 56,
        decimals: 18,
        logoURI: window.location.origin + '/static/images/networks.eth.jpg',
        name: 'Ethereum',
        symbol: 'ETH',
      })
    } else if (chainId === 97) {
      handleOutputSelect({
        _checksummedAddress: '0x337610d27c682E347C9cD60BD4b3b107C9d34dDd',
        _tags: null,
        isNative: false,
        isToken: true,
        address: '0x337610d27c682E347C9cD60BD4b3b107C9d34dDd',
        chainId: 97,
        decimals: 18,
        logoURI: 'https://raw.githubusercontent.com/sushiswap/art/master/sushi/logo-256x256.png',
        name: 'USDT Token',
        symbol: 'USDT',
      })
    } else {
      handleOutputSelect({
        chainId: 1,
        decimals: 6,
        symbol: 'USDT',
        name: 'Tether USD',
        isNative: false,
        isToken: true,
        address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      })
    }
  }, [chainId])
  return (
    <>
      <main className='flex flex-col items-center justify-start flex-grow w-full h-full'>
        <div id='swap-page' className='py-4 md:py-8 lg:py-12 max-w-2xl w-full'>
          <head>
            <title>ZOO</title>
            <meta key='description' name='description' content='ZooSwap allows for swapping of ERC20 compatible tokens across multiple networks' />
          </head>

          <DoubleGlowShadow>
            <div className='p-4 space-y-4 rounded-2xl bg-dark-900 z-1'>
              <SwapHeader input={currencies[Field.INPUT]} output={currencies[Field.OUTPUT]} allowedSlippage={allowedSlippage} />

              <ConfirmSwapModal
                isOpen={showConfirm}
                trade={trade}
                originalTrade={tradeToConfirm}
                onAcceptChanges={handleAcceptChanges}
                attemptingTxn={attemptingTxn}
                txHash={txHash}
                recipient={recipient}
                allowedSlippage={allowedSlippage}
                onConfirm={handleSwap}
                swapErrorMessage={swapErrorMessage}
                onDismiss={handleConfirmDismiss}
                minerBribe={doArcher ? archerETHTip : undefined}
              />
              <div>
                <CurrencyInputPanel
                  // priceImpact={priceImpact}
                  // label={independentField === Field.OUTPUT && !showWrap ? `Swap From (est.):` : `Swap From:`}
                  label={
                    currencies[Field.INPUT] &&
                    (currencies[Field.INPUT].chainId !== 1
                      ? currencies[Field.INPUT].isNative
                        ? `Withdraw from BSC`
                        : `Withdraw from ETH`
                      : currencies[Field.INPUT].isNative
                      ? `Withdraw from ETH`
                      : `Withdraw from BSC`)
                  }
                  value={formattedAmounts[Field.INPUT]}
                  showMaxButton={showMaxButton}
                  currency={currencies[Field.INPUT]}
                  onUserInput={handleTypeInput}
                  onMax={handleMaxInput}
                  fiatValue={fiatValueInput ?? undefined}
                  onCurrencySelect={handleInputSelect}
                  otherCurrency={currencies[Field.OUTPUT]}
                  showCommonBases={true}
                  id='swap-currency-input'
                />
                <div className='grid py-3'>
                  <div className={`${isExpertMode ? 'justify-between' : 'flex-start'} px-4 flex-wrap w-full flex`}>
                    <button
                      className='z-10 -mt-6 -mb-6 rounded-full'
                      onClick={() => {
                        setApprovalSubmitted(false) // reset 2 step UI for approvals
                        onSwitchTokens()
                      }}>
                      <div className='rounded-full bg-dark-900 p-1'>
                        <div
                          className='p-3 rounded-full bg-dark-800 hover:bg-dark-700'
                          onMouseEnter={() => setAnimateSwapArrows(true)}
                          onMouseLeave={() => setAnimateSwapArrows(false)}>
                          <Lottie animationData={swapArrowsAnimationData} autoplay={animateSwapArrows} loop={false} style={{ width: 32, height: 32 }} />
                        </div>
                      </div>
                    </button>
                    {isExpertMode ? (
                      recipient === null && !showWrap ? (
                        <button id='add-recipient-button' onClick={() => onChangeRecipient('')}>
                          + Add recipient (optional)
                        </button>
                      ) : (
                        <button id='remove-recipient-button' onClick={() => onChangeRecipient(null)}>
                          - Remove recipient
                        </button>
                      )
                    ) : null}
                  </div>
                </div>

                <div>
                  <CurrencyInputPanel
                    value={formattedAmounts[Field.OUTPUT]}
                    onUserInput={handleTypeOutput}
                    label={
                      currencies[Field.OUTPUT] &&
                      (currencies[Field.OUTPUT].chainId !== 1
                        ? currencies[Field.OUTPUT].isNative
                          ? `Deposit to BSC`
                          : `Deposit to ETH`
                        : currencies[Field.OUTPUT].isNative
                        ? `Deposit to ETH`
                        : `Deposit to BSC`)
                    }
                    // label={independentField === Field.INPUT && !showWrap ? `Swap To (eth):` : `Swap To:`}
                    showMaxButton={showMaxButton}
                    hideBalance={false}
                    fiatValue={fiatValueOutput ?? undefined}
                    priceImpact={priceImpact}
                    currency={currencies[Field.OUTPUT]}
                    onCurrencySelect={handleOutputSelect}
                    otherCurrency={currencies[Field.INPUT]}
                    showCommonBases={true}
                    id='swap-currency-output'
                  />
                  {Boolean(trade) && (
                    <div className='p-1 -mt-2 cursor-pointer rounded-b-md bg-dark-800'>
                      <TradePrice price={trade?.executionPrice} showInverted={showInverted} setShowInverted={setShowInverted} className='bg-dark-900' />
                    </div>
                  )}
                </div>
              </div>

              {recipient !== null && !showWrap && (
                <>
                  <AddressInputPanel id='recipient' value={recipient} onChange={onChangeRecipient} />
                  {recipient !== account && (
                    <Alert title='' variant='warning'>
                      <h4>Please note that the recipient address is different from the connected wallet address.</h4>
                    </Alert>
                  )}
                </>
              )}

              {/* {showWrap ? null : (
              <div
                style={{
                  padding: showWrap ? '.25rem 1rem 0 1rem' : '0px',
                }}
              >
                <div className="px-5 mt-1">{doArcher && userHasSpecifiedInputOutput && <MinerTip />}</div>
              </div>
            )} */}
              {/*
            {trade && (
              <div className="p-5 rounded bg-dark-800">
                <AdvancedSwapDetails trade={trade} allowedSlippage={allowedSlippage} />
              </div>
            )} */}

              <div className='mt-1'>
                <button
                  className='border rounded shadow-sm focus:ring-2 focus:ring-offset-2 bg-dark-700 bg-opacity-80 w-full text-primary border-dark-800 hover:bg-opacity-100 focus:ring-offset-dark-700 focus:ring-dark-800 disabled:bg-opacity-80 px-6 py-4 text-base rounded disabled:cursor-not-allowed focus:outline-none'
                  onClick={() => {
                    if (isExpertMode) {
                      handleSwap()
                    } else {
                      setSwapState({
                        tradeToConfirm: trade,
                        attemptingTxn: false,
                        swapErrorMessage: undefined,
                        showConfirm: true,
                        txHash: undefined,
                      })
                    }
                  }}
                  id='swap-button'
                  disabled={!isValid || (priceImpactSeverity > 3 && !isExpertMode) || !!swapCallbackError}
                  // error={isValid && priceImpactSeverity > 2 && !swapCallbackError}
                >
                  {swapInputError ? swapInputError : 'Bridge Locked'}
                </button>
                {/* {swapIsUnsupported ? (
                  <button
                    className='border rounded shadow-sm focus:ring-2 focus:ring-offset-2 bg-dark-700 bg-opacity-80 w-full text-primary border-dark-800 hover:bg-opacity-100 focus:ring-offset-dark-700 focus:ring-dark-800 disabled:bg-opacity-80 px-6 py-4 text-base rounded disabled:cursor-not-allowed focus:outline-none'
                    disabled>
                    Unsupported Asset
                  </button>
                ) : !account ? (
                  // <Web3Connect size='lg' color='blue' className='w-full' />
                  <div className='border rounded shadow-sm focus:ring-2 focus:ring-offset-2 bg-dark-700 bg-opacity-80 w-full text-primary border-dark-800 hover:bg-opacity-100 focus:ring-offset-dark-700 focus:ring-dark-800 disabled:bg-opacity-80 px-6 py-4 text-base rounded disabled:cursor-not-allowed focus:outline-none'>
                    Show web connect here{' '}
                  </div>
                ) : showWrap ? (
                  <button
                    className='border rounded shadow-sm focus:ring-2 focus:ring-offset-2 bg-dark-700 bg-opacity-80 w-full text-primary border-dark-800 hover:bg-opacity-100 focus:ring-offset-dark-700 focus:ring-dark-800 disabled:bg-opacity-80 px-6 py-4 text-base rounded disabled:cursor-not-allowed focus:outline-none'
                    disabled={Boolean(wrapInputError)}
                    onClick={onWrap}>
                    {wrapInputError ?? (wrapType === WrapType.WRAP ? `Wrap` : wrapType === WrapType.UNWRAP ? `Unwrap` : null)}
                  </button>
                ) : routeNotFound && userHasSpecifiedInputOutput ? (
                  <div style={{ textAlign: 'center' }}>
                    <div className='mb-1'>Insufficient liquidity for this trade</div>
                    {singleHopOnly && <div className='mb-1'>Try enabling multi-hop trades</div>}
                  </div>
                ) : showApproveFlow ? (
                  <div>
                    {approvalState !== ApprovalState.APPROVED && (
                      <button onClick={handleApprove} disabled={approvalState !== ApprovalState.NOT_APPROVED || approvalSubmitted}>
                        {approvalState === ApprovalState.PENDING ? (
                          <div className='flex items-center justify-center h-full space-x-2'>
                            <div>Approving</div>
                            <Loader stroke='white' />
                          </div>
                        ) : (
                          `Approve ${currencies[Field.INPUT]?.symbol}`
                        )}
                      </button>
                    )}
                    {approvalState === ApprovalState.APPROVED && (
                      <button
                        onClick={() => {
                          if (isExpertMode) {
                            handleSwap()
                          } else {
                            setSwapState({
                              tradeToConfirm: trade,
                              attemptingTxn: false,
                              swapErrorMessage: undefined,
                              showConfirm: true,
                              txHash: undefined,
                            })
                          }
                        }}
                        style={{
                          width: '100%',
                        }}
                        id='swap-button'
                        disabled={!isValid || approvalState !== ApprovalState.APPROVED || (priceImpactSeverity > 3 && !isExpertMode)}
                        // error={isValid && priceImpactSeverity > 2}
                      >
                        {priceImpactSeverity > 3 && !isExpertMode ? `Price Impact High` : priceImpactSeverity > 2 ? `Swap Anyway` : `Swap`}
                      </button>
                    )}
                  </div>
                ) : (
                  <button
                    className='border rounded shadow-sm focus:ring-2 focus:ring-offset-2 bg-dark-700 bg-opacity-80 w-full text-primary border-dark-800 hover:bg-opacity-100 focus:ring-offset-dark-700 focus:ring-dark-800 disabled:bg-opacity-80 px-6 py-4 text-base rounded disabled:cursor-not-allowed focus:outline-none'
                    onClick={() => {
                      if (isExpertMode) {
                        handleSwap()
                      } else {
                        setSwapState({
                          tradeToConfirm: trade,
                          attemptingTxn: false,
                          swapErrorMessage: undefined,
                          showConfirm: true,
                          txHash: undefined,
                        })
                      }
                    }}
                    id='swap-button'
                    disabled={!isValid || (priceImpactSeverity > 3 && !isExpertMode) || !!swapCallbackError}
                    // error={isValid && priceImpactSeverity > 2 && !swapCallbackError}
                  >
                    {swapInputError ? swapInputError : priceImpactSeverity > 3 && !isExpertMode ? 'Price Impact Too High' : priceImpactSeverity > 2 ? 'Swap Anyway' : 'Swap'}
                  </button>
                )} */}
                {showApproveFlow && (
                  <div style={{ marginTop: '1rem' }}>
                    <ProgressSteps steps={[approvalState === ApprovalState.APPROVED]} />
                  </div>
                )}
                {isExpertMode && swapErrorMessage ? (
                  <div className='flex items-center justify-center pt-6 text-red'>
                    <AlertTriangle size={16} />
                    <div className='ml-4 text-sm'>{swapErrorMessage}</div>
                  </div>
                ) : null}
              </div>

              {/* {!swapIsUnsupported ? (
          <AdvancedSwapDetailsDropdown trade={trade} />
        ) : (
          <UnsupportedCurrencyFooter
            show={swapIsUnsupported}
            currencies={[currencies.INPUT, currencies.OUTPUT]}
          />
        )} */}

              {!swapIsUnsupported ? null : <UnsupportedCurrencyFooter show={swapIsUnsupported} currencies={[currencies.INPUT, currencies.OUTPUT]} />}
            </div>
          </DoubleGlowShadow>
        </div>
      </main>
      {/* <NetworkGuard /> */}
    </>
  )
}
export default Swap

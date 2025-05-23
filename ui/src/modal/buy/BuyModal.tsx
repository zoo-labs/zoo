import React, { Dispatch, ReactElement, SetStateAction, useEffect } from 'react'
import { useCopyToClipboard, useFallbackState } from '../../hooks'
import {
  Flex,
  Box,
  Text,
  Input,
  Anchor,
  Button,
  FormatCurrency,
  FormatCryptoCurrency,
  Loader,
} from '../../primitives'
import Progress from '../Progress'
import Popover from '../../primitives/Popover'
import { Modal } from '../Modal'
import {
  faCopy,
  faCircleExclamation,
  faCheckCircle,
  faExchange,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TokenLineItem from '../TokenLineItem'
import { BuyModalRenderer, BuyStep, BuyModalStepData } from './BuyModalRenderer'
import { Execute } from '@reservoir0x/reservoir-sdk'
import ProgressBar from '../ProgressBar'
import { useNetwork } from 'wagmi'
import QuantitySelector from '../QuantitySelector'
import { formatNumber } from '../../lib/numbers'

type PurchaseData = {
  tokenId?: string
  collectionId?: string
  maker?: string
  steps?: Execute['steps']
}

const ModalCopy = {
  titleInsufficientFunds: 'Add Funds',
  titleUnavilable: 'Selected item is no longer Available',
  titleDefault: 'Complete Checkout',
  ctaClose: 'Close',
  ctaCheckout: 'Checkout',
  ctaInsufficientFunds: 'Add Funds',
  ctaGoToToken: '',
  ctaAwaitingValidation: 'Waiting for transaction to be validated',
  ctaAwaitingApproval: 'Waiting for approval...',
  ctaCopyAddress: 'Copy Wallet Address',
}

type Props = Pick<Parameters<typeof Modal>['0'], 'trigger'> & {
  openState?: [boolean, Dispatch<SetStateAction<boolean>>]
  tokenId?: string
  collectionId?: string
  orderId?: string
  feesOnTopBps?: string[] | null
  feesOnTopFixed?: string[] | null
  normalizeRoyalties?: boolean
  copyOverrides?: Partial<typeof ModalCopy>
  onGoToToken?: () => any
  onPurchaseComplete?: (data: PurchaseData) => void
  onPurchaseError?: (error: Error, data: PurchaseData) => void
  onClose?: (
    data: PurchaseData,
    stepData: BuyModalStepData | null,
    currentStep: BuyStep
  ) => void
}

function titleForStep(step: BuyStep, copy: typeof ModalCopy) {
  switch (step) {
    case BuyStep.AddFunds:
      return copy.titleInsufficientFunds
    case BuyStep.Unavailable:
      return copy.titleUnavilable
    default:
      return copy.titleDefault
  }
}

export function BuyModal({
  openState,
  trigger,
  tokenId,
  collectionId,
  orderId,
  feesOnTopBps,
  feesOnTopFixed,
  normalizeRoyalties,
  copyOverrides,
  onPurchaseComplete,
  onPurchaseError,
  onClose,
  onGoToToken,
}: Props): ReactElement {
  const copy: typeof ModalCopy = { ...ModalCopy, ...copyOverrides }
  const [open, setOpen] = useFallbackState(
    openState ? openState[0] : false,
    openState
  )
  const { copy: copyToClipboard, copied } = useCopyToClipboard()
  const { chain: activeChain } = useNetwork()

  return (
    <BuyModalRenderer
      open={open}
      tokenId={tokenId}
      collectionId={collectionId}
      orderId={orderId}
      feesOnTopBps={feesOnTopBps}
      feesOnTopFixed={feesOnTopFixed}
      normalizeRoyalties={normalizeRoyalties}
    >
      {({
        loading,
        token,
        collection,
        quantityAvailable,
        quantity,
        averageUnitPrice,
        currency,
        mixedCurrencies,
        totalPrice,
        feeOnTop,
        buyStep,
        transactionError,
        hasEnoughCurrency,
        steps,
        stepData,
        feeUsd,
        totalUsd,
        usdPrice,
        balance,
        address,
        blockExplorerBaseUrl,
        setQuantity,
        setBuyStep,
        buyToken,
      }) => {
        const title = titleForStep(buyStep, copy)

        useEffect(() => {
          if (buyStep === BuyStep.Complete && onPurchaseComplete) {
            const data: PurchaseData = {
              tokenId: tokenId,
              collectionId: collectionId,
              maker: address,
            }
            if (steps) {
              data.steps = steps
            }
            onPurchaseComplete(data)
          }
        }, [buyStep])

        useEffect(() => {
          if (transactionError && onPurchaseError) {
            const data: PurchaseData = {
              tokenId: tokenId,
              collectionId: collectionId,
              maker: address,
            }
            onPurchaseError(transactionError, data)
          }
        }, [transactionError])

        const executableSteps =
          steps?.filter((step) => step.items && step.items.length > 0) || []
        const lastStepItems =
          executableSteps[executableSteps.length - 1]?.items || []

        const purchaseTxHashes =
          stepData?.currentStep?.items?.reduce((txHashes, item) => {
            item.salesData?.forEach((saleData) => {
              if (saleData.txHash) {
                txHashes.add(saleData.txHash)
              }
            })
            return txHashes
          }, new Set<string>()) || []

        const totalPurchases = Array.from(purchaseTxHashes).length

        const failedPurchases =
          totalPurchases - (stepData?.currentStep?.items?.length || 0)

        const successfulPurchases = totalPurchases - failedPurchases
        const finalTxHash = lastStepItems[lastStepItems.length - 1]?.txHash

        const price =
          totalPrice || token?.token?.lastSale?.price?.amount?.decimal || 0

        return (
          <Modal
            trigger={trigger}
            title={title}
            onBack={
              buyStep == BuyStep.AddFunds
                ? () => {
                    setBuyStep(BuyStep.Checkout)
                  }
                : null
            }
            open={open}
            onOpenChange={(open) => {
              if (!open && onClose) {
                const data: PurchaseData = {
                  tokenId: tokenId,
                  collectionId: collectionId,
                  maker: address,
                }
                onClose(data, stepData, buyStep)
              }
              setOpen(open)
            }}
            loading={loading}
          >
            {buyStep === BuyStep.Unavailable && !loading && (
              <Flex direction="column">
                <TokenLineItem
                  tokenDetails={token}
                  collection={collection}
                  usdConversion={usdPrice || 0}
                  isUnavailable={true}
                  price={quantity > 1 ? averageUnitPrice : price}
                  currency={currency}
                  priceSubtitle={quantity > 1 ? 'Average Price' : undefined}
                  showRoyalties={true}
                />
                <Button
                  onClick={() => {
                    setOpen(false)
                  }}
                  css={{ m: '$4' }}
                >
                  {copy.ctaClose}
                </Button>
              </Flex>
            )}

            {buyStep === BuyStep.Checkout && !loading && (
              <Flex direction="column">
                {transactionError && (
                  <Flex
                    css={{
                      color: '$errorAccent',
                      p: '$4',
                      gap: '$2',
                      background: '$wellBackground',
                    }}
                    align="center"
                  >
                    <FontAwesomeIcon
                      icon={faCircleExclamation}
                      width={16}
                      height={16}
                    />
                    <Text style="body3" color="errorLight">
                      {transactionError.message}
                    </Text>
                  </Flex>
                )}
                {mixedCurrencies && (
                  <Flex
                    css={{
                      color: '$errorAccent',
                      p: '$4',
                      gap: '$2',
                      background: '$wellBackground',
                    }}
                    align="center"
                  >
                    <FontAwesomeIcon
                      icon={faCircleExclamation}
                      width={16}
                      height={16}
                    />
                    <Text style="body3" color="errorLight">
                      Mixed currency listings are only available to checkout
                      with {currency?.symbol || 'ETH'}.
                    </Text>
                  </Flex>
                )}
                <TokenLineItem
                  tokenDetails={token}
                  collection={collection}
                  usdConversion={usdPrice || 0}
                  price={quantity > 1 ? averageUnitPrice : price}
                  currency={currency}
                  css={{ border: 0 }}
                  priceSubtitle={quantity > 1 ? 'Average Price' : undefined}
                  showRoyalties={true}
                />
                {quantityAvailable > 1 && (
                  <Flex
                    css={{ p: '$4', borderBottom: '1px solid $borderColor' }}
                    justify="between"
                  >
                    <Flex direction="column" css={{ gap: '$1' }}>
                      <Text style="body3">Quantity</Text>
                      <Text style="body3" color="subtle">
                        {formatNumber(quantityAvailable)} items available
                      </Text>
                    </Flex>
                    <QuantitySelector
                      min={1}
                      max={quantityAvailable}
                      quantity={quantity}
                      setQuantity={(quantity) => {
                        setQuantity(quantity)
                      }}
                    />
                  </Flex>
                )}
                {feeOnTop > 0 && (
                  <>
                    <Flex
                      align="center"
                      justify="between"
                      css={{ pt: '$4', px: '$4' }}
                    >
                      <Text style="subtitle2">Referral Fee</Text>
                      <FormatCryptoCurrency
                        amount={feeOnTop}
                        address={currency?.contract}
                        decimals={currency?.decimals}
                        symbol={currency?.symbol}
                      />
                    </Flex>
                    <Flex justify="end">
                      <FormatCurrency
                        amount={feeUsd}
                        color="subtle"
                        css={{ pr: '$4' }}
                      />
                    </Flex>
                  </>
                )}

                <Flex
                  align="center"
                  justify="between"
                  css={{ pt: '$4', px: '$4' }}
                >
                  <Text style="h6">Total</Text>
                  <FormatCryptoCurrency
                    textStyle="h6"
                    amount={totalPrice}
                    address={currency?.contract}
                    decimals={currency?.decimals}
                    symbol={currency?.symbol}
                  />
                </Flex>
                <Flex justify="end">
                  <FormatCurrency
                    amount={totalUsd}
                    color="subtle"
                    css={{ mr: '$4' }}
                  />
                </Flex>

                <Box css={{ p: '$4', width: '100%' }}>
                  {hasEnoughCurrency ? (
                    <Button
                      onClick={buyToken}
                      css={{ width: '100%' }}
                      color="primary"
                    >
                      {copy.ctaCheckout}
                    </Button>
                  ) : (
                    <Flex direction="column" align="center">
                      <Flex align="center" css={{ mb: '$3' }}>
                        <Text css={{ mr: '$3' }} color="error" style="body3">
                          Insufficient Balance
                        </Text>

                        <FormatCryptoCurrency
                          amount={balance}
                          address={currency?.contract}
                          decimals={currency?.decimals}
                          symbol={currency?.symbol}
                          textStyle="body3"
                        />
                      </Flex>

                      <Button
                        onClick={() => {
                          setBuyStep(BuyStep.AddFunds)
                        }}
                        css={{ width: '100%' }}
                      >
                        {copy.ctaInsufficientFunds}
                      </Button>
                    </Flex>
                  )}
                </Box>
              </Flex>
            )}

            {buyStep === BuyStep.Approving && token && (
              <Flex direction="column">
                <TokenLineItem
                  tokenDetails={token}
                  collection={collection}
                  usdConversion={usdPrice || 0}
                  price={quantity > 1 ? averageUnitPrice : price}
                  currency={currency}
                  priceSubtitle={quantity > 1 ? 'Average Price' : undefined}
                  quantity={quantity}
                />
                {stepData && stepData.totalSteps > 1 && (
                  <ProgressBar
                    css={{ px: '$4', mt: '$3' }}
                    value={stepData?.stepProgress || 0}
                    max={stepData?.totalSteps || 0}
                  />
                )}
                {!stepData && <Loader css={{ height: 206 }} />}
                {stepData && (
                  <Progress
                    title={stepData?.currentStep.action || ''}
                    txHash={stepData?.currentStepItem.txHash}
                    blockExplorerBaseUrl={`${blockExplorerBaseUrl}/tx/${stepData?.currentStepItem.txHash}`}
                  />
                )}
                <Button disabled={true} css={{ m: '$4' }}>
                  <Loader />
                  {stepData?.currentStepItem.txHash
                    ? copy.ctaAwaitingValidation
                    : copy.ctaAwaitingApproval}
                </Button>
              </Flex>
            )}

            {buyStep === BuyStep.Complete && token && (
              <Flex direction="column">
                <Flex
                  css={{
                    p: '$4',
                    py: '$5',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  {totalPurchases === 1 ? (
                    <>
                      <Text
                        style="h5"
                        css={{ textAlign: 'center', mt: 24, mb: 24 }}
                      >
                        Congratulations!
                      </Text>
                    </>
                  ) : (
                    <>
                      <Box
                        css={{
                          color: failedPurchases
                            ? '$errorAccent'
                            : '$successAccent',
                        }}
                      >
                        <FontAwesomeIcon
                          icon={
                            failedPurchases
                              ? faCircleExclamation
                              : faCheckCircle
                          }
                          fontSize={32}
                        />
                      </Box>
                      <Text
                        style="h5"
                        css={{ textAlign: 'center', mt: 24, mb: 24 }}
                      >
                        {failedPurchases
                          ? `${successfulPurchases} ${
                              successfulPurchases > 1 ? 'items' : 'item'
                            } purchased, ${failedPurchases} ${
                              failedPurchases > 1 ? 'items' : 'item'
                            } failed`
                          : 'Congrats! Purchase was successful.'}
                      </Text>
                    </>
                  )}
                  {totalPurchases === 1 && (
                    <img
                      src={token?.token?.imageSmall}
                      style={{ width: 100, height: 100 }}
                    />
                  )}
                  {totalPurchases > 1 && (
                    <Flex direction="column" css={{ gap: '$2' }}>
                      {stepData?.currentStep.items?.map((item) => {
                        const txHash = item.txHash
                          ? `${item.txHash.slice(0, 4)}...${item.txHash.slice(
                              -4
                            )}`
                          : ''
                        return (
                          <Anchor
                            href={`${blockExplorerBaseUrl}/tx/${item?.txHash}`}
                            color="primary"
                            weight="medium"
                            target="_blank"
                            css={{ fontSize: 12 }}
                          >
                            View transaction: {txHash}
                          </Anchor>
                        )
                      })}
                    </Flex>
                  )}

                  {totalPurchases === 1 && (
                    <>
                      <Flex
                        css={{ mb: 24, mt: 24, maxWidth: '100%' }}
                        align="center"
                        justify="center"
                      >
                        {!!token.token?.collection?.image && (
                          <Box css={{ mr: '$1' }}>
                            <img
                              src={token.token?.collection?.image}
                              style={{
                                width: 24,
                                height: 24,
                                borderRadius: '50%',
                              }}
                            />
                          </Box>
                        )}
                        <Text
                          style="subtitle2"
                          css={{ maxWidth: '100%' }}
                          ellipsify
                        >
                          {token?.token?.name
                            ? token?.token?.name
                            : `#${token?.token?.tokenId}`}
                        </Text>
                      </Flex>
                      <Flex css={{ mb: '$2' }} align="center">
                        <Box css={{ color: '$successAccent', mr: '$2' }}>
                          <FontAwesomeIcon icon={faCheckCircle} />
                        </Box>
                        <Text style="body1">
                          Your transaction went through successfully
                        </Text>
                      </Flex>
                      <Anchor
                        color="primary"
                        weight="medium"
                        css={{ fontSize: 12 }}
                        href={`${blockExplorerBaseUrl}/tx/${finalTxHash}`}
                        target="_blank"
                      >
                        View on{' '}
                        {activeChain?.blockExplorers?.default.name ||
                          'Etherscan'}
                      </Anchor>
                    </>
                  )}
                </Flex>
                <Flex
                  css={{
                    p: '$4',
                    flexDirection: 'column',
                    gap: '$3',
                    '@bp1': {
                      flexDirection: 'row',
                    },
                  }}
                >
                  {!!onGoToToken ? (
                    <>
                      <Button
                        onClick={() => {
                          setOpen(false)
                        }}
                        css={{ flex: 1 }}
                        color="ghost"
                      >
                        {copy.ctaClose}
                      </Button>
                      <Button
                        style={{ flex: 1 }}
                        color="primary"
                        onClick={() => {
                          onGoToToken()
                        }}
                      >
                        {copy.ctaGoToToken.length > 0
                          ? copy.ctaGoToToken
                          : `Go to ${
                              successfulPurchases > 1 ? 'Tokens' : 'Token'
                            }`}
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={() => {
                        setOpen(false)
                      }}
                      style={{ flex: 1 }}
                      color="primary"
                    >
                      {copy.ctaClose}
                    </Button>
                  )}
                </Flex>
              </Flex>
            )}

            {buyStep === BuyStep.AddFunds && token && (
              <Flex direction="column">
                <Flex
                  css={{
                    p: '$4',
                    py: '$5',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <Box css={{ color: '$neutralText' }}>
                    <FontAwesomeIcon
                      icon={faExchange}
                      style={{
                        width: '32px',
                        height: '32px',
                        margin: '12px 0px',
                      }}
                    />
                  </Box>
                  <Text style="subtitle1" css={{ my: 24 }}>
                    <Popover
                      content={
                        <Text style={'body3'}>
                          Trade one crypto for another on a crypto exchange.
                          Popular decentralized exchanges include{' '}
                          <Anchor
                            css={{ fontSize: 12 }}
                            href="https://app.uniswap.org/"
                            target="_blank"
                            color="primary"
                          >
                            Uniswap
                          </Anchor>
                          ,{' '}
                          <Anchor
                            css={{ fontSize: 12 }}
                            href="https://app.sushi.com/"
                            target="_blank"
                            color="primary"
                          >
                            SushiSwap
                          </Anchor>{' '}
                          and many others.
                        </Text>
                      }
                    >
                      <Text as="span" color="accent">
                        Exchange currencies
                      </Text>
                    </Popover>{' '}
                    or transfer funds to your
                    <br /> wallet address below:
                  </Text>
                  <Box css={{ width: '100%', position: 'relative' }}>
                    <Flex
                      css={{
                        pointerEvents: 'none',
                        opacity: copied ? 1 : 0,
                        position: 'absolute',
                        inset: 0,
                        borderRadius: 8,
                        transition: 'all 200ms ease-in-out',
                        pl: '$4',
                        alignItems: 'center',
                        zIndex: 3,
                        textAlign: 'left',
                        background: '$neutralBg',
                      }}
                    >
                      <Text style={'body1'}>Copied Address!</Text>
                    </Flex>
                    <Input
                      readOnly
                      onClick={() => copyToClipboard(address as string)}
                      value={address || ''}
                      css={{
                        color: '$neutralText',
                        textAlign: 'left',
                      }}
                    />
                    <Box
                      css={{
                        position: 'absolute',
                        right: '$3',
                        top: '50%',
                        touchEvents: 'none',
                        transform: 'translateY(-50%)',
                        color: '$neutralText',
                        pointerEvents: 'none',
                      }}
                    >
                      <FontAwesomeIcon icon={faCopy} width={16} height={16} />
                    </Box>
                  </Box>
                </Flex>
                <Button
                  css={{ m: '$4' }}
                  color="primary"
                  onClick={() => copyToClipboard(address as string)}
                >
                  {copy.ctaCopyAddress}
                </Button>
              </Flex>
            )}
          </Modal>
        )
      }}
    </BuyModalRenderer>
  )
}

BuyModal.Custom = BuyModalRenderer

import { Currency } from '@sushiswap/sdk'
import React, { FunctionComponent, useMemo } from 'react'
import { ChainID } from '../../constants/chains'

import Logo from '../Logo'
import { WrappedTokenInfo } from '../../state/lists/wrappedTokenInfo'
import useHttpLocations from '../../hooks/useHttpLocations'
import { WNATIVE } from '@sushiswap/sdk'

const BLOCKCHAIN = {
  [ChainID.MAINNET]: 'ethereum',
  [ChainID.BSC]: 'binanace',
  [ChainID.CELO]: 'celo',
  [ChainID.FANTOM]: 'fantom',
  [ChainID.HARMONY]: 'harmony',
  [ChainID.MATIC]: 'polygon',
  [ChainID.XDAI]: 'xdai',
  [ChainID.OKEX]: 'okex',
}

function getCurrencySymbol(currency) {
  if (currency.symbol === 'WBTC') {
    return 'btc'
  }
  if (currency.symbol === 'WETH') {
    return 'eth'
  }
  return currency.symbol.toLowerCase()
}

export function getCurrencyLogoUrls(currency) {
  const urls = []

  urls.push(`https://raw.githubusercontent.com/sushiswap/icons/master/token/${getCurrencySymbol(currency)}.jpg`)
  if (currency.chainId in BLOCKCHAIN) {
    urls.push(`https://raw.githubusercontent.com/sushiswap/assets/master/blockchains/${BLOCKCHAIN[currency.chainId]}/assets/${currency.address}/logo.png`)
    urls.push(`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/${BLOCKCHAIN[currency.chainId]}/assets/${currency.address}/logo.png`)
  }

  return urls
}

const AvalancheLogo = 'https://raw.githubusercontent.com/sushiswap/icons/master/token/avax.jpg'
const BinanceCoinLogo = 'https://raw.githubusercontent.com/sushiswap/icons/master/token/bnb.jpg'
const EthereumLogo = 'https://raw.githubusercontent.com/sushiswap/icons/master/token/eth.jpg'
const FantomLogo = 'https://raw.githubusercontent.com/sushiswap/icons/master/token/ftm.jpg'
const HarmonyLogo = 'https://raw.githubusercontent.com/sushiswap/icons/master/token/one.jpg'
const HecoLogo = 'https://raw.githubusercontent.com/sushiswap/icons/master/token/heco.jpg'
const MaticLogo = 'https://raw.githubusercontent.com/sushiswap/icons/master/token/polygon.jpg'
const MoonbeamLogo = 'https://raw.githubusercontent.com/sushiswap/icons/master/token/eth.jpg'
const OKExLogo = 'https://raw.githubusercontent.com/sushiswap/icons/master/token/okt.jpg'
const xDaiLogo = 'https://raw.githubusercontent.com/sushiswap/assets/master/blockchains/xdai/assets/0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d/logo.png'
const CeloLogo = 'https://raw.githubusercontent.com/sushiswap/icons/master/token/celo.jpg'
const PalmLogo = 'https://raw.githubusercontent.com/sushiswap/icons/master/token/palm.jpg'

const LOGO: { readonly [id in ChainID]?: string } = {
  [ChainID.MAINNET]: EthereumLogo,
  [ChainID.FANTOM]: FantomLogo,
  [ChainID.FANTOM_TESTNET]: FantomLogo,
  [ChainID.MATIC]: MaticLogo,
  [ChainID.MATIC_TESTNET]: MaticLogo,
  [ChainID.XDAI]: xDaiLogo,
  [ChainID.BSC]: BinanceCoinLogo,
  [ChainID.BSC_TESTNET]: BinanceCoinLogo,
  [ChainID.MOONBEAM_TESTNET]: MoonbeamLogo,
  [ChainID.AVALANCHE]: AvalancheLogo,
  [ChainID.AVALANCHE_TESTNET]: AvalancheLogo,
  [ChainID.HECO]: HecoLogo,
  [ChainID.HECO_TESTNET]: HecoLogo,
  [ChainID.HARMONY]: HarmonyLogo,
  [ChainID.HARMONY_TESTNET]: HarmonyLogo,
  [ChainID.OKEX]: OKExLogo,
  [ChainID.OKEX_TESTNET]: OKExLogo,
  [ChainID.ARBITRUM]: EthereumLogo,
  [ChainID.ARBITRUM_TESTNET]: EthereumLogo,
  [ChainID.CELO]: CeloLogo,
  [ChainID.PALM]: PalmLogo,
  [ChainID.PALM_TESTNET]: PalmLogo,
}

interface CurrencyLogoProps {
  currency?: any
  size?: string | number
  style?: React.CSSProperties
  className?: string
  squared?: boolean
}

const unknown = 'https://raw.githubusercontent.com/sushiswap/icons/master/token/unknown.png'

const CurrencyLogo: FunctionComponent<CurrencyLogoProps> = ({ currency, size = '24px', style, className = '', ...rest }) => {
  const uriLocations = useHttpLocations(currency instanceof WrappedTokenInfo ? currency.logoURI || currency.tokenInfo.logoURI : undefined)

  const srcs = useMemo(() => {
    if (!currency) {
      return [unknown]
    }

    if (currency.isNative || currency.equals(WNATIVE[currency.chainId])) {
      return [LOGO[currency.chainId], unknown]
    }

    if (currency.isToken) {
      const defaultUrls = [...getCurrencyLogoUrls(currency)]
      if (currency instanceof WrappedTokenInfo) {
        return [...uriLocations, ...defaultUrls, unknown]
      }
      return defaultUrls
    }
    return null
  }, [currency, uriLocations])

  return <Logo srcs={srcs} width={size} height={size} alt={currency?.symbol} {...rest} />
}

export default CurrencyLogo

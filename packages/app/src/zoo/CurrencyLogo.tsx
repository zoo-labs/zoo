import { CURRENCY_SYMBOL_LOGO, CurrencySymbol } from '@zoolabs/sdk'

export type CurrencyLogoProps = {
  symbol: CurrencySymbol | string
  size?: number
  className?: string
}

const CurrencyLogo = ({ symbol, size = 32, className }: CurrencyLogoProps) => {
  const logo = CURRENCY_SYMBOL_LOGO[symbol]
  return <>{logo && <img src={logo} alt={`Select ${symbol} currency`} className={`rounded-full ${className || ''}`} style={{ width: `${size}px`, height: `${size}px` }} />}</>
}

export default CurrencyLogo

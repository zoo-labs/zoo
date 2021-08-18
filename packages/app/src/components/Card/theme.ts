import { darkColors, lightColors } from '../../theme/colors'
import { shadows } from '../../theme/base'
import { CardTheme } from './types'

export const light: CardTheme = {
  background: lightColors.card,
  boxShadow: '#AA38667E 0px 0px 13px -2px', // "0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05)",
  boxShadowActive: shadows.active,
  boxShadowSuccess: shadows.success,
  boxShadowWarning: shadows.warning,
  cardHeaderBackground: {
    default: 'linear-gradient(111.68deg,#2b7eff99 0%,#20dfda8c 100%)', // (pcs version) "linear-gradient(111.68deg, #F2ECF2 0%, #E8F2F6 100%)",
    blue: 'linear-gradient(180deg, #A7E8F1 0%, #94E1F2 100%)',
    violet: 'linear-gradient(180deg, #E2C9FB 0%, #CDB8FA 100%)',
  },
  dropShadow: 'drop-shadow(0px 1px 4px rgba(25, 19, 38, 0.15))',
  onHoverShadow: '0px 2px 5px rgba(2, 74, 187, 0.25)',
}

export const dark: CardTheme = {
  background: darkColors.card,
  boxShadow: '#AA38667E 0px 0px 13px -2px', // "0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05)",
  boxShadowActive: shadows.active,
  boxShadowSuccess: shadows.success,
  boxShadowWarning: shadows.warning,
  cardHeaderBackground: {
    default: 'linear-gradient(166.77deg,#172844 0%,#0dd8d040 100%)',
    blue: 'linear-gradient(180deg, #00707F 0%, #19778C 100%)',
    violet: 'linear-gradient(180deg, #6C4999 0%, #6D4DB2 100%)',
  },
  dropShadow: 'drop-shadow(0px 1px 4px rgba(25, 19, 38, 0.15))',
  onHoverShadow: '#2b7eff 0px 3px 5px -1px',
}

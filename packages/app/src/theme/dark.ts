import { DefaultTheme } from 'styled-components'
import { dark as darkAlert } from '../components/Alert/theme'
import { dark as darkCard } from '../components/Card/theme'
import { dark as darkRadio } from '../components/Radio/theme'
import { dark as darkToggle } from '../components/Toggle/theme'
import { dark as darkNav } from '../components/Menu/theme'
import { dark as darkModal } from '../components/Modal/theme'
import { dark as darkTooltip } from '../components/Tooltip/theme'
import base from './base'
import { darkColors } from './colors'

const darkTheme: DefaultTheme = {
  ...base,
  isDark: true,
  alert: darkAlert,
  colors: darkColors,
  card: darkCard,
  toggle: darkToggle,
  nav: darkNav,
  modal: darkModal,
  radio: darkRadio,
  tooltip: darkTooltip,
}

export default darkTheme

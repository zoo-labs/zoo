export type Breakpoints = string[]

export type MediaQueries = {
  xs: string
  sm: string
  md: string
  lg: string
  xl: string
  nav: string
}

export type Spacing = number[]

export type Radii = {
  small: string
  default: string
  card: string
  circle: string
}

export type Shadows = {
  level1: string
  active: string
  success: string
  warning: string
  focus: string
  inset: string
  innerTableInset: string
  card: string
  onHover: string
}

export type Gradients = {
  bubblegum: string
  buttongum: string
  bubbleYum: string
  starterAppGlare?: string
  starterAppMarble: string
}

export type Modal = {
  background: string
  color: string
  borderColor: string
}

export type Colors = {
  primary: string
  primaryBright: string
  primaryDark: string
  primaryDarker?: string
  primaryPop: string
  primaryLight: string
  accent: string
  accent2: string
  accent3: string
  secondary: string
  secondaryDark: string
  tertiary: string
  tertiaryLight?: string
  sidebar: string
  success: string
  failure: string
  warning: string
  contrast: string
  dropdown: string
  invertedContrast: string
  input: string
  inputSecondary: string
  background: string
  backgroundDisabled: string
  text: string
  textDisabled: string
  textSubtle: string
  label: string
  data: string
  headerTitle: string
  headerSubtitle: string
  borderColor: string
  card: string
  cardLabel: string
  bubblegum: string
  tableHeader: string
  disabledBubblegum: string
  textSecondary: string
  modalBackground: string
  boxShadow: string

  // Gradients
  gradients: Gradients

  // Brand colors
  binance: string
  modal: Modal
}

export type ZIndices = {
  dropdown: number
  modal: number
}

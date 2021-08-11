import { Colors } from './types'

export const baseColors = {
  failure: '#B10058',
  primary: 'rgb(118 204 204)',
  primaryBright: '#B1DCFF',
  primaryLight: '#B1DCFF',
  primaryPop: '#28D7FD',
  primaryDark: '#C82064',
  primaryDarker: '#651133',
  secondary: 'rgb(221 224 26)', //GREEN "#28FD73",
  secondaryDark: '#607A2A', // rgb(255 59 228)rgb(118 204 204)
  accent: '#c301a8',
  accent2: '#12ECE7',
  accent3: '#F5F775',
  success: '#28D7FD',
  warning: '#B10058',
  white: '#ffffff',
}

export const brandColors = {
  binance: '#F0B90B',
}

export const lightColors: Colors = {
  ...baseColors,
  ...brandColors,
  background: '#FFFFFF',
  backgroundDisabled: '#E9EAEB', // not yet created
  sidebar: '#FFFFFF', // "#212226",
  contrast: '#191326',
  dropdown: '#F6F6F6',
  invertedContrast: '#282c34',
  input: '#EFE9F4',
  inputSecondary: '#d6e5ff',
  tertiary: '#000000',
  tertiaryLight: '#EFF4F5',
  text: '#0F0F0F',
  textDisabled: '#748db7',
  textSubtle: '#314F81',
  label: '#525563', // "#314F81",
  data: '#314F81',
  headerTitle: '#20DFDA', // "#ddeafd",99dae4
  headerSubtitle: '#d3f5f3', // b4e5ff
  borderColor: '#FFFFFF',
  secondaryDark: '#20DFDA',
  card: '#ffffff',
  tableHeader: '#FFFFFF', // "#A7C8FB",
  cardLabel: '#314F81',
  modalBackground: '#FFFFFF',
  boxShadow: '0px -1px 0px #ffffff',
  gradients: {
    bubblegum: 'linear-gradient(119.91deg, #3480F6 36.36%, #0DD8D0 84.22%)',
    buttongum: 'linear-gradient(121deg,#3480F6 36.22%,#0DD8D0 90.22%)',
    bubbleYum: 'linear-gradient(230.91deg, #3480F6 74.22%, #0DD8D0 90.22%)',
    starterAppMarble: 'linear-gradient(141deg, #3480F5 45.22%, #0DD8D0 97.22%)',
  },
  bubblegum: 'linear-gradient(140.91deg, #3480F6 68.36%, #0DD8D0 84.22%)',
  disabledBubblegum: 'linear-gradient(140.91deg,#5c88cadb 68.36%,#7cccc8de 84.22%)',
  textSecondary: '#000000',
  modal: {
    background: '#282c34',
    color: '#ffffff',
    borderColor: '#ffffff',
  },
}

export const darkColors: Colors = {
  ...baseColors,
  ...brandColors,
  // secondary: "#138AF2",
  primary: '#193F52',
  primaryDark: '#AA3866',
  primaryLight: '#8BCACB',
  primaryPop: '#28D7FD',
  secondary: '#9FC554',
  accent: 'rgb(195 0 168)', // "#DFDE4E",
  background: '#000000',
  backgroundDisabled: '#333333',
  sidebar: '#212226',
  contrast: '#FFFFFF',
  dropdown: '#1E1D20',
  invertedContrast: '#282d33',
  input: '#264773',
  // inputSecondary: "#314F81",
  inputSecondary: '#313640',
  tertiary: '#3F688C',
  tertiaryLight: '#EFF4F5',
  text: '#FFFFFF',
  textDisabled: '#a0a3ad',
  textSubtle: '#adb0bb',
  label: '#adb0bb',
  data: '#C6D5EB',
  headerTitle: '#b8d3f7',
  headerSubtitle: '#b8d3f7', // #94BEFF",
  borderColor: '#525563', // "#191c1f", // "#0249BBA9",
  secondaryDark: '#21c5d9', // "#20CAC5",
  card: '#040404',
  tableHeader: '#191b21',
  cardLabel: '#20DFDA',
  modalBackground: '#CDB7C3',
  boxShadow: '0px -1px 0px #461e34',
  gradients: {
    bubblegum: 'linear-gradient(119.91deg,#024ABBd1 36.36%,#0dd8d0d1 84.22%)', // "linear-gradient(119.91deg,#024ABBd1 36.36%,#0dd8d0d1 84.22%)",
    buttongum: 'linear-gradient(140.91deg,#024abbf5 61.36%,#0DD8D0d1 93.22%)', // "linear-gradient(140.91deg, #024ABBd1 68.36%, #0DD8D0d1 84.22%)",
    bubbleYum: 'linear-gradient(214.91deg, #024ABB 74.22%, #0DD8D0 90.22%)',
    starterAppMarble: 'linear-gradient(141deg, #3480F5 45.22%, #0DD8D0 97.22%)', // "linear-gradient(129deg, #6287bf 3.22%, #0DD8CE 96.22%)",
  },
  bubblegum: 'linear-gradient(140.91deg, #024ABBd1 68.36%, #0DD8D0d1 84.22%)',
  disabledBubblegum: 'linear-gradient(140.91deg,#5c88cadb 68.36%,#7cccc8de 84.22%)',
  textSecondary: '#FFFFFF',
  modal: {
    background: '#282c34',
    color: '#000000',
    borderColor: '#ffffff',
  },
}

// sidebar #FFFFFF
// background #F9F9FA
// primary #289DFD
// primaryLight #B1DCFF
// primaryDark #C82064
// primaryPop #28D7FD
// accentColor #F5F775
// secondaryColor #28FD73

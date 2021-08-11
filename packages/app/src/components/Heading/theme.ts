import { variants } from './types'

export const styleVariants = {
  [variants.PRIMARY]: {
    // backgroundColor: "primary",
    color: 'white',
    ':disabled': {
      color: 'tertiary',
    },
  },
  [variants.SECONDARY]: {
    color: 'black',
    ':disabled': {
      color: 'tertiary',
    },
  },
  [variants.TERTIARY]: {
    // backgroundColor: "tertiary",
    boxShadow: 'none',
    color: 'tertiary',
  },
  [variants.SUBTLE]: {
    backgroundColor: 'textSubtle',
    color: 'tertiary',
  },
  [variants.DANGER]: {
    backgroundColor: 'failure',
    color: 'white',
  },
  [variants.DISABLED]: {
    backgroundColor: 'disabledBubblegum',
    color: 'white',
  },
  [variants.SUCCESS]: {
    backgroundColor: 'success',
    color: 'white',
  },
  [variants.TEXT]: {
    backgroundColor: 'transparent',
    color: 'white',
    boxShadow: 'none',
  },
  [variants.BUBBLEGUM]: {
    color: 'primaryPop',
    ':disabled': {
      color: 'textSubtle',
    },
  },
  [variants.BUTTONGUM]: {
    background: 'primaryPop',
    color: 'black',
  },
  [variants.MARBLE]: {
    background: 'linear-gradient(129deg,#6287bf 3.22%,#0DD8CE 96.22%)',
    color: 'white',
  },
  [variants.OPACITY]: {
    background: 'linear-gradient(137deg,#c5dcff8c 2.22%,#12f5ea59 98.22%)',
    color: 'teriary',
  },
}

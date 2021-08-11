import { scales, variants } from './types'

export const scaleVariants = {
  [scales.MD]: {
    height: '32px',
    padding: '0 16px',
  },
  [scales.SM]: {
    height: '28px',
    padding: '0 8px',
    minWidth: '60px',
  },
  [scales.XS]: {
    height: '20px',
    fontSize: '16px',
    padding: '4px',
  },
}

export const styleVariants = {
  [variants.PRIMARY]: {
    backgroundColor: 'primaryPop',
    border: '0',
    color: 'text',
  },
  [variants.SECONDARY]: {
    backgroundColor: 'transparent',
    border: '2px solid',
    borderColor: 'white',
    boxShadow: 'none',
    color: 'white',
    ':disabled': {
      backgroundColor: 'transparent',
    },
  },
  [variants.TERTIARY]: {
    backgroundColor: 'tertiary',
    boxShadow: 'none',
    color: 'primaryBright',
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
    background: 'transparent',
    color: 'primaryPop',
    ':disabled': {
      backgroundColor: 'disabledBubblegum',
      color: 'textSubtle',
    },
  },
  [variants.BUTTONGUM]: {
    background: 'primaryPop',
    color: 'white',
  },
  [variants.MARBLE]: {
    background: 'linear-gradient(129deg,#6287bf 3.22%,#0DD8CE 96.22%)',
    color: 'white',
  },
  [variants.OPACITY]: {
    background: 'linear-gradient(137deg,#c5dcff8c 2.22%,#12f5ea59 98.22%)',
    color: 'teriary',
  },
} // #01255f

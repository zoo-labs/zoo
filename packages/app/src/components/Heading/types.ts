export const tags = {
  H1: 'h1',
  H2: 'h2',
  H3: 'h3',
  H4: 'h4',
  H5: 'h5',
  H6: 'h6',
}

export const sizes = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
  XXL: 'xxl',
}

export const variants = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  TERTIARY: 'tertiary',
  TEXT: 'text',
  DANGER: 'danger',
  DISABLED: 'disabledBubblegum',
  SUBTLE: 'subtle',
  SUCCESS: 'success',
  BUBBLEGUM: 'bubblegum',
  BUTTONGUM: 'buttongum',
  MARBLE: 'starterAppMarble',
  OPACITY: 'opacity',
}

export type Variant = typeof variants[keyof typeof variants]
export type Tags = typeof tags[keyof typeof tags]
export type Sizes = typeof sizes[keyof typeof sizes]

export interface HeadingProps {
  as?: Tags
  size?: Sizes
  disabled?: boolean
  variant?: Variant
  headerColor?: string
}

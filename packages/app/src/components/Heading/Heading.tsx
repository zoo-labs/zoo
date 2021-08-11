import styled from 'styled-components'
import { variant } from 'styled-system'
import Text from '../Text/Text'
import { styleVariants } from './theme'
import { tags, sizes, HeadingProps, variants } from './types'

const style = {
  [sizes.SM]: {
    fontSize: '16px',
    fontSizeLg: '18px',
  },
  [sizes.MD]: {
    fontSize: '20px',
    fontSizeLg: '20px',
  },
  [sizes.LG]: {
    fontSize: '24px',
    fontSizeLg: '24px',
  },
  [sizes.XL]: {
    fontSize: '38px',
    fontSizeLg: '40px',
  },
  [sizes.XXL]: {
    fontSize: '48px',
    fontSizeLg: '64px',
  },
}

const Heading = styled(Text).attrs({ bold: true })<HeadingProps>`
  font-size: ${({ size }) => style[size || sizes.MD].fontSize};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 550;
  line-height: 1.5;
  letter-spacing: 3px;
  text-transform: uppercase;

  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: ${({ size }) => style[size || sizes.MD].fontSizeLg};
  }

  ${variant({
    variants: styleVariants,
  })}
`

Heading.defaultProps = {
  as: tags.H2,
  disabled: false,
  variant: variants.PRIMARY,
}

export default Heading

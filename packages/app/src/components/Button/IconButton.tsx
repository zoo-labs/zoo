import styled from 'styled-components'
import Button from './Button'
import { BaseButtonProps, PolymorphicComponent } from './types'

const IconButton: PolymorphicComponent<BaseButtonProps, 'button'> = styled(Button)<BaseButtonProps>`
  padding: 0;
  border: 0px;
  background: white;
  width: ${({ scale }) => (scale === 'sm' ? '28px' : '32px')};
`

export default IconButton

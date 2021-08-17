import styled from 'styled-components'
import Button from '../../../components/Button/Button'

const MenuButton = styled(Button)`
  // color: ${({ theme }) => theme.colors.background};
  padding: 0 8px;
  border-radius: 8px;
  border: 0px;

  svg {
    color: white;
  }
`
MenuButton.defaultProps = {
  variant: 'text',
  size: 'sm',
}

export default MenuButton

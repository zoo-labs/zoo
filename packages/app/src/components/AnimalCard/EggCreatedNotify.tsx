import { Flex, Text } from 'components'
import BorderButton from 'components/Button/BorderButton'
import styled from 'styled-components'

const StyledText = styled(Text)`
  color: ${({ theme }) => theme.colors.text};
`

export const EggCreatedNotify: React.FC<any> = ({ onDismiss = () => null }) => {
  return (
    <>
      <StyledText color='text'>Hybrid egg created successfully</StyledText>
      <Flex style={{ marginTop: 15 }}>
        <BorderButton scale='sm' onClick={() => onDismiss()}>
          OK
        </BorderButton>
      </Flex>
    </>
  )
}

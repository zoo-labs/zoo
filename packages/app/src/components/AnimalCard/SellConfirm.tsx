import { Text, Flex } from 'components'
import BorderButton from 'components/Button/BorderButton'
import { SellConfirmProps } from './types'
import styled from 'styled-components'

const BidPriceInput = styled.input.attrs({
  type: 'number',
  min: 1,
})`
  width: 100%;
  line-height: 1.5rem;
  margin-left: 15px;
`

export const SellConfirm: React.FC<SellConfirmProps> = ({ onDismiss = () => null, breed, sellAnimal }) => {
  return (
    <>
      <Text style={{ textAlign: 'center' }}>{`Do you want to list ${sellAnimal.name}?`}</Text>
      <Flex width='100%' alignItems='center' justifyContent='space-evenly' flexDirection='row' mt='16px'>
        <Text fontSize='16px' style={{ whiteSpace: 'nowrap', marginTop: '5px' }}>
          Price
        </Text>
        <BidPriceInput type='number' />
      </Flex>
      <Flex width='100%' alignItems='center' justifyContent='space-evenly' flexDirection='row' mt='16px'>
        <BorderButton style={{ fontSize: 14 }} scale='md' onClick={() => breed(onDismiss)}>
          Confirm
        </BorderButton>
        <BorderButton style={{ fontSize: 14 }} scale='md' onClick={() => onDismiss()}>
          Cancel
        </BorderButton>
      </Flex>
    </>
  )
}

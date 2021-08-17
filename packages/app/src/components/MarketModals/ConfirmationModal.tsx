import React from 'react'
import { Modal as Existing, Text as Standard } from 'components'
import BorderButton from 'components/Button/BorderButton'
import CustomModal from 'components/CustomizedModal'

import { Flex } from 'components'
import { Modal } from 'components/Modal'

interface Props {
  onDismiss?: () => void
  confirmation: any
  action: string
  amount: number
  name: string
  submission?: number
}

const Confirmation: React.FC<Props> = ({ onDismiss = () => null, confirmation, action, amount, submission, name }) => {
  return (
    <Modal title={`Confirm ${action}`} onDismiss={onDismiss}>
      <Standard color='text'>{`Do you want to ${action === 'Buy' ? 'Buy' : 'Bid on'} ${name} for $${submission ? submission : amount}`}</Standard>
      <Flex mt='16px' mb='16px' width='100%' justifyContent='space-between'>
        <BorderButton mr='16px' scale='sm' onClick={() => confirmation()}>
          YES
        </BorderButton>
        <BorderButton ml='16px' scale='sm' onClick={() => onDismiss()}>
          NO
        </BorderButton>
      </Flex>
    </Modal>
  )
}

export default Confirmation

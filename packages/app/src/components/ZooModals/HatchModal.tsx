import React from 'react'
import styled from 'styled-components'
import { Text as Standard } from 'components'
import BorderButton from 'components/Button/BorderButton'
import { Flex } from 'components/Box'
import Modal from 'components/NewModal'

interface Props {
  onDismiss?: () => void
  confirmation: any
  action?: string
}

const HatchModal: React.FC<Props> = ({ onDismiss = () => null, confirmation, action }) => {
  function onConfirm() {
    confirmation()
    onDismiss()
  }
  return (
    <Modal isOpen={false} onDismiss={onDismiss}>
      <Standard>{action === 'hatch' ? `Do you want to hatch this egg?` : `Do you want to incubate this egg?`}</Standard>
      <Flex justifyContent='space-around' flexDirection='row' mt='16px'>
        <BorderButton scale='sm' onClick={() => onConfirm()}>
          YES
        </BorderButton>
        <BorderButton scale='sm' onClick={() => onDismiss()}>
          No
        </BorderButton>
      </Flex>
    </Modal>
  )
}

export default HatchModal

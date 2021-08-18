import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Label, Text } from 'components/Text'
import BlackBorderButton from 'components/Button/BlackBorderButton'
import { ArrowBackIcon, CloseIcon } from '../Svg'
import { IconButton } from '../Button'

const ModalWrapper = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: ${({ theme }) => theme.zIndices.modal - 1};
`

const ModalContainer = styled.div`
  background: ${({ theme }) => theme.colors.background};
  max-width: 300px;
  border-radius: 8px;
  padding: 15px;
  z-index: 20;
`
const ModalHeader = styled.div`
  display: flex;
`
const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
`
const ModalCloseButton: React.FC<any> = ({ onDismiss }) => {
  return (
    <IconButton style={{ width: 'fit-content', height: 'fit-content', marginLeft: 'auto' }} variant='text' onClick={onDismiss} aria-label='Close the dialog'>
      <CloseIcon color='black' />
    </IconButton>
  )
}

const CustomModal: React.FC<any> = ({ onDismiss, children, style = {}, ...props }) => (
  <ModalContainer style={{ ...style }}>
    <ModalHeader>
      <ModalCloseButton onDismiss={onDismiss} />
    </ModalHeader>
    <ModalBody>{children}</ModalBody>
  </ModalContainer>
)

export default CustomModal

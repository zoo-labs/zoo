import React from 'react'
import styled from 'styled-components'
import Flex from '../Box/Flex'
import { Box } from '../Box'
import { ArrowBackIcon, CloseIcon } from '../Svg'
import { IconButton } from '../Button'
import { ModalProps } from './types'

export const ModalHeader = styled.div<{ background?: string }>`
  align-items: center;
  background: ${({ background }) => background || 'transparent'};
  border-bottom: 1px solid rgba(255, 255, 255, 0.8);
  display: flex;
  padding: 12px 12px;
`

export const ModalTitle = styled(Flex)`
  color: ${({ theme }) => theme.colors.text};
  align-items: center;
  flex: 1;
`

export const ModalBody = styled(Flex)`
  flex-direction: column;
`

export const ModalCloseButton: React.FC<{ onDismiss: ModalProps['onDismiss'] }> = ({ onDismiss }) => {
  return (
    <IconButton width='32px' variant='text' onClick={onDismiss} aria-label='Close the dialog'>
      <CloseIcon color='tertiary' />
    </IconButton>
  )
}

export const ModalBackButton: React.FC<{ onBack: ModalProps['onBack'] }> = ({ onBack }) => {
  return (
    <IconButton variant='text' onClick={onBack} area-label='go back' mr='8px'>
      <ArrowBackIcon color='secondary' />
    </IconButton>
  )
}

export const ModalContainer = styled(Box)<{ minWidth: string; borderRadius: string }>`
  background: ${({ theme }) => theme.colors.background};
  box-shadow: 0px 20px 36px -8px rgba(14, 14, 44, 0.1), 0px 1px 1px rgba(0, 0, 0, 0.05);
  // border: 2px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: 16px;
  width: 100%;
  z-index: ${({ theme }) => theme.zIndices.modal};
  position: relative;

  ${({ theme }) => theme.mediaQueries.xs} {
    min-width: ${({ minWidth }) => minWidth};
    max-width: 100%;
  }
`

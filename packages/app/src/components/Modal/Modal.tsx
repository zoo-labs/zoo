import React from 'react'
import Heading from '../../components/Heading/Heading'
import { ModalBody, ModalHeader, ModalTitle, ModalContainer, ModalCloseButton, ModalBackButton } from './styles'
import { ModalProps } from './types'

const Modal: React.FC<ModalProps> = ({
  title,
  onDismiss,
  onBack,
  children,
  hideCloseButton = false,
  showHeader = true,
  bodyPadding = '24px',
  headerBackground = 'transparent',
  minWidth = '320px',
  borderRadius = '32px',
  styles = {},
  headerColor,
  ...props
}) => (
  <ModalContainer minWidth={minWidth} borderRadius={borderRadius} {...props}>
    {showHeader && (
      <ModalHeader background={headerBackground}>
        <ModalTitle>
          {onBack && <ModalBackButton onBack={onBack} />}
          <Heading headerColor={headerColor}>{title}</Heading>
        </ModalTitle>
        {!hideCloseButton && <ModalCloseButton onDismiss={onDismiss} />}
      </ModalHeader>
    )}
    <ModalBody p={bodyPadding} style={{ ...styles }}>
      {children}
    </ModalBody>
  </ModalContainer>
)

export default Modal

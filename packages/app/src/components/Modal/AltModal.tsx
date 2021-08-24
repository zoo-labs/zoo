import React from 'react'
import Heading from '../../components/Heading/Heading'
import { ModalBody, ModalHeader, ModalTitle, ModalCloseButton, ModalBackButton } from './styles'
import { ModalProps } from './types'
import styled from 'styled-components'
import { Box } from '../Box'

const ModalContainer = styled(Box)<{ minWidth: string; borderRadius: string }>`
  box-shadow: rgba(0, 0, 0, 0.05) 0px 4px 8px 0px;
  align-self: center;
  // border: 2px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: 10px;
  width: 100%;
  z-index: ${({ theme }) => theme.zIndices.modal};
  position: relative;
  display: flex;
  margin: 4rem 0.5rem;
  ${({ theme }) => theme.mediaQueries.xs} {
    min-width: ${({ minWidth }) => minWidth};
    max-width: 420px;
    max-height: 90vh;
  }
`
const AltModal: React.FC<ModalProps> = ({
  title,
  onDismiss,
  onBack,
  children,
  hideCloseButton = false,
  showHeader = true,
  bodyPadding = '24px',
  headerBackground = 'transparent',
  minWidth = '320px',
  borderRadius = '8px',

  styles = {},
  headerColor,
  ...props
}) => (
  <ModalContainer style={{ width: '65wv' }} minWidth={minWidth} borderRadius={borderRadius} {...props} className=''>
    {children}
  </ModalContainer>
)

export default AltModal
{
  /* <div className='w-full max-w-2xl relative'>
<div className='absolute top-1/4 -left-10 bg-blue-500 bottom-4 w-3/5 rounded-full z-0 filter blur-[150px]'></div>
<div className='absolute bottom-1/4 -right-10 bg-pink-500 top-4 w-3/5 rounded-full z-0  filter blur-[150px]'></div>
</div> */
}

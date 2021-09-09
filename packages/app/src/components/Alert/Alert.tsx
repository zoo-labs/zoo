import React from 'react'
import styled, { DefaultTheme } from 'styled-components'
import CheckmarkCircleIcon from '../Svg/Icons/CheckmarkCircle'
import ErrorIcon from '../Svg/Icons/Error'
import BlockIcon from '../Svg/Icons/Block'
import InfoIcon from '../Svg/Icons/Info'
import { Text } from '../Text'
import { IconButton } from '../Button'
import { CloseIcon } from '../Svg'
import Flex from '../Box/Flex'
import { AlertProps, variants } from './types'
import { useMatchBreakpoints } from 'hooks'

interface ThemedIconLabel {
  variant: AlertProps['variant']
  theme: DefaultTheme
  hasDescription: boolean
  small: boolean
}

const getThemeColor = ({ theme, variant = variants.INFO }: ThemedIconLabel) => {
  switch (variant) {
    case variants.DANGER:
      return theme.colors.failure
    case variants.WARNING:
      return theme.colors.warning
    case variants.SUCCESS:
      return theme.colors.success
    case variants.INFO:
    default:
      return theme.colors.secondary
  }
}

const getIcon = (variant: AlertProps['variant'] = variants.INFO) => {
  switch (variant) {
    case variants.DANGER:
      return BlockIcon
    case variants.WARNING:
      return ErrorIcon
    case variants.SUCCESS:
      return CheckmarkCircleIcon
    case variants.INFO:
    default:
      return InfoIcon
  }
}

const IconLabel = styled.div<ThemedIconLabel>`
  background-color: ${getThemeColor};
  border-radius: 16px 0 0 16px;
  color: ${({ theme }) => theme.alert.background};
  padding: ${({ small }) => (small ? '5px' : '12px')};
  display: flex;

  & svg {
    width: ${({ small }) => (small ? '20px' : 'auto')};
  }
`

const withHandlerSpacing = 32 + 16 + 8 // button size + inner spacing + handler position
const Details = styled.div<{ hasHandler: boolean }>`
  flex: 1;
  margin-right: 5px;
  padding-bottom: 12px;
  padding-left: 16px;
  padding-right: ${({ hasHandler }) => (hasHandler ? `${withHandlerSpacing}px` : '16px')};
  padding-top: 12px;
  border-radius: 0 16px 16px 0;
  background: ${({ theme }) => theme.colors.primaryLight};
`

const CloseHandler = styled.div`
  position: relative;
  border-radius: 0 16px 16px 0;
  margin: auto;
  right: 48px;
`

const VerticalCenter = styled.div`
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledAlert = styled(Flex)`
  position: relative;
  background-color: transparent;
  border-radius: 16px;
  box-shadow: 0px 20px 36px -8px rgba(14, 14, 44, 0.1), 0px 1px 1px rgba(0, 0, 0, 0.05);
`

const SizableText = styled(Text)`
  font-size: ${({ small }) => (small ? '15px' : '20px')};
`

const Alert: React.FC<AlertProps> = ({ title, children, variant, onClick }) => {
  const Icon = getIcon(variant)
  const { isSm, isMd, isLg, isXl, isXs } = useMatchBreakpoints()
  console.log('is small: ', isSm, 'is medium: ', isMd, 'is large: ', isLg, 'is extra large: ', isXl, 'is extra small: ', isXs)

  return (
    <StyledAlert>
      <IconLabel variant={variant} hasDescription={!!children} small={isMd || isSm || isXs}>
        <Icon color='currentColor' width='32px' />
      </IconLabel>
      <Details hasHandler={!!onClick}>
        <SizableText bold small={isMd || isSm || isXs}>
          {title}
        </SizableText>
        {typeof children === 'string' ? (
          <SizableText as='p' small={isMd || isSm || isXs}>
            {children}
          </SizableText>
        ) : (
          children
        )}
      </Details>
      {onClick && (
        <VerticalCenter>
          <CloseHandler>
            <IconButton width={isMd || isSm || isXs ? '24px' : '32px'} height={isMd || isSm || isXs ? '24px' : '32px'} variant='text' onClick={onClick}>
              <CloseIcon width={isMd || isSm || isXs ? '16px' : '24px'} color='currentColor' />
            </IconButton>
          </CloseHandler>
        </VerticalCenter>
      )}
    </StyledAlert>
  )
}

export default Alert

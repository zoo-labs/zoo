import { BoxProps } from '../Box'

export interface ModalTheme {
  background: string
}

export type Handler = () => void

export interface InjectedProps {
  onDismiss?: Handler
}

export interface ModalProps extends InjectedProps, BoxProps {
  title: string
  hideCloseButton?: boolean
  showHeader?: boolean
  onBack?: () => void
  bodyPadding?: string
  headerBackground?: string
  minWidth?: string
  borderRadius?: string
  styles?: any
  headerColor?: string
}

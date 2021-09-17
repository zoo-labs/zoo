import React from 'react'
import { TransitionGroup } from 'react-transition-group'
import styled from 'styled-components'
import Toast from './Toast'
import { ToastContainerProps } from './types'
import { useMatchBreakpoints } from 'hooks'

const ZINDEX = 9000
const TOP_POSITION = 0 // Initial position from the top

const StyledToastContainer = styled.div`
  .enter,
  .appear {
    opacity: 0.01;
  }

  .enter.enter-active,
  .appear.appear-active {
    opacity: 1;
    transition: opacity 250ms ease-in;
  }

  .exit {
    opacity: 1;
  }

  .exit.exit-active {
    opacity: 0.01;
    transition: opacity 250ms ease-out;
  }
`

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemove, ttl = 4000, stackSpacing = 24 }) => {
  const { isSm, isMd, isXs } = useMatchBreakpoints()

  return (
    <StyledToastContainer>
      <TransitionGroup>
        {toasts.map((toast, index) => {
          const zIndex = (ZINDEX - index).toString()
          const top = TOP_POSITION + index * stackSpacing
          const bottom = 0

          return <Toast key={toast.id} toast={toast} onRemove={onRemove} ttl={ttl} style={{ [isXs || isSm || isMd ? 'bottom' : 'top']: `${top}px`, zIndex }} />
        })}
      </TransitionGroup>
    </StyledToastContainer>
  )
}

export default ToastContainer

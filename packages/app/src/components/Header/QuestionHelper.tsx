import React, { FC, useCallback, useState } from 'react'
import styled from 'styled-components'

const QuestionHelper: FC<{ text: any; show: boolean }> = ({ children, text, show }) => {
  //   const close = useCallback(() => setShow(false), [setShow])
  const Tooltip = styled.div`
    display: ${show ? 'block' : 'none'};
    position: absolute;
    bottom: -22px;
    right: 0;
    left: 0;
    text-align: center;
    background-color: ${({ theme }) => theme.colors.contrast};
    color: ${({ theme }) => theme.colors.invertedContrast};
    border-radius: 16px;
    opacity: 0.7;
  `

  return <Tooltip>{text}</Tooltip>
}

export default QuestionHelper

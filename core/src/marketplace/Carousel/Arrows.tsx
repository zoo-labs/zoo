import React from 'react'
import styled from 'styled-components'

import { ChevronLeft, ChevronRight} from '@mui/icons-material'


const arrowDiameter = 30
const arrowOffset = `-${arrowDiameter * 1.2}px` // relative to the track, NOT "outer"

const Arrow = styled.div`

  position: absolute;
  color: white;
  top: 50%;
  transform: translate(0, -50%);
  cursor: pointer;
  z-index: 100;

  &:hover {
    background-color: #333;
  },

  & svg {
    vertical-align: baseline;
    width: ${arrowDiameter}px;
    height: ${arrowDiameter}px;
  }
`

const Previous = styled(Arrow)`

  left: ${arrowOffset};

  & .slick-disabled {
    display: none;
  }
`
const Next = styled(Arrow)`

  right: ${arrowOffset};

  & .slick-disabled {
    display: none;
  }
`

export const PreviousArrow  = ({onClick, style, className}) => (
  <Previous onClick={onClick} style={style} className={className}>
    <ChevronLeft/>
  </Previous>
)

export const NextArrow = ({onClick, style, className}) => (
  <Next onClick={onClick} style={style} className={className}>
    <ChevronRight/>
  </Next>
)

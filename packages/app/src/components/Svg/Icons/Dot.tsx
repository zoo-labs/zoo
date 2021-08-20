import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox='0 0 100 100' {...props}>
      <g>
        <ellipse ry='50' rx='49.5' id='svg_1' cy='49.5' cx='49.5' stroke='#000' fill='#000000' />
      </g>
    </Svg>
  )
}

export default Icon

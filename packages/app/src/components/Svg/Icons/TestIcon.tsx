import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox='0 0 512 956' {...props}>
      <circle cx='256' cy='478' r='512' fill='url(#paint0_linear_logoround)' />
      <path d='M307.2 0L0 580.181H214.357V955.592L512 375.411H307.2V0Z' />
      <defs>
        <linearGradient id='paint0_linear_logoround' x1='256' y1='0' x2='256' y2='512' gradientUnits='userSpaceOnUse'>
          <stop stopColor='#54DADE' />
          <stop offset='0.762157' stopColor='#24C7D6' />
        </linearGradient>
      </defs>
    </Svg>
  )
}

export default Icon

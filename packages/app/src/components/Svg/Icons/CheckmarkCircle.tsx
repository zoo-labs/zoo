import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox='0 0 24 24' {...props}>
      <svg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 512 512' xmlSpace='preserve'>
        <g>
          <path
            d='M437,75C390.7,28.7,326.7,0,256,0C114.6,0,0,114.6,0,256c0,70.7,28.7,134.7,75,181c46.3,46.3,110.3,75,181,75
            c141.4,0,256-114.6,256-256C512,185.3,483.3,121.3,437,75z M256,477.7c-122.2,0-221.7-99.5-221.7-221.7S133.8,34.3,256,34.3
            S477.7,133.8,477.7,256S378.2,477.7,256,477.7z'
          />
          <polygon points='217.4,309.7 138.7,231 114.4,255.2 217.4,358.2 397,178.6 372.8,154.3 	' />
        </g>
      </svg>
    </Svg>
  )
}

export default Icon

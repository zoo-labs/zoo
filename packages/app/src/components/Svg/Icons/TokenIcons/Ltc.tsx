import React from 'react'
import Svg from '../../Svg'
import { SvgProps } from '../../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox='0 0 32 32' {...props}>
      <svg xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' width='32' height='32' viewBox='0 0 32 32'>
        <defs>
          <filter id='a' width='111.7%' height='111.7%' x='-5.8%' y='-4.2%' filterUnits='objectBoundingBox'>
            <feOffset dy='.5' in='SourceAlpha' result='shadowOffsetOuter1' />
            <feGaussianBlur in='shadowOffsetOuter1' result='shadowBlurOuter1' stdDeviation='.5' />
            <feComposite in='shadowBlurOuter1' in2='SourceAlpha' operator='out' result='shadowBlurOuter1' />
            <feColorMatrix in='shadowBlurOuter1' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.199473505 0' />
          </filter>
          <filter id='d2' width='125%' height='121.9%' x='-12.5%' y='-7.8%' filterUnits='objectBoundingBox'>
            <feOffset dy='.5' in='SourceAlpha' result='shadowOffsetOuter1' />
            <feGaussianBlur in='shadowOffsetOuter1' result='shadowBlurOuter1' stdDeviation='.5' />
            <feColorMatrix in='shadowBlurOuter1' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.204257246 0' />
          </filter>
          <linearGradient id='c' x1='50%' x2='50%' y1='0%' y2='100%'>
            <stop offset='0%' stopColor='#FFF' stopOpacity='.5' />
            <stop offset='100%' stopOpacity='.5' />
          </linearGradient>
          <circle id='b' cx='16' cy='15' r='15' />
          <path id='e2' d='M10.427 18.214L9 18.768l.688-2.759 1.444-.58L13.213 7h5.129l-1.519 6.196 1.41-.571-.68 2.75-1.427.571-.848 3.483H23L22.127 23H9.252z' />
        </defs>
        <g fill='none' fillRule='evenodd'>
          <use fill='#000' filter='url(#a)' xlinkHref='#b' />
          <use fill='#BFBBBB' xlinkHref='#b' />
          <use fill='url(#c)' style={{ mixBlendMode: 'soft-light' }} xlinkHref='#b' />
          <circle cx='16' cy='15' r='14.5' stroke='#000' strokeOpacity='.097' />
          <use fill='#000' filter='url(#d2)' xlinkHref='#e2' />
          <use fill='#FFF' xlinkHref='#e2' />
        </g>
      </svg>
    </Svg>
  )
}

export default Icon

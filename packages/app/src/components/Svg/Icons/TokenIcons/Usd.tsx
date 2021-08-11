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
          <filter id='d4' width='126.9%' height='117.5%' x='-13.5%' y='-6.2%' filterUnits='objectBoundingBox'>
            <feOffset dy='.5' in='SourceAlpha' result='shadowOffsetOuter1' />
            <feGaussianBlur in='shadowOffsetOuter1' result='shadowBlurOuter1' stdDeviation='.5' />
            <feColorMatrix in='shadowBlurOuter1' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.204257246 0' />
          </filter>
          <linearGradient id='c' x1='50%' x2='50%' y1='0%' y2='100%'>
            <stop offset='0%' stopColor='#FFF' stopOpacity='.5' />
            <stop offset='100%' stopOpacity='.5' />
          </linearGradient>
          <circle id='b' cx='16' cy='15' r='15' />
          <path
            id='e4'
            d='M22.5 18.154c0 2.57-2.086 4.276-5.166 4.533V25h-2.11v-2.336A11.495 11.495 0 019.5 20.35l1.552-2.126c1.383 1.075 2.692 1.776 4.269 2.01v-4.58c-3.541-.888-5.19-2.173-5.19-4.813 0-2.523 2.061-4.252 5.093-4.486V5h2.11v1.402a9.49 9.49 0 014.56 1.776l-1.359 2.196c-1.067-.771-2.158-1.262-3.298-1.495v4.439c3.687.888 5.263 2.313 5.263 4.836zm-7.18-5.327V8.715c-1.527.117-2.327.935-2.327 1.963 0 .98.46 1.612 2.328 2.15zm4.318 5.49c0-1.05-.51-1.681-2.401-2.219v4.23c1.528-.118 2.401-.889 2.401-2.01z'
          />
        </defs>
        <g fill='none' fillRule='evenodd'>
          <use fill='#000' filter='url(#a)' xlinkHref='#b' />
          <use fill='#6CDE07' xlinkHref='#b' />
          <use fill='url(#c)' style={{ mixBlendMode: 'soft-light' }} xlinkHref='#b' />
          <circle cx='16' cy='15' r='14.5' stroke='#000' strokeOpacity='.097' />
          <use fill='#000' filter='url(#d4)' xlinkHref='#e4' />
          <use fill='#FFF' xlinkHref='#e4' />
        </g>
      </svg>
    </Svg>
  )
}

export default Icon

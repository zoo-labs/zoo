import React from 'react'
import Svg from '../../Svg'
import { SvgProps } from '../../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox='0 0 32 32' {...props}>
      <svg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'>
        <defs>
          <linearGradient x1='50%' y1='0%' x2='50%' y2='100%' id='c'>
            <stop stopColor='#FFF' stopOpacity='.5' offset='0%' />
            <stop stopOpacity='.5' offset='100%' />
          </linearGradient>
          <filter x='-5.8%' y='-4.2%' width='111.7%' height='111.7%' filterUnits='objectBoundingBox' id='a'>
            <feOffset dy='.5' in='SourceAlpha' result='shadowOffsetOuter1' />
            <feGaussianBlur stdDeviation='.5' in='shadowOffsetOuter1' result='shadowBlurOuter1' />
            <feComposite in='shadowBlurOuter1' in2='SourceAlpha' operator='out' result='shadowBlurOuter1' />
            <feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.199473505 0' in='shadowBlurOuter1' />
          </filter>
          <circle id='b' cx='15' cy='15' r='15' />
        </defs>
        <g fill='none'>
          <g transform='translate(1)'>
            <use fill='#000' filter='url(#a)' xlinkHref='#b' />
            <use fill='#23292F' fillRule='evenodd' xlinkHref='#b' />
            <use fill='url(#c)' fillRule='evenodd' style={{ mixBlendMode: 'soft-light' }} xlinkHref='#b' />
            <circle strokeOpacity='.097' stroke='#000' strokeLinejoin='round' cx='15' cy='15' r='14.5' />
          </g>
          <path
            d='M22.363 8h2.602l-5.414 5.361a5.059 5.059 0 01-7.102 0L7.032 8h2.605l4.113 4.071a3.2 3.2 0 004.496 0L22.363 8zM9.605 22.906H7l5.45-5.393a5.059 5.059 0 017.1 0L25 22.906h-2.605L18.25 18.8a3.2 3.2 0 00-4.496 0l-4.149 4.106z'
            fill='#FFF'
          />
        </g>
      </svg>
    </Svg>
  )
}

export default Icon

import { IconProps } from 'react-feather'
import React, { FC, useState } from 'react'

const BAD_SRCS: { [tokenAddress: string]: true } = {}

export type LogoProps = {
  srcs: string[]
  width: string | number
  height: string | number
  alt?: string
} & IconProps

/**
 * Renders an image by sequentially trying a list of URIs, and then eventually a fallback triangle alert
 */
const Logo: FC<LogoProps> = ({ srcs, width, height, style, alt = '', className, ...rest }) => {
  const [, refresh] = useState<number>(0)
  const src = srcs.find((src) => !BAD_SRCS[src])
  return (
    <div className='rounded' style={{ width, height }}>
      <img
        src={src || 'https://raw.githubusercontent.com/sushiswap/icons/master/token/unknown.png'}
        // onError={() => {
        //   if (src) BAD_SRCS[src] = true
        //   refresh((i) => i + 1)
        // }}
        width={width}
        height={height}
        alt={alt}
        className={`rounded ${className}`}
        style={style}
      />
    </div>
  )
}

export default Logo

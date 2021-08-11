import useWindowSize from 'hooks/useWindowSize'
import React from 'react'
import styled from 'styled-components'
import { SvgProps } from '../types'
import * as IconModule from './SourceIcons'

export interface SourceIconProps {
  name: string
  width?: number
  scale?: string
}

interface Size {
  width: number | undefined
  height: number | undefined
}

const Icons = IconModule as any as { [key: string]: React.FC<SvgProps> }

const IconWrapper = styled.div`
  margin: 5px 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Icon: React.FC<SourceIconProps> = ({ name, width, scale }) => {
  const size: Size = useWindowSize()
  const smSize = width === undefined ? (scale === 'sm' ? 24 : 38) : width
  const mdSize = width === undefined ? (scale === 'sm' ? 18 : 36) : width
  const lgSize = width === undefined ? (scale === 'sm' ? 24 : 46) : width
  const tokenSize = size.width < 400 ? smSize : size.width < 1000 ? mdSize : lgSize

  const SourceIcon = typeof name === 'undefined' ? Icons.StarterApp : Icons[name]

  return (
    <div>
      <IconWrapper>
        <SourceIcon width={`${tokenSize * 1.5}px`} height={`${tokenSize}px`} />
      </IconWrapper>
    </div>
  )
}

export default Icon

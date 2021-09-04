import { SvgProps } from 'components/Svg'
import React from 'react'
import styled from 'styled-components'

const SubHeader = styled.div`
  margin-top: 10px;
  font-size: 12px;
`

export default function Option({
  link = null,
  clickable = true,
  size,
  onClick = null,
  color,
  header,
  subheader = null,
  Icon,
  active = false,
  id,
}: {
  link?: string | null
  clickable?: boolean
  size?: number | null
  onClick?: null | (() => void)
  color: string
  header: React.ReactNode
  subheader: React.ReactNode | null
  Icon: any
  active?: boolean
  id: string
}) {
  const content = (
    <div onClick={onClick} className={`flex items-center justify-between w-full p-3 rounded cursor-pointer ${!active ? 'bg-dark-800 hover:bg-dark-700' : 'bg-dark-900'}`}>
      <div>
        <div className='flex items-center'>
          {active && <div className='w-4 h-4 mr-4 rounded-full' style={{ background: color }} />}
          {header}
        </div>
        {subheader && <SubHeader>{subheader}</SubHeader>}
      </div>
      <Icon />
    </div>
  )
  if (link) {
    return <a href={link}>{content}</a>
  }

  return !active ? content : <div className='w-full p-px rounded bg-gradient-to-b from-blue-500 via-blue-800 to-pink-500'>{content}</div>
}

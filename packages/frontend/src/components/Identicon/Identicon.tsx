import {css} from '@emotion/css'
import { useEffect, useRef } from 'react'
import jazzicon from 'jazzicon'

export type IdenticonProps = {
  address: string
  size?: number
}

const style = css`
justify-content: 'center';
width: 18;
`

const Identicon = ({ address, size = 16 }: IdenticonProps) => {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!ref.current) return
    try {
      ref.current.innerHTML = ''
      ref.current.appendChild(jazzicon(size, parseInt(address.slice(2, 10), 16)))
    } catch (e) {
      console.log(e)
    }
  }, [address, size])

  return (
    <div
      ref={ref}
      className={style}
    />
  )
}

export { Identicon }

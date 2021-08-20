import React from 'react'
import Svg from '../../Svg'
import { SvgProps } from '../../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox='0 0 32 32' {...props}>
      <svg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M15.9998 31.9996C24.8362 31.9996 31.9996 24.8362 31.9996 15.9998C31.9996 7.16335 24.8362 0 15.9998 0C7.16335 0 0 7.16335 0 15.9998C0 24.8362 7.16335 31.9996 15.9998 31.9996Z'
          fill='url(#paint0_linear)'
        />
        <path
          d='M16.0406 7.2744C15.4706 7.9594 10.6186 15.7224 10.2766 16.7494C9.93361 17.7774 11.3606 17.7204 10.7896 17.6624C10.2186 17.6064 14.3286 17.6624 14.6146 17.7774C14.8996 17.8914 13.9866 23.7704 13.9866 24.5124C13.9866 25.2544 14.7286 25.4254 15.2996 24.9124C15.8706 24.3984 21.5786 14.4094 21.5786 14.3524C21.5786 14.4094 21.6926 13.3244 20.5506 13.3244C19.4096 13.3244 17.3546 13.3824 17.3546 13.3244C17.3546 13.3824 17.5826 7.5024 17.3546 7.1034C17.1256 6.7034 16.6116 6.5894 16.0406 7.2744Z'
          fill='white'
        />
        <defs>
          <linearGradient id='paint0_linear' x1='15.9994' y1='0.0002' x2='15.9994' y2='31.9992' gradientUnits='userSpaceOnUse'>
            <stop stopColor='#00B1FF' />
            <stop offset='1' stopColor='#007FF6' />
          </linearGradient>
        </defs>
      </svg>
    </Svg>
  )
}

export default Icon

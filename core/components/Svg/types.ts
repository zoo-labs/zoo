import { SVGAttributes } from 'react'
import { DefaultTheme } from 'styled-components'
import { SpaceProps } from 'styled-system'

export interface SvgProps extends SVGAttributes<SVGElement> {
  color?: string;
  width?: string;
  spin?: boolean;
}


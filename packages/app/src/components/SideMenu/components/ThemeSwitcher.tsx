import React from 'react'
import { SvgProps } from '../../../components/Svg'
import Text from '../../../components/Text/Text'
import Flex from '../../../components/Box/Flex'
import Button from '../../../components/Button/Button'
import * as IconModule from '../icons'

const Icons = IconModule as unknown as { [key: string]: React.FC<SvgProps> }
const { MoonIcon, SunIcon } = Icons

interface Props {
  isDark: boolean
  toggleTheme: (isDark: boolean) => void
  className?: string
}

const ThemeSwitcher: React.FC<Props> = ({ isDark, toggleTheme, className }) => (
  <Button
    variant='text'
    onClick={() => {
      toggleTheme(!isDark)
    }}
    className={`${className}`}>
    {/* alignItems center is a Safari fix */}
    <Flex alignItems='center'>
      <SunIcon fill={isDark ? 'white' : 'text'} width='18px' />
      <Text color='textDisabled' mx='3px'>
        /
      </Text>
      <MoonIcon fill={isDark ? 'white' : 'textDisabled'} width='18px' />
    </Flex>
  </Button>
)

export default React.memo(ThemeSwitcher, (prev, next) => prev.isDark === next.isDark)

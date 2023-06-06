import { useTheme } from 'next-themes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import Button from "../Button";
const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme()

  return (
    <div>
      <Button
        className={`${theme=='dark' ? 'text-white' : 'text-black'}`}
        style={{ justifyContent: 'center', width: '44px', height: '44px' }}
        onClick={() => (theme == 'dark' ? setTheme('light') : setTheme('dark'))}
      >
        {theme == 'dark' ? (
          <FontAwesomeIcon icon={faMoon} width={16} height={16} />
        ) : (
          <FontAwesomeIcon icon={faSun} width={16} height={16} />
        )}
      </Button>
    </div>
  )
}

export default ThemeSwitcher

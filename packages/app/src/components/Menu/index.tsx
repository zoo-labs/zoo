import { SideMenu } from 'components/SideMenu'
import useAuth from 'hooks/useAuth'
import useTheme from 'hooks/useTheme'
import useWeb3 from 'hooks/useWeb3'
import React from 'react'
import links from './config'

const Menu: React.FC = (props) => {
  const { account, chainId } = useWeb3()
  const { login, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()

  // const dispatch = useAppDispatch()
  // const web3 = useWeb3()
  // const currentPathname = useLocation().pathname

  return <SideMenu links={links()} account={account as string} chainId={chainId as number} login={login} logout={logout} isDark={isDark} toggleTheme={toggleTheme} {...props} />
}

export default Menu

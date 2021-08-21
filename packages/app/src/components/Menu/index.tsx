import React from 'react'
import { SideMenu } from 'components/SideMenu'
import { useWeb3React } from '@web3-react/core'
import useWeb3 from 'hooks/useWeb3'
import { useLocation } from 'react-router-dom'
import useTheme from 'hooks/useTheme'
import { useAppDispatch } from 'state'
import useAuth from 'hooks/useAuth'
import links from './config'
import docsLinks from './docsconfig'

const Menu: React.FC = (props) => {
  const { account, chainId } = useWeb3React()
  const { login, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()

  const dispatch = useAppDispatch()
  const web3 = useWeb3()
  const currentPathname = useLocation().pathname

  return <SideMenu links={links()} account={account as string} chainId={chainId as number} login={login} logout={logout} isDark={isDark} toggleTheme={toggleTheme} {...props} />
}

export default Menu

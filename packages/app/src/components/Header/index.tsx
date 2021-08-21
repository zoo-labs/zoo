import useScrollPosition from '@react-hook/window-scroll'
import { useMatchBreakpoints } from 'hooks'
import { useEffect, useState } from 'react'
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Logo from '../../assets/img/ZooLogoWhite.png'
import Menu from '../Menu'
import { Label, Text } from 'components/Text'
import { getZooToken, getZooDrop, getZooFaucet, getZooMedia, getZooKeeper } from 'util/contracts'

// import Modal from '../Modal'
import useTheme from 'hooks/useTheme'
import useAuth from 'hooks/useAuth'
import { useWeb3React } from '@web3-react/core'
import UserBlock from 'components/SideMenu/components/UserBlock'
import useToast from 'hooks/useToast'
import ThemeSwitcher from 'components/SideMenu/components/ThemeSwitcher'
import { MENU_ENTRY_HEIGHT } from 'components/SideMenu/config'
import useWeb3 from 'hooks/useWeb3'

const HeaderFrame = styled.div<{ showBackground: boolean; isSm: boolean }>`
  grid-template-columns: 120px 1fr 120px;
  -moz-box-pack: justify;
  -moz-box-align: center;
  flex-direction: row;
  top: 0px;
  padding: 1rem;
  z-index: 21;
  position: relative;
  background-image: linear-gradient(transparent 50%, rgb(25, 27, 31) 50%);
  background-position: 0px 0px;
  background-size: 100% 200%;
  box-shadow: transparent 0px 0px 0px 1px;
  transition: background-position 0.1s ease 0s, box-shadow 0.1s ease 0s;
  background-blend-mode: hard-light;
  display: grid;
  width: 100%;
  ${({ isSm }) => (isSm ? 'grid-template-columns: 36px 1fr; padding: 1rem' : '')};
`

const HeaderLinks = styled.div`
  justify-self: center;
  width: fit-content;
  padding: 4px;
  border-radius: 16px;
  display: grid;
  grid-auto-flow: column;
  grid-gap: 10px;
  overflow: auto;
  align-items: center;
`

const HeaderControls = styled.div`
  -moz-box-align: center;
  align-items: center;
  justify-self: flex-end;
  flex-direction: row;
  display: flex;
`

const HeaderElement = styled.div`
  display: flex;
  align-items: center;
  /* addresses safari's lack of support for "gap" */
  & > *:not(:first-child) {
    margin-left: 8px;
  }
`

const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #212429;
  white-space: nowrap;
  width: 100%;
  cursor: pointer;

  :focus {
    border: 1px solid blue;
  }
`

const UNIAmount = styled(AccountElement)`
  color: white;
  padding: 4px 8px;
  height: 36px;
  font-weight: 500;
  background: radial-gradient(174.47% 188.91% at 1.84% 0%, #ff007a 0%, #2172e5 100%), #edeef2;
`

const UNIWrapper = styled.span`
  width: fit-content;
  position: relative;
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }

  :active {
    opacity: 0.9;
  }
`

const Title = styled.a`
  display: flex;
  align-items: center;
  pointer-events: auto;
  justify-self: flex-start;
  margin-right: 12px;

  :hover {
    cursor: pointer;
  }
`

const UniIcon = styled.div`
  transition: transform 0.3s ease;
  :hover {
    transform: rotate(-5deg);
  }
`

const activeClassName = 'ACTIVE'

// const StyledExternalLink = styled().attrs({
//   activeClassName,
// })<{ isActive?: boolean }>`
//   ${({ theme }) => theme.flexRowNoWrap}
//   align-items: left;
//   border-radius: 3rem;
//   outline: none;
//   cursor: pointer;
//   text-decoration: none;
//   font-size: 1rem;
//   width: fit-content;
//   margin: 0 12px;
//   font-weight: 500;

//   &.${activeClassName} {
//     border-radius: 12px;
//     font-weight: 600;
//   }

//   :hover,
//   :focus {
//     text-decoration: none;
//   }
// `
const StyledNavLink = styled(NavLink).attrs({
  activeClassName,
})`
  align-items: left;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  padding: 8px 12px;
  word-break: break-word;
  overflow: hidden;
  white-space: nowrap;
  &.${activeClassName} {
    border-radius: 12px;
    font-weight: 600;
    justify-content: center;
  }

  :hover,
  :focus {
  }
`
const BalanceText = styled(Text)``
function numberWithCommas(num) {
  const values = num.toString().split('.')
  return values[0].replace(/.(?=(?:.{3})+$)/g, '$&,') + (values.length == 2 ? '.' + values[1] : '')
}
export default function Header() {
  const { toastSuccess, toastError, toastInfo, clear } = useToast()
  const history = useHistory()
  const toastClear = () => {
    clear()
  }
  const [balance, setBalance] = useState(0.0)

  const [active, setActive] = useState('account')
  const { isXl, isXs, isSm } = useMatchBreakpoints()
  const { isDark, toggleTheme } = useTheme()
  const web3 = useWeb3()
  const { account, chainID, gasPrice } = web3
  const { login, logout } = useAuth()
  const isMobile = isXl === false
  const [isPushed, setIsPushed] = useState(!isMobile)
  const [showMenu, setShowMenu] = useState(true)
  let location = useLocation()
  useEffect(() => {
    setActive(location.pathname.slice(1))
  }, [location])
  console.log('active', active)
  const scrollY = useScrollPosition()
  const urlClick = (url) => {
    history.push(`${url}`)
    toastClear()
  }
  const zooToken = getZooToken(web3)
  const getBalance = async () => {
    try {
      const decimals = await zooToken.methods.decimals().call()
      const rawBalance = await zooToken.methods.balanceOf(account).call()
      const divisor = parseFloat(Math.pow(10, decimals).toString())
      const balance = rawBalance / divisor
      setBalance(balance)
    } catch (e) {
      console.error('ISSUE LOADING ZOO BALANCE \n', e)
      toastClear()
      toastError('Failed to load ZOO balance')
    }
  }

  useEffect(() => {
    let mounted = true
    if (mounted) {
      getBalance()
    }
    return () => {
      mounted = false
    }
  }, [account, chainID])
  return (
    <HeaderFrame showBackground={scrollY > 45} isSm={isSm}>
      <Title href='.'>
        <UniIcon>
          <img width='36px' src={Logo} alt='logo' />
        </UniIcon>
      </Title>
      <div
        className={`self-center items-center grid gap-4 grid-flow-col w-max rounded-2xl p-1 m-1 justify-self-center ${
          isSm && 'justify-between z-10 fixed -bottom-0 right-2/4 transform translate-x-2/4 -translate-y-1/2'
        }`}
        style={{ backgroundColor: 'rgb(25, 27, 31)' }}>
        {['Home', 'Bank', 'Feed', 'Charts'].map((path: string) => {
          const selected = active === path.toLowerCase()
          return (
            <a
              onClick={() => urlClick(path.toLowerCase())}
              id={`${path}-nav-link`}
              className={`items-left rounded-md cursor-pointer text-md font-normal flex text-gray-300 ${selected && 'font-semibold rounded-xl text-white'}`}
              style={{ backgroundColor: selected ? 'rgb(44, 47, 54)' : 'transparent', padding: '8px 12px' }}>
              <h6>{path}</h6>
            </a>
          )
        })}
      </div>

      <HeaderControls>
        {/* <NetworkCard /> */}
        <HeaderElement>
          <AccountElement active={!!account} style={{ pointerEvents: 'auto' }} className='rounded-xl'>
            {account ? (
              <BalanceText style={{ flexShrink: 0 }} pl='0.75rem' pr='0.5rem' fontWeight={500}>
                <h6 className='text-sm font-semibold'>{numberWithCommas(balance)} ZOO</h6>
              </BalanceText>
            ) : null}
            <UserBlock account={account} login={login} logout={logout} />
          </AccountElement>

          <div className='flex items-center justify-center' style={{ height: MENU_ENTRY_HEIGHT }}>
            <ThemeSwitcher isDark={isDark} toggleTheme={toggleTheme} />
          </div>
          {/* <Menu /> */}
        </HeaderElement>
      </HeaderControls>
    </HeaderFrame>
  )
}

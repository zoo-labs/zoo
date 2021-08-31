import useScrollPosition from '@react-hook/window-scroll'
import { useMatchBreakpoints } from 'hooks'
import { useCallback, useEffect, useState } from 'react'
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Menu from '../Menu'
import { Label, Text } from 'components/Text'
import { getDrop, getFaucet, getMedia, getToken, getZooKeeper } from 'util/contracts'
import Tooltip from '@material-ui/core/Tooltip'
// import Modal from '../Modal'
import useTheme from 'hooks/useTheme'
import useAuth from 'hooks/useAuth'
import { useWeb3React } from '@web3-react/core'
import UserBlock from 'components/SideMenu/components/UserBlock'
import useToast from 'hooks/useToast'
import ThemeSwitcher from 'components/SideMenu/components/ThemeSwitcher'
import { MENU_ENTRY_HEIGHT } from 'components/SideMenu/config'
import useWeb3 from 'hooks/useWeb3'
// import { MoreIcon } from 'components/SideMenu/icons'
import More from './More'
import QuestionHelper from './QuestionHelper'
import { numberWithCommas } from 'components/Functions'
import NetworkCard from './NetworkCard'
import { useModalOpen } from 'state/application/hooks'
import { ApplicationModal } from 'state/application/actions'

const logoURL = window.location.origin + '/static/images/logo-white.png'

const HeaderFrame = styled.div<{ showBackground: boolean; isMobile: boolean; isFeed?: boolean; modalOpen: boolean }>`
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
  width: 100%;
  ${({ isMobile }) => (isMobile ? 'grid-template-columns: 80px 1fr; padding: 1rem' : '')};
  ${({ isFeed, modalOpen }) => (isFeed || modalOpen ? 'display: none' : 'display: grid')};
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
  font-size: 14px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #222;
  white-space: nowrap;
  width: 100%;
  cursor: pointer;

  :focus {
    border: 1px solid blue;
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

const LogoIcon = styled.div`
  margin-left: 8px;
  width: 64px;
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

export default function Header() {
  const { toastSuccess, toastError, toastInfo, clear } = useToast()
  const history = useHistory()
  const toastClear = () => {
    clear()
  }
  const [balance, setBalance] = useState(0.0)
  const [show, setShow] = useState<boolean>(false)

  const open = useCallback(() => setShow(true), [setShow])

  const [active, setActive] = useState('account')
  const { isXl, isXs, isSm, isMd, isLg } = useMatchBreakpoints()
  const { isDark, toggleTheme } = useTheme()
  const web3 = useWeb3()
  const { account, chainID, gasPrice, library } = web3

  const { login, logout } = useAuth()
  const isMobile = isXl === false
  const [isPushed, setIsPushed] = useState(!isMobile)
  const [showMenu, setShowMenu] = useState(true)
  const [wait, setWait] = useState(false)

  let location = useLocation()
  useEffect(() => {
    setActive(location.pathname.split('/')[1])
  }, [location])

  const scrollY = useScrollPosition()
  const urlClick = (url) => {
    history.push(`${url}`)
    toastClear()
  }
  const zooToken = getToken(web3)
  // const getBalance = async () => {
  //   try {
  //     const decimals = await zooToken.methods.decimals().call()
  //     const rawBalance = await zooToken.methods.balanceOf(account).call()
  //     const divisor = parseFloat(Math.pow(10, decimals).toString())
  //     const balance = rawBalance / divisor
  //     setBalance(balance)
  //   } catch (e) {
  //     console.error('ISSUE LOADING ZOO BALANCE \n', e)
  //     toastClear()
  //     toastError('Failed to load ZOO balance')
  //   }
  // }
  const getBalance = async () => {
    try {
      // const decimals = await zooToken.methods.decimals().call()
      await web3.eth.getBalance(account).then((val) => {
        const divisor = parseFloat(Math.pow(10, 18).toString())
        const balance = parseFloat(val) / divisor
        setBalance(parseFloat(balance.toFixed(4)))
      })
    } catch (e) {
      console.error('ISSUE LOADING ZOO BALANCE \n', e)
      toastClear()
      toastError('Failed to load ZOO balance')
    }
  }

  useEffect(() => {
    getBalance()
  }, [])

  const newAnimalModalOpen = useModalOpen(ApplicationModal.NEWANIMAL)
  const videoPlayerModalOpen = useModalOpen(ApplicationModal.VIDEOPLAYER)

  return (
    <HeaderFrame showBackground={scrollY > 45} isMobile={isMobile} isFeed={active == 'feed'} modalOpen={newAnimalModalOpen || videoPlayerModalOpen}>
      <Title href='.'>
        <LogoIcon>
          <img src={logoURL} alt='logo' />
        </LogoIcon>
      </Title>
      <div
        className={`self-center items-center grid grid-flow-col w-max rounded-2xl p-1 m-1 justify-self-center ${
          isMobile ? 'justify-between z-10 fixed -bottom-0 right-2/4 transform translate-x-2/4 -translate-y-1/2 gap-0' : 'gap-6'
        }`}
        style={{ backgroundColor: 'rgb(25, 27, 31)' }}>
        {['Home', 'Swap'].map((path: string) => {
          const selected = path == 'Swap' ? active == 'swap' || active == 'limit-order' : active === path.toLowerCase()
          return (
            <a
              onClick={() => urlClick(path.toLowerCase())}
              id={`${path}-nav-link`}
              className={`items-left rounded-md cursor-pointer text-md font-normal flex text-gray-300 ${selected && 'font-semibold rounded-xl text-white'}`}
              style={{ backgroundColor: selected ? 'rgb(44, 47, 54)' : 'transparent', padding: '10px 14px' }}>
              <h6>{path}</h6>
            </a>
          )
        })}
      </div>

      <HeaderControls>
        {/* */}

        {chainID && library && library.isMetaMask && !isSm && (
          <>
            <Tooltip title='Add ZOO to your MetaMask wallet' placement='bottom'>
              <div
                style={{ width: 40, height: 40 }}
                className='hidden rounded-md cursor-pointer sm:inline-flex bg-secondary hover:bg-gray-800 p-0.5 w-full mr-2'
                onClick={() => {
                  const tokenAddress = '0x34f3F270B85532f32c6F8039B960c569816Fc67a'
                  const tokenSymbol = 'ZOO'
                  const tokenDecimals = 18
                  const tokenImage = window.location.origin + '/static/images/token.png'
                  const params: any = {
                    type: 'ERC20',
                    options: {
                      address: tokenAddress,
                      symbol: tokenSymbol,
                      decimals: tokenDecimals,
                      image: tokenImage,
                    },
                  }
                  try {
                    if (library && library.isMetaMask && library.request) {
                      library
                        .request({
                          method: 'wallet_watchAsset',
                          params,
                        })
                        .then((success) => {
                          if (success) {
                            console.log('Successfully added ZOO to MetaMask')
                          } else {
                            throw new Error('Something went wrong.')
                          }
                        })
                        .catch(console.error)
                    }
                  } catch (error) {}
                }}>
                <img src={require('../../assets/img/hybrid1.png').default} alt='ZOO' className='rounded-md' style={{ width: 40, height: 40 }} />
              </div>
            </Tooltip>

            <NetworkCard />
          </>
        )}
        <HeaderElement>
          <AccountElement active={!!account} style={{ padding: '3px 3px 3px 0', pointerEvents: 'auto' }} className='rounded-xl'>
            {account ? (
              <>
                {/* <QuestionHelper text='Buy ZOO' show={show} /> */}
                <BalanceText onMouseEnter={open} style={{ fontSize: '14px', flexShrink: 0 }} pl='0.5rem' pr='0.5rem' fontWeight={500}>
                  {numberWithCommas(balance)} BNB
                </BalanceText>
              </>
            ) : null}
            <UserBlock account={account} login={login} logout={logout} />
          </AccountElement>
          <More />
          {/*
          <div
            className='font-semibold flex flex-nowrap p-2 rounded-xl'
            style={{ color: 'white', backgroundColor: 'rgba(21, 61, 111, 0.44)', border: '1px solid rgba(21, 61, 111, 0.44)' }}>
            <MoreIcon fill={isDark ? 'white' : 'textDisabled'} />
          </div> */}
          {/* <Menu /> */}
        </HeaderElement>
      </HeaderControls>
    </HeaderFrame>
  )
}

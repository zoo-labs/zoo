import useScrollPosition from '@react-hook/window-scroll'
import { useMatchBreakpoints } from 'hooks'
import { useCallback, useEffect, useState } from 'react'
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Logo from '../../assets/img/ZooLogoWhite.png'
import Menu from '../Menu'
import { Label, Text } from 'components/Text'
import { getZooToken, getZooDrop, getZooFaucet, getZooMedia, getZooKeeper } from 'util/contracts'
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
import { MoreIcon } from 'components/SideMenu/icons'
import More from './More'
import QuestionHelper from './QuestionHelper'
import { numberWithCommas } from 'components/Functions'
import NetworkCard from './NetworkCard'

const HeaderFrame = styled.div<{ showBackground: boolean; isSm: boolean; isMd: boolean; isFeed?: boolean }>`
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
  ${({ isSm, isMd }) => (isMd || isSm ? 'grid-template-columns: 36px 1fr; padding: 1rem' : '')};
  ${({ isFeed }) => (isFeed ? 'display: none' : 'display: grid')};
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
  const { isXl, isXs, isSm, isMd } = useMatchBreakpoints()
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

  console.log('active', active)
  const scrollY = useScrollPosition()
  const urlClick = (url) => {
    history.push(`${url}`)
    toastClear()
  }
  const zooToken = getZooToken(web3)
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
        console.log('balance', balance)
        setBalance(parseFloat(balance.toFixed(4)))
      })
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
  const faucet = getZooFaucet(web3)

  const handleFaucet = () => {
    try {
      setWait(true)
      toastClear()
      toastInfo('Sending ZOO...')
      faucet.methods
        .fund(account)
        .send({ from: account })
        .then(() => {
          setWait(false)
          getBalance()
          toastClear()
          toastSuccess('Sent ZOO!')
        })
        .catch((e) => {
          console.error('ISSUE USING FAUCET \n', e)
          setWait(false)
          toastClear()
          toastInfo('Canceled request for ZOO.')
        })
    } catch (e) {
      console.error('ISSUE USING FAUCET \n', e)
      toastClear()
      toastError('Unable to process transaction. Try again later.')
    }
  }

  const handleFunds = () => {
    switch (chainID) {
      case 1337:
        handleFaucet()
        break
      case 97:
        handleFaucet()
        break
      default:
        const redirectWindow = window.open('https://pancakeswap.info/token/0x8e7788ee2b1d3e5451e182035d6b2b566c2fe997', '_blank')
        redirectWindow.location
    }
  }

  return (
    <HeaderFrame showBackground={scrollY > 45} isSm={isSm} isMd={isMd} isFeed={active == 'feed'}>
      <Title href='.'>
        <UniIcon>
          <img src={Logo} alt='logo' className='lg:w-2/3 w-full' />
        </UniIcon>
      </Title>
      <div
        className={`self-center items-center grid grid-flow-col w-max rounded-2xl p-1 m-1 justify-self-center ${
          isMd || isSm ? 'justify-between z-10 fixed -bottom-0 right-2/4 transform translate-x-2/4 -translate-y-1/2 gap-0' : 'gap-6'
        }`}
        style={{ backgroundColor: 'rgb(25, 27, 31)' }}>
        {['Swap', 'Pool'].map((path: string) => {
          const selected = active === path.toLowerCase()
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
        {/* <a
          onClick={() => handleFunds()}
          // id={`${path}-nav-link`}
          className={`items-left cursor-pointer text-md flex text-gray-300 font-semibold rounded-xl text-white`}
          style={{ backgroundColor: '#8C4FF8', padding: '10px 14px' }}>
          <h6> {chainID !== 97 && chainID !== 1337 ? 'Add Funds' : wait ? 'Processing' : 'Get Zoo'}</h6>
        </a> */}
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
                  const tokenAddress = '0x8e7788ee2b1d3e5451e182035d6b2b566c2fe997'
                  const tokenSymbol = 'ZOO'
                  const tokenDecimals = 18
                  const tokenImage = 'https://freight.cargo.site/t/original/i/92806d1ec020d34eb53078a68dab13ad65d3f771de20d9d13423e923b7db7787/ZOO_COIN_solo.png'
                  const params: any = {
                    type: 'BEP20',
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
          <AccountElement active={!!account} style={{ pointerEvents: 'auto' }} className='rounded-xl'>
            {account ? (
              <>
                {/* <QuestionHelper text='Buy ZOO' show={show} /> */}
                <BalanceText onMouseEnter={open} style={{ flexShrink: 0 }} pl='0.75rem' pr='0.5rem' fontWeight={500}>
                  <h6 className='text-xs font-semibold'>{numberWithCommas(balance)} BNB</h6>
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

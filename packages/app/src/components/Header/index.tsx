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
import { NETWORK_SYMBOL } from 'constants/networks'
import UserBlock from 'components/SideMenu/components/UserBlock'
import { useETHBalances } from 'hooks/useWallet'

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
  margin-left: -12px;
  margin-top: 0px;
  width: 72px;
  transition: transform 0.3s ease;
  :hover {
    transform: rotate(-5deg);
  }
`

const activeClassName = 'ACTIVE'
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
  const web3 = useWeb3()
  const { chainID } = web3
  const { account, library } = useWeb3React()
  const isMobile = isXl === false
  let location = useLocation()
  useEffect(() => {
    setActive(location.pathname.split('/')[location.pathname.split('/').length - 1])
  }, [location])

  const scrollY = useScrollPosition()
  const urlClick = (url) => {
    history.push(`/${url}`)
    toastClear()
  }
  const getBalance = async () => {
    if (!account) return;
    try {
      // const decimals = await zooToken.methods.decimals().call()
      await web3.eth.getBalance(account).then((val) => {
        console.log('CHAIN-ID ' + chainID)
        const divisor = parseFloat(Math.pow(10, 18).toString())
        const balance = parseFloat(val) / divisor
        setBalance(parseFloat(balance.toFixed(4)))
      })
    } catch (e) {
      console.error('ISSUE LOADING ZOO BALANCE \n', e)
    }
  }

  useEffect(() => {
    if (!account) return
    getBalance()
  }, [account, chainID])

  const newAnimalModalOpen = useModalOpen(ApplicationModal.NEWANIMAL)
  const videoPlayerModalOpen = useModalOpen(ApplicationModal.VIDEOPLAYER)
  const bidModalOpen = useModalOpen(ApplicationModal.BID)
  const buyEggModal = useModalOpen(ApplicationModal.BUYEGG)
  const assetModal = useModalOpen(ApplicationModal.ASSET)

  const route_to_homepage = () => {
    history.push('/home')
  }

  return (
    <HeaderFrame
      showBackground={scrollY > 45}
      isMobile={isMobile}
      isFeed={active == 'feed'}
      modalOpen={newAnimalModalOpen || videoPlayerModalOpen || bidModalOpen || buyEggModal || assetModal}
      style={{ paddingRight: 0 }}>
      <Title>
        <LogoIcon>
          <img src={logoURL} alt='logo' onClick={() => route_to_homepage()} />
        </LogoIcon>
      </Title>
      <div
        className={`self-center items-center grid grid-flow-col w-max rounded-xl p-1 justify-self-center ${
          isMobile ? 'justify-between z-10 fixed -bottom-0 right-2/4 transform translate-x-2/4 -translate-y-1/2 gap-0' : 'gap-6'
        }`}
        style={{ backgroundColor: 'rgb(25, 27, 31)' }}>
<<<<<<< HEAD
        {['Account', 'Bank', 'Bridge'].map((path: string) => {
=======
        {['Home', 'Bank', 'Market', 'Swap'].map((path: string) => {
>>>>>>> dev
          console.log('active', active)
          const selected = path == 'Swap' ? active == 'swap' || active == 'limit-order' : active === path.toLowerCase()
          return (
            <a
              key={path}
              onClick={() => urlClick(path.toLowerCase())}
              id={`${path}-nav-link`}
              className={`items-left rounded-xl cursor-pointer text-md font-normal flex text-gray-300 ${
                selected && 'font-semibold rounded-xl text-white bg-gradient-to-b from-btn1 to-btn2 hover:from-primary hover:to-primary'
              }`}
              style={{ backgroundColor: selected ? 'rgb(44, 47, 54)' : 'transparent', padding: '8px 16px' }}>
              <h6>{path}</h6>
            </a>
          )
        })}
      </div>

      <div className='flex items-center justify-end w-full space-x-2 sm:justify-end'>
        {!isSm && (
          <>
            <Tooltip title='Add ZOO to MetaMask' placement='bottom'>
              <div className='flex items-center rounded-xl whitespace-nowrap text-sm font-medium cursor-pointer select-none pointer-events-auto bg-secondary hover:bg-gray-800'>
                <div
                  // style={{ width: 40, height: 40 }}
                  className='grid items-center grid-flow-col p-1 space-x-1 text-sm rounded-lg pointer-events-auto auto-cols-max bg-transparent text-secondary'
                  onClick={() => {
                    const tokenAddress = '0x19263f2b4693da0991c4df046e4baa5386f5735e'
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
                      console.log('adding zoo', library)
                      if (library === undefined) {
                        toastError('Connect Your Wallet First To Add Zoo')
                      }
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
                  <img src={require('../../assets/img/hybrid1.png').default} alt='ZOO' className='rounded-lg' style={{ width: 32, height: 32 }} />
                </div>
              </div>
            </Tooltip>
            <div className=''>
              <NetworkCard />
            </div>
          </>
        )}
        <div className='w-auto flex items-center rounded bg-secondary hover:bg-dark-800 p-0.5 whitespace-nowrap text-sm font-bold cursor-pointer select-none pointer-events-auto hover:bg-gray-800'>
          {account ? (
            <h6 className='mx-1 px-2' style={{ fontSize: '14px', flexShrink: 0 }}>
              {numberWithCommas(balance) || 0} {NETWORK_SYMBOL[chainID]}
            </h6>
          ) : null}
          <UserBlock account={account} />
        </div>
        <More />
      </div>
    </HeaderFrame>
  )
}

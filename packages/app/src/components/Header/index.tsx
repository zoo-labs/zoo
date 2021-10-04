import Tooltip from '@material-ui/core/Tooltip'
import useScrollPosition from '@react-hook/window-scroll'
import { numberWithCommas } from 'components/Functions'
import UserBlock from 'components/SideMenu/components/UserBlock'
import { ChainId } from 'constants/Chains'
import { addresses } from 'constants/contracts'
import { NETWORK_SYMBOL } from 'constants/networks'
import { useMatchBreakpoints } from 'hooks'
import useToast from 'hooks/useToast'
import useWeb3 from 'hooks/useWeb3'
import { useCallback, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { ApplicationModal } from 'state/application/actions'
import { useModalOpen } from 'state/application/hooks'
import { useEthBalance } from 'state/user/hooks'
import styled from 'styled-components'
// import { MoreIcon } from 'components/SideMenu/icons'
import More from './More'
import NetworkCard from './NetworkCard'

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
  font-family: 'Open Sans', sans-serif, Arial, Helvetica;
  font-size: 28px;
  margin-top: 10px;
  margin-right: 10px;
  font-weight: 900;
  padding: 0;
`

export default function Header() {
  const { toastSuccess, toastError, toastInfo, clear } = useToast()
  const history = useHistory()
  const toastClear = () => {
    clear()
  }
  const [show, setShow] = useState<boolean>(false)

  const open = useCallback(() => setShow(true), [setShow])

  const [active, setActive] = useState('account')
  const { isXl, isXs, isSm, isMd, isLg } = useMatchBreakpoints()
  const { account, chainId, library } = useWeb3()
  const chainAddresses = (addresses[chainId] as any) || (addresses[ChainId.BSC] as any)

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

  const balance = useEthBalance(account, library)
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
          <div id='zoo'>ZOO</div>
          {/* <img src={logoURL} alt='logo' onClick={() => route_to_homepage()} /> */}
        </LogoIcon>
      </Title>
      <div
        className={`self-center items-center grid grid-flow-col w-max rounded-xl p-1 justify-self-center ${
          isMobile ? 'justify-between z-10 fixed right-2/4 transform translate-x-2/4 -translate-y-1/2 gap-0' : 'gap-6'
        }`}
        style={{ backgroundColor: 'rgb(25, 27, 31)', bottom: '35px' }}>
        {[
          'Home',
          'Bank',
          // 'Market', 'Bridge'
        ].map((path: string) => {
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
                    const tokenAddress = chainAddresses.ZOO
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
              {numberWithCommas(balance) || 0} {NETWORK_SYMBOL[chainId]}
            </h6>
          ) : null}
          <UserBlock account={account} />
        </div>
        <More />
      </div>
    </HeaderFrame>
  )
}

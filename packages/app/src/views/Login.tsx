import { useWeb3React } from '@web3-react/core'
import useAuth from 'hooks/useAuth'
import { useMatchBreakpoints } from 'hooks'
import { Config, ConnectorNames } from 'components/modals/types'
import { connectorLocalStorageKey } from 'components/modals/config'
import { Login } from '../components/modals/types'

interface Props {
  account?: string
  login: Login
  logout: () => void
}

export default function LoginMain() {
  const { account, chainId } = useWeb3React()
  const { login, logout } = useAuth()
  const { isXs, isSm } = useMatchBreakpoints()
  const isMobile = isXs || isSm
  // eslint-disable-next-line no-restricted-globals

  const metamaskLogin = () => {
    login(ConnectorNames.Injected)
    console.log('logged in')
    window.localStorage.setItem(connectorLocalStorageKey, ConnectorNames.Injected)
  }

  return (
    <div
      className='relative pt-16 pb-32 flex content-center items-end justify-center'
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(circle, rgba(173, 61, 255, 1) 19%, rgba(0, 212, 255, 1) 100%)',
      }}>
      {/* <img
        alt='CryptoZoo Logo'
        src='bearshark-halftone.png'
        style={{ opacity: '0.8', top: '50%', transform: 'translateY(-50%)', left: '1%', position: 'absolute', width: '98%', margin: 'auto' }}
      /> */}

      <div
        className='absolute top-0 w-full h-full bg-center bg-cover'
        style={{
          backgroundImage: 'url(' + require('../assets/img/bearshark-halftone.png').default + ')',
          backgroundSize: '80%',
          backgroundRepeat: 'no-repeat',
        }}>
        <img alt='CryptoZoo Logo' src='ZooLogoWhite.png' style={{ top: '50%', transform: 'translateY(-50%)', left: '29vw', position: 'absolute', width: '42vw', margin: 'auto' }} />
        {/* <span id='blackOverlay' className='w-full h-full absolute opacity-50 bg-black'></span> */}
      </div>
      <button
        onClick={metamaskLogin}
        className='z-10 whitespace-normal px-4 cursor-pointer lg:px-12 py-4 text-white font-bold rounded'
        style={{ background: 'linear-gradient(360deg, #8c4ff8 20%, rgb(173, 61, 255) 100%)' }}>
        LOGIN WITH METAMASK
      </button>
      {/* <StyledFlex flexDirection="row" justifyContent="center" >

            {isMobile &&
                <>
                    <StyledText>
                        <a href="https://cryptozoo.co" target="_blank" >
                            Need Help
                        </a>
                    </StyledText>
                    <a href="https://cryptozoo.co" target="_blank" >
                        <HelpIcon height={'18px'} style={{marginTop: '3px'}}/>
                    </a>
                </>
                }
                </StyledFlex>  */}
    </div>
  )
}

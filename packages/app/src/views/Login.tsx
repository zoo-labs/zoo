import { useWeb3React } from '@web3-react/core'
import { useWalletModal, Text, Flex } from 'components'
import useAuth from 'hooks/useAuth'
import { useMatchBreakpoints } from 'hooks'
import { HelpIcon } from 'components/Svg'
import { url } from 'inspector'
import React from 'react'
import styled from 'styled-components'
import { Config, ConnectorNames } from 'components/WalletModal/types'
import { connectorLocalStorageKey } from 'components/WalletModal/config'
import { Login } from '../components/WalletModal/types'

interface Props {
  account?: string
  login: Login
  logout: () => void
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: rgb(173, 61, 255);
  background: radial-gradient(circle, rgba(173, 61, 255, 1) 19%, rgba(0, 212, 255, 1) 100%);
  height: 100vh;
  overflow: hidden;
`
const Button = styled.button`
  width: 200px;
  font-weight: 550;
  letter-spacing: 1.4px;
  margin: 0px auto auto auto;
  // background: #df4c97;
  background: linear-gradient(360deg, #8c4ff8 20%, rgb(173, 61, 255) 100%);
  border: 2px solid #ffffff;
  border-radius: 4px;
  padding: 10px;
  cursor: pointer;
  text-transform: uppercase;
  border-radius: 8px;
  transition: all 0.2s;
  display: inline-block;
  text-shadow: x-offset y-offset blur color;
  text-decoration: none;
  /* font-weight: bold;
    background-color: #538fbe;
    padding: 20px 70px;
    font-size: 24px; */
  border: 1px solid blue;
  -webkit-box-shadow: 0px 2px 0px #461e34, 0px 3px 15px rgba(0, 0, 0, 0.4), inset 0px 1px 0px rgba(255, 255, 255, 0.3), inset 0px 0px 3px rgba(255, 255, 255, 0.5);
  -moz-box-shadow: 0px 2px 0px #461e34, 0px 3px 15px rgba(0, 0, 0, 0.4), inset 0px 1px 0px rgba(255, 255, 255, 0.3), inset 0px 0px 3px rgba(255, 255, 255, 0.5);
  box-shadow: 0px 2px 0px #461e34, 0px 3px 15px rgba(0, 0, 0, 0.4), inset 0px 1px 0px rgba(255, 255, 255, 0.3), inset 0px 0px 3px rgba(255, 255, 255, 0.5);
  -webkit-transition: all 0.1s ease-in-out;
  -moz-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  p {
    color: white;
    font-size: 14px;
  }
  :hover {
    -webkit-box-shadow: 0px 0px 0px #461e34, 0px 1px 6px rgba(0, 0, 0, 0.4), inset 0px 1px 0px rgba(255, 255, 255, 0.3), inset 0px 0px 3px rgba(255, 255, 255, 0.5);
    -moz-box-shadow: 0px 0px 0px #461e34, 0px 1px 6px rgba(0, 0, 0, 0.4), inset 0px 1px 0px rgba(255, 255, 255, 0.3), inset 0px 0px 3px rgba(255, 255, 255, 0.5);
    box-shadow: 0px 0px 0px #461e34, 0px 1px 6px rgba(0, 0, 0, 0.4), inset 0px 1px 0px rgba(255, 255, 255, 0.3), inset 0px 0px 3px rgba(255, 255, 255, 0.5);
    -webkit-transform: translate(0, 3px);
    -moz-transform: translate(0, 3px);
    transform: translate(0, 3px);
  }
`

const StyledText = styled(Text)`
  cursor: pointer;
  text-transform: uppercase;
  background: transparent;
  border: none;
  color: white;
`

const StyledFlex = styled(Flex)`
  margin: 0px auto auto auto;
`

export default function LoginMain() {
  const { account, chainId } = useWeb3React()
  const { login, logout } = useAuth()
  const { isXs, isSm } = useMatchBreakpoints()
  const isMobile = isXs || isSm

  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(login, logout, account, history)

  const metamaskLogin = () => {
    login(ConnectorNames.Injected)
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

import { useWeb3React } from '@web3-react/core'
import { useWalletModal, Text, Flex } from 'components'
import useAuth from 'hooks/useAuth'
import { useMatchBreakpoints } from 'hooks'
import { HelpIcon } from 'components/Svg'
import { url } from 'inspector'
import React from 'react'
import styled from "styled-components"
import { Config, ConnectorNames } from "components/WalletModal/types";
import { connectorLocalStorageKey } from "components/WalletModal/config";
import { Login } from '../components/WalletModal/types'

interface Props {
  account?: string
  login: Login
  logout: () => void
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #030303;
    height: calc(100vh - 64px);
`
const Button = styled.button`
    width: 200px;
    margin: 0px auto auto auto;
    background-color: #030303;
    border: 2px solid #ffffff;
    border-radius: 4px;
    padding: 10px;
    cursor: pointer;
    p {
        color: white;
        font-size: 16px;
    }
    :hover {
        transition: all 0.2s;
        border: 2px solid #a0ec0e;
        color: #a0ec0e;
        p {
            color: #a0ec0e;
        }
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
        login(ConnectorNames.Injected);
        window.localStorage.setItem(connectorLocalStorageKey, ConnectorNames.Injected);
    }

    return (
        <Container>
            <img alt="CryptoZoo Logo" src="CryptoZooLogoFull.jpg" style={{width: '300px', margin: 'auto auto 30px auto'}}/>
            <Button onClick={metamaskLogin}>
                <p>LOGIN WITH</p>
                <p>METAMASK</p>
            </Button>
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
        </Container>
    )
}

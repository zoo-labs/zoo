import { useWeb3React } from '@web3-react/core'
import { useWalletModal } from 'components'
import useAuth from 'hooks/useAuth'
import { url } from 'inspector'
import React from 'react'
import styled from "styled-components"
import { Login } from '../components/WalletModal/types'
import MyMP16OSFFont from '../fonts/MP16OSF.ttf'

interface Props {
  account?: string
  login: Login
  logout: () => void
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #030303;
    height: calc(100vh - 63px);
`
const Button = styled.button`
    width: 200px;
    margin: 0px auto auto auto;
    background-color: #030303; 
    border: 2px solid #ffffff;
    padding: 10px;
    cursor: pointer;
    :hover {
        transition: all 0.2s;
        border: 2px solid #a0ec0e;
        color: #a0ec0e;
        p {
            color: #a0ec0e;
        }
    }
    p {
        @font-face{
            font-family:'MyMP16OSFFont';
            src:url('${MyMP16OSFFont}') format('TrueType');   
        }
        color: white;
        font-family: 'MyMP16OSFFont'; 
        font-size: 16px;
    }
`

export default function LoginMain() {

    const { account, chainId } = useWeb3React()
    const { login, logout } = useAuth()

    const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(login, logout, account, history)
    return (
        <Container>
            <img alt="CryptoZoo Logo" src="CryptoZooLogoFull.jpg" style={{width: '300px', margin: 'auto auto 30px auto'}}/>
            <Button onClick={()=>onPresentConnectModal()}>
                <p>LOGIN WITH</p>
                <p>METAMASK</p>
            </Button>
        </Container>
    )
}

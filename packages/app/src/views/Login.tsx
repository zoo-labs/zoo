import { useWeb3React } from '@web3-react/core'
import { useWalletModal } from 'components'
import useAuth from 'hooks/useAuth'
import { url } from 'inspector'
import React from 'react'
import styled from "styled-components"
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
    height: calc(100vh - 63px);
`
const Button = styled.button`
`

export default function LoginMain() {

    const { account, chainId } = useWeb3React()
    const { login, logout } = useAuth()

    const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(login, logout, account, history)
    return (
        <Container>
            <img alt="CryptoZoo Logo" src="CryptoZooLogoFull.jpg" style={{width: '300px', margin: 'auto auto 30px auto'}}/>
            <Button onClick={()=>onPresentConnectModal()} style={{width: '200px', margin: '0px auto auto auto', backgroundColor: '#030303', border: '1px solid #ffffff', padding: '10px'}}>
                <p style={{color: 'white', fontFamily: "'Mister Pixel 16 pt - Small Caps'", fontSize: 16}}>LOGIN WITH</p>
                <p style={{color: 'white', fontFamily: "'Mister Pixel 16 pt - Small Caps'", fontSize: 16}}>METAMASK</p>
            </Button>
        </Container>
    )
}

import { useWeb3React } from '@web3-react/core'
import { useWalletModal } from 'components'
import useAuth from 'hooks/useAuth'
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
    background-color: black;
    height: 100vh;
`
const Button = styled.button`
`

export default function LoginMain() {

    const { account, chainId } = useWeb3React()
    const { login, logout } = useAuth()

    const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(login, logout, account, history)
    return (
        <Container>
            <img alt="CryptoZoo Logo" src="CryptoZooLogoFull.jpg"/>
            <Button onClick={()=>onPresentConnectModal()}>
                Log In
            </Button>
        </Container>
    )
}

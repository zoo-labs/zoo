import React, { useEffect, useState } from 'react'
import Moralis from 'moralis'
import { MoralisProvider as MProvider } from 'react-moralis'
import { moralisConfig } from 'constants/moralis'
import { useWeb3React } from '@web3-react/core'

const ethereum = (window as any).ethereum || { chainId: null, on: () => {} }

export const MoralisProvider: React.FC = ({ children }) => {
  const [chainID, setChainID] = useState(Number(ethereum.chainId))

  // We only have servers for Local Dev, BSC Testnet and Mainnet
  if (chainID != 56 && chainID != 97 && chainID != 1337) setChainID(1337) // Default to hardhat

  useEffect(() => {
    ethereum.on('chainChanged', (chainID) => {
      setChainID(Number(chainID))
      // window.location.reload()
    })
  })


  const { applicationID, serverURL } = moralisConfig(chainID)
  console.log(`Moralis.initialize appID: ${applicationID} serverURL: ${serverURL}`)
  Moralis.initialize(applicationID)
  Moralis.serverURL = serverURL

  return (
    <MProvider appId={applicationID} serverUrl={serverURL}>
      {children}
    </MProvider>
  )
}

export default MoralisProvider

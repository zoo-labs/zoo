import { moralisConfig } from 'constants/moralis'
import Moralis from 'moralis'
import React, { useEffect, useState } from 'react'
import { MoralisProvider as MProvider } from 'react-moralis'

const ethereum = (window as any).ethereum || { chainId: null, on: () => {} }

export const MoralisProvider: React.FC = ({ children }) => {
  const [chainId, setChainID] = useState(Number(ethereum.chainId))

  // We only have servers for Local Dev, BSC Testnet and Mainnet
  if (chainId != 56 && chainId != 97 && chainId != 1337) setChainID(97) // Default to Testnet

  useEffect(() => {
    ethereum.on('chainChanged', (chainId) => {
      setChainID(Number(chainId))
      // window.location.reload()
    })
  })

  const { applicationID, serverURL } = moralisConfig(chainId)
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

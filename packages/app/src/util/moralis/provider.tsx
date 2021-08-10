import React, { useEffect, useState } from 'react'
import Moralis from 'moralis'
import { MoralisProvider as MProvider } from 'react-moralis'
import { moralisConfig } from 'constants/moralis'
import { useWeb3React } from '@web3-react/core'

export const MoralisProvider: React.FC = ({ children }) => {
  const [ chainID, setChainID ] = useState(1337)
  const { chainId } = useWeb3React()

  useEffect(()=> {
    if (chainId) setChainID(chainId)
  })

  const { applicationID, serverURL } = moralisConfig(chainID)

  Moralis.initialize(applicationID)
  Moralis.serverURL = serverURL

  return (
    <MProvider appId={ applicationID } serverUrl={ serverURL }>
      { children }
    </MProvider>
   )
}

export default MoralisProvider

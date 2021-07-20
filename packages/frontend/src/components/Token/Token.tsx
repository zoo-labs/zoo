import { FormEvent, MouseEvent, useState } from 'react'
import { utils, BigNumber, constants } from 'ethers'
import {
    Spinner,
    Box,
    Flex,
    Card,
    Button,
    Image,
    Input,
    Text,
    Heading,
    Divider,
    NavLink,
  } from 'theme-ui'

import useSWR from 'swr'
import { useAppState } from '../../state'
import { fetcherMetadata, fetchOwner } from '../../utils/fetchers'
import { formatPriceEth, METADATA_API, toShort } from '../../utils'

export type TokenProps = {
    id: string
    uri: string
    price: BigNumber
    name: string
  }
  
  export type TokenCompoentProps = {
    token: TokenProps
    isOnSale?: boolean
    onTransfer?: boolean
    onBuy?: boolean
    onSale?: boolean
  }
export const Token = ({ token, isOnSale, onTransfer, onBuy, onSale }: TokenCompoentProps) => {
    const [transfer, setTransfer] = useState<boolean>(false)
    const [onSaleActive, setOnSale] = useState<boolean>(false)
    const [address, setAddress] = useState<string>('')
    const [price, setPrice] = useState<string>('')
    const { user, ethPrice, contractDetails, transferToken, buyToken, setTokenSale } = useAppState()
  
    const onTransferClick = async (e: FormEvent | MouseEvent) => {
        e.preventDefault()
        if (onTransfer && utils.isAddress(address)) {
          transferToken(token.id, address)
          setTransfer(false)
        }
      }
    
      const onBuyClick = (e: MouseEvent) => {
        e.preventDefault()
        onBuy && buyToken(token.id, token.price)
      }
    
      const onSaleClick = async (e: MouseEvent) => {
        e.preventDefault()
        if (!onSale) return
        try {
          await setTokenSale(token.id, utils.parseEther(price), true)
          setOnSale(false)
        } catch (e) {
          throw new Error(e)
        }
      }
    
      const { data: owner } = useSWR(token.id, fetchOwner)
      const { data } = useSWR(`${METADATA_API}/token/${token.id}`, fetcherMetadata)
    
      const tokenPriceEth = formatPriceEth(token.price, ethPrice)
    
      if (!data)
        return (
          <Card variant="nft">
            <Spinner />
          </Card>
        )
    
      if (!data.name) return null
}
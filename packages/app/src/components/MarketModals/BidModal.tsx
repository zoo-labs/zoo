import React from 'react'
import styled from 'styled-components'
import {Modal as Existing, Text as Standard} from 'components'
import BorderButton from 'components/Button/BorderButton'
import { useModal } from "components/Modal";
import Confirmation from "./ConfirmationModal"
import Moralis from 'moralis'
import { useWeb3React } from '@web3-react/core'

Moralis.initialize("16weSJXK4RD3aYAuwiP46Cgzjm4Bng1Torxz5qiy");

Moralis.serverURL = "https://dblpeaqbqk32.usemoralis.com:2053/server"


interface Props {
    onDismiss?: () => void
    item: any
}

const Modal = styled(Existing)`
    background-color: black;
`

const BidInput = styled.input.attrs({ 
    type: 'number',
    min: 1,
  })`
    width: 90%;
    margin: auto;
  `

const Text = styled(Standard)`

`



const BidModal: React.FC<Props> = ({onDismiss = () => null, item}) => {
    const [value, setValue] = React.useState(item.CurrentBid+1)
    const {account} = useWeb3React()
    const confirmBuy = async() => {
        const queryObject = Moralis.Object.extend("Animals")
        const query = new Moralis.Query(queryObject)
        query.limit(1000)
        query.equalTo("TokenId", item.AnimalId)
        const results = await query.find()
        const currentObject = results[0]
        currentObject.set("Listed", false)
        currentObject.set
        currentObject.save()
        onDismiss()
    }
    const confirmBid = async() => {
            console.log(value)
            const queryObject = Moralis.Object.extend("Animals")
            const query = new Moralis.Query(queryObject)
            query.limit(1000)
            query.equalTo("TokenId", item.AnimalId)
            const results = await query.find()
            const currentObject = results[0]
            currentObject.set("CurrentBid", value)
            currentObject.save("OwnerAccount", account)
            onDismiss()
    }

    const [onConfirmBuy] = useModal(
        <Confirmation
            confirmation = {confirmBuy}
            onDismiss={()=>null}
            action = "Buy"
            name= {item.Name}
            amount = {item.BuyNow}
        />
    )
    const [onConfirmBid] = useModal(
        <Confirmation
            confirmation = {confirmBid}
            onDismiss={()=>null}
            action = "Bid"
            name= {item.Name}
            amount = {item.CurrentBid}
            submission = {value}

        />
    )

    const changed = () => (e) => {
        const newVal = e.target.value
        if(newVal > value){
            setValue(newVal)
        }
    }

    return (
        <>
        <Modal title = {`${item.Name}`} onDismiss={onDismiss}>
            <Text>{`Current Bid: ${item.CurrentBid}`}</Text>
            <Text>{`Buy Now: ${item.BuyNow}`}</Text>
            <BidInput type="number" onChange = {changed()} defaultValue={value}/>
            <BorderButton onClick={()=>onConfirmBuy()}>Buy Now</BorderButton>
            <BorderButton onClick={()=>onConfirmBid()}>Bid</BorderButton>
        </Modal>
        </>
    )
}

export default BidModal
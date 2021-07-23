import React from 'react'
import styled from 'styled-components'
import {Modal as Existing, Text as Standard} from 'components'
import BorderButton from 'components/Button/BorderButton'
import { useModal } from "components/Modal";
import Confirmation from "./ConfirmationModal"
import Moralis from 'moralis'
import { useWeb3React } from '@web3-react/core'
import { Animal } from "entities/zooentities";
import {addAnimal} from "state/actions"

Moralis.initialize("16weSJXK4RD3aYAuwiP46Cgzjm4Bng1Torxz5qiy");

Moralis.serverURL = "https://dblpeaqbqk32.usemoralis.com:2053/server"


interface Props {
    onDismiss?: () => void
    item: Animal
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
    const [value, setValue] = React.useState(parseInt(item.currentBid)+1)
    const {account} = useWeb3React()

    const confirmBuy = async() => {
        const toSet:Animal = {...item}
        toSet.listed = false;
        toSet.owner = account
        addAnimal(toSet)
        // const queryObject = Moralis.Object.extend("Animals")
        // const query = new Moralis.Query(queryObject)
        // query.limit(1000)
        // query.equalTo("TokenId", item.AnimalId)
        // const results = await query.find()
        // const currentObject = results[0]
        // currentObject.set("Listed", false)
        // currentObject.set
        // currentObject.set("OwnerAccount", account)
        // currentObject.save()
        
        onDismiss()
    }
    const confirmBid = async() => {
            console.log(value)
            // const queryObject = Moralis.Object.extend("Animals")
            // const query = new Moralis.Query(queryObject)
            // query.limit(1000)
            // query.equalTo("TokenId", item.AnimalId)
            // const results = await query.find()
            // const currentObject = results[0]
            // currentObject.set("CurrentBid", value)
            // currentObject.set("BuyNow", value + 100)
            // currentObject.save()
            const toSet:Animal = {...item}
            toSet.currentBid = value.toString()
            toSet.buyNow = (value+100).toString()
            addAnimal(toSet)
            onDismiss()
    }

    const [onConfirmBuy] = useModal(
        <Confirmation
            confirmation = {confirmBuy}
            onDismiss={()=>null}
            action = "Buy"
            name= {item.name}
            amount = {parseFloat(item.buyNow)}
        />
    )
    const [onConfirmBid] = useModal(
        <Confirmation
            confirmation = {confirmBid}
            onDismiss={()=>null}
            action = "Bid"
            name= {item.name}
            amount = {parseFloat(item.currentBid)}
            submission = {value}

        />
    )

    const changed = () => (e) => {
        const newVal = e.target.value
        if(newVal > value){
            setValue(parseInt(newVal))
        }
    }

    return (
        <>
        <Modal title = {`${item.name}`} onDismiss={onDismiss}>
            <Text>{`Current Bid: ${item.currentBid}`}</Text>
            <Text>{`Buy Now: ${item.buyNow}`}</Text>
            <BidInput type="number" onChange = {changed()} defaultValue={value}/>
            <BorderButton onClick={()=>onConfirmBuy()}>Buy Now</BorderButton>
            <BorderButton onClick={()=>onConfirmBid()}>Bid</BorderButton>
        </Modal>
        </>
    )
}

export default BidModal
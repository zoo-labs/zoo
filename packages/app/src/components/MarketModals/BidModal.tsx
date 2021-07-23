import React from 'react'
import styled from 'styled-components'
import {Modal as Existing, Text as Standard} from 'components'
import BorderButton from 'components/Button/BorderButton'
import { useModal } from "components/Modal";
import Confirmation from "./ConfirmationModal"


interface Props {
    onDismiss?: () => void
    item: any
    Moralis: any
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

const confirmBuy = () => {
    alert("buy")
}
const confirmBid = () => {
    alert("bid")
}

const BidModal: React.FC<Props> = ({onDismiss = () => null, item, Moralis}) => {
    const [value, setValue] = React.useState(item.CurrentBid+1)
    const [onConfirmBuy] = useModal(
        <Confirmation
            confirmation = {confirmBuy}
            onDismiss={()=>null}
            action = "Buy"
            name= {item.Name}
            amount = {item.BuyNow}
            submission = {value}
        />
    )
    const [onConfirmBid] = useModal(
        <Confirmation
            confirmation = {confirmBid}
            onDismiss={()=>null}
            action = "Bid"
            name= {item.Name}
            amount = {item.CurrentBid}

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
import React from 'react'
import styled from 'styled-components'
import {Modal as Existing, Text as Standard} from 'components'
import BorderButton from 'components/Button/BorderButton'

interface Props {
    onDismiss?: () => void
    confirmation: any
    action: string
    amount: number
    name: string
}

const Modal = styled(Existing)`
    background-color: black;
`


const Confirmation: React.FC<Props> = ({onDismiss = () => null, confirmation, action, amount}) => {
    return (
        <Modal title="Are you Sure?" onDismiss={onDismiss}>
            <BorderButton onClick={()=>onDismiss()}>Cancel</BorderButton>
            <BorderButton>Confirm</BorderButton>
        </Modal>
    )
}

export default Confirmation
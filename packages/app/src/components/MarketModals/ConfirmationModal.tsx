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
    submission?: number
}

const Modal = styled(Existing)`
    background-color: ${({theme}) => theme.colors.background};
`


const Confirmation: React.FC<Props> = ({onDismiss = () => null, confirmation, action, amount, submission, name}) => {
    return (
        <Modal title="Are you Sure?" onDismiss={onDismiss}>
            <Standard>{`You want to ${action==="Buy"? "Buy" : "Bid on"} ${name} for $${submission? submission : amount}`}</Standard>
            <BorderButton onClick={()=>onDismiss()}>Cancel</BorderButton>
            <BorderButton onClick={()=>confirmation()}>Confirm</BorderButton>
        </Modal>
    )
}

export default Confirmation
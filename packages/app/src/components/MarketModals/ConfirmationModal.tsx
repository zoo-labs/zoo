import React from 'react'
import styled from 'styled-components'
import {Modal as Existing, Text as Standard} from 'components'
import BorderButton from 'components/Button/BorderButton'
import CustomModal from "components/CustomizedModal";

import {
  Flex,
  Text
} from "components";

interface Props {
    onDismiss?: () => void
    confirmation: any
    action: string
    amount: number
    name: string
    submission?: number
}

const Button = styled.div`
  padding: 6px 12px;
  min-width: 100px;
  background: black;
  text-align: center;
  color: white;
  margin: auto;
`

const Confirmation: React.FC<Props> = ({onDismiss = () => null, confirmation, action, amount, submission, name}) => {
    return (
        <CustomModal onDismiss={onDismiss}>
            <Standard color="black">{`You want to ${action==="Buy"? "Buy" : "Bid on"} ${name} for $${submission? submission : amount}`}</Standard>
            <Flex style={{marginTop: 15}}>
                <Button onClick={()=>confirmation()}>YES</Button>
                <Button onClick={()=>onDismiss()}>NO</Button>
            </Flex>
        </CustomModal>
    )
}

export default Confirmation
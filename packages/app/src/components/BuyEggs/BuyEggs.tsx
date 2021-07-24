import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Modal } from '../Modal'
import { Label, Text } from 'components/Text'
import BlackBorderButton from 'components/Button/BlackBorderButton'
import { Egg } from "entities/zooentities";
import { addEggs } from "state/actions";
import { useWeb3React } from "@web3-react/core";
import { useDispatch } from "react-redux";

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
`
const LabelWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    align-items: center;
`

const ModalWrapper = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: ${({ theme }) => theme.zIndices.modal - 1};
`

const EggInput = styled.input.attrs({ 
  type: 'number',
  min: 1,
  defaultValue: 1
})`
  width: 100%;
  line-height: 1.5rem;
`

const SubmitBtn = styled.input.attrs({ 
  type: 'submit',
})`
  width: 40%;
  margin: auto;
  margin-top: 1rem;
  background: black;
  color: white;
`

const tsxStatus = {
  STANDBY: 'Standby',
  SENT: 'Processing',
  CONFIRMED: 'Confirmed',
  ERROR: 'Error',
}

type EggModalProps = {
  onDismiss?: () => void,
  headerColor?: string
}




const BuyEggs: React.FC<EggModalProps> = ({ onDismiss, headerColor }) => {
  const dispatch = useDispatch()
  const [value, setValue] = useState(0)
  const {account} = useWeb3React()
  
  const changed = () => (e) => {
    const newVal = e.target.value;

    if (newVal > value) {
      setValue(parseInt(newVal));
    }
  };

  const testEggs:Egg[] = [
    {
      owner: account,
      tokenId: "1",
      parent1: "1",
      parent2: "",
      basic: true
    },
    {
      owner: account,
      tokenId: "2",
      parent1: "2",
      parent2: "",
      basic: true
    },
    {
      owner: account,
      tokenId: "3",
      parent1: "2",
      parent2: "",
      basic: true
    },
    {
      owner: account,
      tokenId: "4",
      parent1: "4",
      parent2: "",
      basic: true
    }
  ]
  
  const handleSubmit = async() => {
    dispatch(addEggs(testEggs))
    onDismiss()
    }

  return (
    <ModalWrapper>
      <Modal
        title='How many eggs?'
        onDismiss={onDismiss}
        style={{ justifyContent: 'space-between' }}
        headerColor={headerColor}
      >
        <Text
          fontSize="20px"
          style={{ whiteSpace: 'nowrap', marginTop: '5px'}}
        >
          AMOUNT
        </Text>
        <EggInput type="number" onChange = {changed()}/>
        <BlackBorderButton onClick={()=>handleSubmit()}>
          Submit
        </BlackBorderButton>
      </Modal>
    </ModalWrapper>
  )
}

export default BuyEggs

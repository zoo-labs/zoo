import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Modal } from '../Modal'
import { Label, Text } from 'components/Text'
import BorderButton from 'components/Button/BorderButton'
import { Egg } from "entities/zooentities";
import { addEggs } from "state/actions";
import { useWeb3React } from "@web3-react/core";
import { useDispatch } from "react-redux";
import { Flex, TextButton } from 'components'

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
  width: 90%;
  line-height: 1.5rem;
  margin-top: -2px;
  align-items: center;
  background: #925677;
  text-transform: uppercase;
  border-radius: 8px;
  transition: all 0.2s;
  display: inline-block;
  text-shadow: x-offset y-offset blur color;
  text-decoration: none;
  border: 1px solid #230616;
  -webkit-box-shadow: 0px 2px 0px #461e34, 0px 3px 15px rgba(0,0,0,.4), inset 0px 1px 0px rgba(255,255,255,.3), inset 0px 0px 3px rgba(255,255,255,.5);
  -moz-box-shadow: 0px 2px 0px #461e34, 0px 3px 15px rgba(0,0,0,.4), inset 0px 1px 0px rgba(255,255,255,.3), inset 0px 0px 3px rgba(255,255,255,.5);
  box-shadow: 0px 2px 0px #461e34, 0px 3px 15px rgba(0,0,0,.4), inset 0px 1px 0px rgba(255,255,255,.3), inset 0px 0px 3px rgba(255,255,255,.5);
  -moz-appearance: textfield;
  ::-webkit-inner-spin-button{
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-outer-spin-button{
    -webkit-appearance: none;
    margin: 0;
  }
`
const ArrowBottom = styled.div`
  width: 0;
  height: 0;
  border-left: calc(0.75rem - 1px) solid transparent;
  border-right: calc(0.75rem - 1px) solid transparent;
  border-top: calc(0.75rem - 1px) solid #925677;
  font-size: 0;
  line-height: 0;
  position: absolute;
  right: 25px;
  margin-top: calc(0.75rem + 1px);
  &:hover {
    cursor: pointer;
  }
`

const ArrowUp = styled.div`
  width: 0;
  height: 0;
  border-left: calc(0.75rem - 1px) solid transparent;
  border-right: calc(0.75rem - 1px) solid transparent;
  border-bottom: calc(0.75rem - 1px) solid #925677;
  font-size: 0;
  line-height: 0;
  position: absolute;
  right: 25px;
  &:hover {
    cursor: pointer;
  }
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

const StyledRow = styled.div`
  display: flex;
  flex-direction: row;
`

const BuyEggs: React.FC<EggModalProps> = ({ onDismiss, headerColor }) => {
  const dispatch = useDispatch()
  const [value, setValue] = useState(1)
  const {account} = useWeb3React()
  
  const increaseEgg = () => {
    setValue(value + 1);
  }

  const decreaseEgg = () => {
    if(value <= 1) {
      return;
    }
    setValue(value - 1);
  }

  const changed = () => (e) => {
    const newVal = e.target.value;
    
    newVal === "" ? setValue(0) : setValue(parseInt(newVal))
  };

  const emptyEgg:Egg =
    {
      owner: account,
      tokenId: "",
      animalId: "",
      parent1: "",
      parent2: "",
      basic: true
    }
  
  const handleSubmit = async () => {
    const testEggs = []
    console.log("value", value)
    for (let i = 0; i < value; i++) {
      const toSet: Egg = { ...emptyEgg }
      toSet.tokenId = String(Math.floor(Math.random()*100000000)+1) //to be changed
      toSet.animalId = String(Math.floor(Math.random()*4)+1)
      testEggs.push(toSet)
    }
    console.log(testEggs)
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
        <StyledRow>
          <EggInput value={value} onChange={changed()} />
          <ArrowBottom onClick={decreaseEgg} />
          <ArrowUp onClick={increaseEgg} />
        </StyledRow>
        <Flex justifyContent="center" flexDirection="row" mt="16px">
        <BorderButton scale="sm" onClick={()=>handleSubmit()}>
          Submit
          </BorderButton>
          </Flex>
      </Modal>
    </ModalWrapper>
  )
}

export default BuyEggs

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
import Moralis from "moralis";

Moralis.initialize("16weSJXK4RD3aYAuwiP46Cgzjm4Bng1Torxz5qiy");

Moralis.serverURL = "https://dblpeaqbqk32.usemoralis.com:2053/server";

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
  * {
    color: ${({ theme }) => theme.colors.text};
  }
`

const EggInput = styled.input.attrs({ 
  type: 'string',
  min: 1
})`
  width: 80%;
  line-height: 1.5rem;
  margin-top: -2px;
  align-items: center;
  background: #CDB7C3;
  text-transform: uppercase;
  border-radius: 4px;
  transition: all 0.2s;
  display: inline-block;
  text-shadow: x-offset y-offset blur color;
  text-decoration: none;
  border: 1px solid #230616;
  color: black;
  -webkit-box-shadow: inset 0px 1px 0px 0px #925677;
  -moz-box-shadow: inset 0px 1px 0px 0px #925677;
  box-shadow: inset 0px 1px 0px 0px #925677;
  -moz-appearance: textfield;
  ::-webkit-inner-spin-button{
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-outer-spin-button{
    -webkit-appearance: none;
    margin: 0;
  }
  padding-left: 4px;
`
const ArrowBottom = styled.div`
  width: 0;
  height: 0;
  border-left: calc(0.9rem - 2px) solid transparent;
  border-right: calc(0.9rem - 2px) solid transparent;
  border-top: calc(0.9rem - 2px) solid #DF4C97;
  border-radius: 1px;
  font-size: 0;
  line-height: 0;
  position: absolute;
  right: 40px;
  margin-top: calc(0.9rem + 3px);
  box-shadow: ${({ theme }) => theme.colors.boxShadow};
  &:hover {
    cursor: pointer;
  }
`

const ArrowUp = styled.div`
  width: 0;
  height: 0;
  border-left: calc(0.9rem - 2px) solid transparent;
  border-right: calc(0.9rem - 2px) solid transparent;
  border-bottom: calc(0.9rem - 2px) solid #DF4C97;
  font-size: 0;
  line-height: 0;
  position: absolute;
  box-shadow: ${({ theme }) => theme.colors.boxShadow};
  right: 40px;
  margin-top: -2px;
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
    const newVal = e.target.value
    newVal === "" ? setValue(0) : setValue(parseInt(newVal))
  };

  const emptyEgg:Egg =
    {
      owner: account,
      tokenID: "",
      kind: "",
      parentA: "",
      parentB: "",
      basic: true
    }
  
    const handleSubmit = async () => {
      const testEggs = [];
      console.log("value", value);
      for (let i = 0; i < value; i++) {
         const toSet: Egg = { ...emptyEgg };
         const tokenID = Math.floor(Math.random() * 100000000) + 1;
         const kind = String(Math.floor(Math.random() * 4) + 1);
         toSet.tokenID = String(tokenID); //to be changed
         toSet.kind = kind;
         const EggObject = Moralis.Object.extend("FinalEggs");
         const current = new EggObject();

         // EggID Owner Burned Type MetaURI TokenURI ParentA ParentB
         current.set("EggID", tokenID);
         current.set("Owner", account);
         current.set("Burned", false);
         current.set("MetaURI", "");
         current.set("TokenURI", "");
         current.set("AnimalTypeID", kind);
         current.set("Type", "basic");
         await current.save();

         testEggs.push(toSet);
         console.log(toSet);

         const TransOb = Moralis.Object.extend("Transactions")
         const newTrans = new TransOb

         newTrans.set("From", account)
         newTrans.set("Action", "Bought Egg")
         newTrans.set("TokenID", tokenID)
         newTrans.save()
      }
      // console.log(testEggs)
      // dispatch(addEggs(testEggs))
      onDismiss();
   };

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

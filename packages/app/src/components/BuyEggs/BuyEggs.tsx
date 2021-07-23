import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Modal } from '../Modal'
import { Label, Text } from 'components/Text'

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
  margin: auto;
`

const SubmitBtn = styled.input.attrs({ 
  type: 'submit',
  min: 1,
  defaultValue: 1
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
  onDismiss?: () => void
}

const BuyEggs: React.FC<EggModalProps> = ({ onDismiss }) => {
  return (
    <ModalWrapper>
      <Modal
        title='How many egg?'
        onDismiss={onDismiss}
        style={{ justifyContent: 'space-between' }}
      >
        <Text
          fontSize="20px"
          style={{ whiteSpace: 'nowrap', marginTop: '5px', marginLeft: '28px' }}
        >
          AMOUNT
        </Text>
        <EggInput type="number" />
        <SubmitBtn />
      </Modal>
    </ModalWrapper>
  )
}

export default BuyEggs

import { CloseIcon } from 'components'
import { IconButton as Icon } from 'components/Button'
import React, { useState } from 'react'
import styled from 'styled-components'
import {NewAnimalCardType} from './types'

const Card = styled.div<{url?: string, isMobile?: boolean}>`
    background-image: url(${({ url }) => `${url}`});
    background-position: center; 
    background-repeat: no-repeat;
    background-size: cover;
    width: 100vw;
    // max-width: 425px;
    // min-width: 325px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: space-between;
    position: fixed;
    top: 0;
    left: 0;
`
const IconButton = styled(Icon)`
    align-self: flex-end;
    margin: 10px;
    border: none;
    & svg {
        fill: ${({theme}) => theme.colors.primaryDark};
    } 
`

const Span = styled.span`
    color: ${({theme}) => theme.colors.text};
    font-size: 24px;
    width: 100%;
    font-weight: 900;
    text-align: center;
    postion: relative;
    margin-bottom: 15px;
    ;
`

const NewAnimalCard: React.FC<NewAnimalCardType> = ({animal, isOpen}) => {

    const ModalCloseButton: React.FC = () => {
        return (
          <IconButton variant="text" onClick={()=>isOpen(false)} aria-label="Close the dialog">
            <CloseIcon color="text" />
          </IconButton>
        );
      };

      console.log(window.innerHeight)

    return (
        <>
        <Card url={animal.imageUrl} style={{height: "calc(100vh - 64px)"}}>
            <ModalCloseButton />
            <Span>{animal.bloodline === "pure" ? `${animal.name} - ${animal.rarity}` : `${animal.name}`} </Span>
        </Card>
        </>
    )
}

export default NewAnimalCard
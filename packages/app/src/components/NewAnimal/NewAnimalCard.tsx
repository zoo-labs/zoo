import { CloseIcon, Flex } from 'components'
import { IconButton as Icon } from 'components/Button'
import React, { useState } from 'react'
import styled from 'styled-components'
import { RarityColor } from "enums/rarity-color";
import { NewAnimalCardType } from './types'

const Card = styled.div<{url?: string, isMobile?: boolean}>`
    background-image: url(${({ url }) => `${url}`});
    background-position: center; 
    background-repeat: no-repeat;
    background-size: cover;
    width: 100vw;
    height: 100vh;
    // max-width: 425px;
    // min-width: 325px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: space-between;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
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


      console.log(window.innerHeight)

      const rarityColor = RarityColor[animal.rarity.toLowerCase()] || "white";

      const rarity = () => {
          return (
              <Span style={{
                color: rarityColor,
              }}>
                  {animal.rarity}
              </Span>
          )
      }
    return (
        <>
        <Card url={animal.imageUrl} onClick = {()=>isOpen(false)} >
            <div>
                
            </div>
            <Flex flexDirection="column" justifyContent="center">
                <Span> {animal.name} </Span>
                <Span style={{
                    color: rarityColor,
                }}>
                    {animal.rarity}
                </Span>
            </Flex>
        </Card>
        </>
    )
}

export default NewAnimalCard
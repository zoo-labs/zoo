import { CloseIcon, Flex } from "components";
import { IconButton as Icon, Text } from "components";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { RarityColor } from "enums/rarity-color";
import { NewAnimalCardType } from "./types";
import {useMatchBreakpoints} from "../../hooks";

const Card = styled.div<{ url?: string; isMobile?: boolean }>`
   background-image: url(${({ url }) => `${url}`});
   background-position: center;
   background-repeat: no-repeat;
   background-size: ${(props) => props.isMobile ? "cover" : "contain"};
   width: 100%;
   height: 110vh;
   // max-width: 425px;
   // min-width: 325px;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   position: fixed;
   top: -64px;
   left: 0;
   z-index: 103;

   -webkit-animation: fadein 2s linear forwards;
   animation: fadein 2s linear forwards;

   @-webkit-keyframes fadein {
      0%,
      100% {
         opacity: 0;
      }
      50%,
      100% {
         opacity: 1;
      }
   }

   @keyframes fadein {
      0%,
      100% {
         opacity: 0;
      }
      50%,
      100% {
         opacity: 1;
      }
   }
`;

const IconButton = styled(Icon)`
   align-self: flex-end;
   margin: 10px;
   border: none;
   & svg {
      fill: ${({ theme }) => theme.colors.primaryDark};
   }
`;

const Span = styled.span`
   color: ${({ theme }) => theme.colors.text};
   font-size: 24px;
   width: 100%;
   font-weight: 900;
   text-align: center;
   position: relative;
   margin-bottom: 15px; ;
`;

const CardOverlay = styled.div`
   height: 100%;
   width: 100%;
   background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0) 60%,
      rgba(0, 0, 0, 0.8)
   );

   * {
      text-shadow: 2px 0 0 #0000006e, 0 -2px 0 #0000006e, 0 2px 0 #000,
         -2px 0 0 #0000006e;
   }
`;

const NewAnimalCard: React.FC<NewAnimalCardType> = ({ animal, isOpen }) => {
    const { isXs, isXl } = useMatchBreakpoints();
   console.log(window.innerHeight);

   const rarityColor = RarityColor[animal.rarity.toLowerCase()] || "white";

   const rarity = () => {
      return (
         <Span
            style={{
               color: rarityColor,
            }}>
            {animal.rarity}
         </Span>
      );
   };
   return (
      <>
         <Card url={animal.imageUrl} isMobile={isXs} onClick={() => isOpen(false)}>
             <CardOverlay>
               <Flex
                  height={"100vh"}
                  flexDirection="column"
                  justifyContent="flex-end">
                  <Span
                     style={{
                        color: "#FFFFFF",
                     }}>
                     {animal.name}
                  </Span>
                  <Span
                     style={{
                        color: rarityColor,
                        marginBottom: "7vh",
                     }}>
                     {animal.rarity}
                  </Span>
               </Flex>
            </CardOverlay>
         </Card>
      </>
   );
};

export default NewAnimalCard;

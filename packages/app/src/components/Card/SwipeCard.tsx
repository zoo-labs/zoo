import React, { useState } from 'react'
import styled from 'styled-components'
import {
  Flex,
  Text,
  useMatchBreakpoints,
  Heading,
  Card as Existing,
  CardHeader,
  CardBody,
  CardFooter,
  VideoPlayer
} from "components";
import { useModal } from "components/Modal";
import { useWeb3React } from '@web3-react/core'
import HatchModal from "components/ZooModals/HatchModal"
import { Animal } from 'entities/zooentities'
// import { EggCardType } from './types'
import { burnEgg, addAnimal } from "state/actions"
import { useDispatch } from 'react-redux'
import NewAnimalCard from 'components/NewAnimal/NewAnimalCard';
import { Link } from 'react-router-dom';


const InfoBlock = styled.div`
padding: 4px;
text-align: center;
position: absolute;
left: 0;
bottom: 0;
width: 100%;
z-index: 999999;
background: ${({ theme }) => theme.colors.background};
`;

const TextWrapper = styled.div`
text-shadow: 0px 2px rgba(0, 0, 0, 0.2);
font-size: 14px;
color: #ffffff;
font-weight: 550;
line-height: 1.5;
letter-spacing: 3px;
text-transform: uppercase;
`

const TimeoutWrapper = styled.div < { barwidth?: string }>`
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
  line-height: 1.8;
  // background: white;
  text-align: center;
  color: white;
  padding: 4px;
  text-align: center;
  width: 100%;
  background-color: #A7565E;
  z-index: 999999;
    ::before {
      content: '';
      display: block;
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    //   width: ${({ barwidth }) => barwidth};
      background: grey;
    }
`
const TimeoutDisplay = styled.span`
  position: relative;
  z-index: 2;
`

const BreedWrapper = styled.div<{ cols?: number }>`
  text-shadow: 0px 2px rgba(0, 0, 0, 0.2);
  font-size: 18px;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 550;
  line-height: 1.5;
  letter-spacing: 3px;
  text-transform: uppercase;
`;


const Card = styled(Existing) <{ selected?: boolean, timedOut?: boolean, rarityColor: string }>`
  cursor: pointer;
  width: 100%;
  margin: 8px;
  box-shadow: ${(props) => `0px 0px 13px -2px ${props.rarityColor}`};
  backgroundColor: "#000000";
  display: inline-block;
  border-radius: 8px;
   border: ${({ selected }) => (selected ? "2px solid white" : null)};
  opacity: ${({ timedOut }) => (timedOut ? "0.6" : null)};

`;


export interface SwiperCardProps {
  // animal: {[key: string]: Animal};
  animal?;
  group?;
  egg?;
  eggType?: string;
  onCardClick?: (...args: any[]) => void;
  onInfoClick?: () => void;
  isTimedOut?: boolean;

}
// const basicEggURL = window.location.origin + '/static/images/basic.png'
// const hybridEggURL = window.location.origin + '/static/images/hybrid.jpeg'



// export const SwiperCard: React.FC<SwiperCardProps> = ({ imageURL, onCardClick, onInfoClick, egg, hatchEgg, eggGroup }) => {
export const SwiperCard: React.FC<SwiperCardProps> = ({ egg, animal, group, eggType, onCardClick, onInfoClick }) => {
  return (
    <>
      <Card
        rarityColor={animal.rarityColor}
        onClick={onCardClick}
        key={animal.id}
        selected={animal.selected ? true : false}
        timedOut={animal.timeRemaining > 0 ? true : false}
      >
        <CardBody style={{
          backgroundImage: `url("${animal.imageUrl}")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          height: 280,
          // width: `calc(100vw/2.2 - 13px )`,
          width: "100%"
        }}>
          <Link
            to={`/feed/myzoo/${animal.tokenID}`}>
            <TextWrapper
              style={{
                textShadow:
                  "0px 2px 6px rgb(0, 0, 0)",
                fontSize: 18,
                letterSpacing: 0,
                position: "absolute",
                textTransform: "lowercase",
                right: 11,
                top: 9,
              }}>
              {animal.timeRemaining === 0
                ? group[animal.kind] > 1
                  ? `x${group[animal.kind]
                  }`
                  : ""
                : ""}

            </TextWrapper>
            <TextWrapper
              style={{
                textShadow:
                  "0px 2px 6px rgb(0, 0, 0)",
                textAlign: "center",
                fontSize: 16,
                letterSpacing: 0,
                height: "100%",
                // paddingRight: group[animal.kind] ? '26px' : null
              }} >
              {animal.name}
            </TextWrapper>
          </Link>
          {animal.timeRemaining > 0 ? (
            <TimeoutWrapper
              barwidth={
                animal.CTAOverride
                  ? animal.CTAOverride.barwidth
                  : 0
              }
            >
              <TimeoutDisplay>
                {`${animal.CTAOverride.timeRemainingDaysHours.days}D ${animal.CTAOverride.timeRemainingDaysHours.hours}H`}
              </TimeoutDisplay>
            </TimeoutWrapper>
          ) : (
            <InfoBlock
              onClick={onInfoClick}
            >
              <BreedWrapper>
                {eggType === "pure"
                  ? `BREED`
                  : animal.listed
                    ? "LISTED"
                    : `SELL`}
              </BreedWrapper>
            </InfoBlock>
          )}
        </CardBody>
      </Card>
    </>
  )
}

export default SwiperCard

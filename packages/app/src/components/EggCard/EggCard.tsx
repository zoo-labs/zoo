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
import { EggCardType } from './types'
import { burnEgg, addAnimal } from "state/actions"
import { useDispatch } from 'react-redux'
import { animalMapping } from 'util/animalMapping'
import NewAnimalCard from 'components/NewAnimal/NewAnimalCard';


const InfoBlock = styled.div`
padding: 4px;
text-align: center;
position: relative;
left: 0;
bottom: 0;
width: 100%;
z-index: 999999;
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
      height: 100%;
      width: ${({ barwidth }) => barwidth};
      background: grey;
    }
`
const TimeoutDisplay = styled.span`
  position: relative;
  z-index: 2;
`
const Card = styled(Existing) <{ timedOut?: boolean }>`
  cursor: pointer;
  width: 120px;
  margin: 0px 8px 8px; 
  backgroundColor: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  display: block;
  opacity: ${({ timedOut }) => (timedOut ? "0.6" : null)};
`;


const basicEggURL = window.location.origin + '/static/images/basic.jpg'
const hybridEggURL = window.location.origin + '/static/images/hybrid.jpg'

export const EggCard: React.FC<EggCardType> = ({ egg, hatchEgg }) => {

  const [onHatch] = useModal(
    <HatchModal

      confirmation={() => hatchEgg(egg)}
      onDismiss={() => null}
    />
  )
  // const eggType = egg.basic ? "BASIC" : "HYBRID";

  return (
    <>
      <Card onClick={egg.timeRemaining > 0 ? null : () => {
        onHatch()
      }} style={{ backgroundColor: '#000000' }} timedOut={egg.timeRemaining > 0 ? true : false}>
        <CardBody style={{ backgroundImage: `url("${egg.basic ? basicEggURL : hybridEggURL}")`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', height: 150, padding: 10 }}>
          <TextWrapper style={{width: '100%', textAlign: 'center', paddingLeft: '7px'}}>{egg.name}</TextWrapper>
        </CardBody>
        {egg.timeRemaining > 0 ?
          <TimeoutWrapper barwidth={egg.CTAOverride ? egg.CTAOverride.barwidth : 0}>
            <TimeoutDisplay >
              {`${egg.CTAOverride.timeRemainingDaysHours.days}D ${egg.CTAOverride.timeRemainingDaysHours.hours}H`}
            </TimeoutDisplay>
          </TimeoutWrapper> :
          <InfoBlock style={{ textAlign: 'center', boxShadow: '#000000 0px 0px 10px 1px', padding: 4 , paddingLeft: '7px'}} >
            <TextWrapper >{`HATCH`}</TextWrapper>
          </InfoBlock>
        }
      </Card>
    </>
  )
}

export default EggCard

import React, {useState} from 'react'
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
import {burnEgg, addAnimal} from "state/actions"
import { useDispatch } from 'react-redux'
import { animalMapping } from 'util/animalMapping'


const InfoBlock = styled.div`
padding: 4px;
text-align: center; 
position: relative;
left: 0;
bottom: 0; 
width: 100%;
background-color: #ffffff6b;
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
const Card = styled(Existing)<{ timedOut?: boolean }>`
  backgroundColor: "#000000";
  border-radius: 8px;
  opacity: ${({ timedOut }) => (timedOut ? "0.6" : null)};
`;


const basicEggURL = window.location.origin + '/static/images/basic.png'
const hybridEggURL = window.location.origin + '/static/images/hybrid.jpeg'

export const EggCard: React.FC<EggCardType> = ({egg})  => {
  const [ playVideo, setPlayVideo ] = useState(false)
  const dispatch = useDispatch()
  const { account } = useWeb3React()

    const hatchEgg = () => {
      setPlayVideo(true)
    }
  
    const [onHatch] = useModal(
      <HatchModal
  
          confirmation={hatchEgg}
          onDismiss={()=>null}
      />
    )

    const onVideoEnd = () => {
        setPlayVideo(false)
        console.log(egg)
        const eggStruct = {
            owner: egg.owner
        }
        console.log("BURNING")
        dispatch(burnEgg(egg))
        let randIdx;
        if(egg.basic){
            randIdx = Math.floor(Math.random() * (5 - 1) + 1);
        }
        else {
            randIdx = Math.floor(Math.random() * (13 - 10) + 10);
        }
        console.log(randIdx)
        const aFromMap = animalMapping[randIdx]
        console.log(aFromMap, randIdx)
        const newAnimal: Animal = {
            tokenId: Math.floor(Math.random() * (999999 - 0) + 0).toString(),
            animalId: aFromMap.animalId,
            name: aFromMap.name,
            description: aFromMap.description,
            yield: aFromMap.yield,
            boost: aFromMap.boost,
            rarity: aFromMap.rarity,
            dob: aFromMap.dob,
            imageUrl: aFromMap.imageUrl,
            startBid: aFromMap.startBid,
            currentBid: aFromMap.currentBid,
            buyNow: aFromMap.buyNow,
            listed: aFromMap.listed,
            bloodline: aFromMap.bloodline,
            owner: account,
            CTAOverride: { barwidth: null, timeRemainingDaysHours: null },
            timeRemaining: 0,
            breedCount: 0,
            lastBred: ""
        }
        dispatch(addAnimal(newAnimal)) 
    }


    const renderVideo = () => {
        return (
        <VideoPlayer videoPath={egg.basic ? "hatch_mobile_basic.mp4": "hatch_mobile_hybrid.mp4"} onDone={() => onVideoEnd()}/>
        )
    }
    const renderCard = () => {
        return (
            <Card style={{backgroundColor: '#000000'}} timedOut={egg.timeRemaining > 0 ? true : false}>
		    <CardBody style={{backgroundImage: `url("${egg.basic ? basicEggURL : hybridEggURL}")`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', height: 150, padding: 10}}>
                <TextWrapper>{egg.name}</TextWrapper>
                </CardBody>
                
                {egg.timeRemaining > 0 ?
                      <TimeoutWrapper barwidth={egg.CTAOverride ? egg.CTAOverride.barwidth : 0}>
                        <TimeoutDisplay >
                          {`${egg.CTAOverride.timeRemainingDaysHours.days}D ${egg.CTAOverride.timeRemainingDaysHours.hours}H`}
                        </TimeoutDisplay>
                      </TimeoutWrapper> :
                      <InfoBlock style={{textAlign: 'center', backgroundColor: '#ffffff38', padding: 4}} onClick={() => {onHatch()}}>
                        <TextWrapper >{`HATCH`}</TextWrapper>
                      </InfoBlock>
                    }
            </Card>
        )
    }

    return (
        playVideo ? renderVideo() : renderCard()
    )
}

export default EggCard

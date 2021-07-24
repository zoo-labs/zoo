import React, {useState} from 'react'
import styled from 'styled-components'
import {
  Flex,
  Text,
  useMatchBreakpoints,
  Heading,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  VideoPlayer
} from "components";
import { useModal } from "components/Modal";
import HatchModal from "components/ZooModals/HatchModal"
import { EggCardType } from './types'
import {burnEgg} from "state/actions"
import { useDispatch } from 'react-redux'


const InfoBlock = styled.div`
padding: 10px;
text-align: center; 
position: relative;
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

const basicEggURL = window.location.origin + '/static/images/basic.png'
const hybridEggURL = window.location.origin + '/static/images/hybrid.jpeg'

export const EggCard: React.FC<EggCardType> = ({egg})  => {
  const [ playVideo, setPlayVideo ] = useState(false)
  const dispatch = useDispatch()

    const hatchEgg = () => {
      console.log("HATCH")
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
        dispatch(burnEgg(egg))
    }


    const renderVideo = () => {
        return (
        <VideoPlayer videoPath="hatch_mobile_basic.mp4" onDone={() => onVideoEnd()}/>
        )
    }

    const renderCard = () => {
        return (
            <Card style={{backgroundColor: '#000000'}}>
                <CardBody style={{backgroundImage: `url("${egg.basic ? basicEggURL : hybridEggURL}")`, backgroundSize: 'cover', backgroundPosition: 'center', height: 150, padding: 10}}>
                <TextWrapper>{egg.name}</TextWrapper>
                </CardBody>
                <InfoBlock style={{textAlign: 'center', backgroundColor: '#ffffff38', padding: 10}} onClick={() => {onHatch()}}>
                <TextWrapper >{`HATCH`}</TextWrapper>
                </InfoBlock>
            </Card>
        )
    }

    return (
        playVideo ? renderVideo() : renderCard()
    )
}

export default EggCard
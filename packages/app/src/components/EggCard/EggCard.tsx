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
import { useWeb3React } from '@web3-react/core'
import HatchModal from "components/ZooModals/HatchModal"
import { Animal } from 'entities/zooentities'
import { EggCardType } from './types'
import {burnEgg, addAnimal} from "state/actions"
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
  const { account } = useWeb3React()

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

    const animalArray = [
        {
            tokenId:"6124124",
            name:"Red Panda",
            description:"Mystery",
            yield:"543",
            boost:"5678",
            rarity:"Legendary",
            dob:"1627064176",
            imageUrl:"https://i2.wp.com/bestlifeonline.com/wp-content/uploads/2018/10/red-panda-raising-fist.jpg?resize=640%2C360&ssl=1",
            startBid:"500",
            currentBid:"500",
            buyNow:"1000",
            listed:true,
            bloodline:"pure",
            owner: account
        },
        {
            tokenId: '234',
            name: 'Suzanne',
            description: 'LOL',
            'yield': '4223',
            boost: '2',
            rarity: 'Rare',
            dob: '1627064176',
            imageUrl: 'https://ichef.bbci.co.uk/images/ic/1200x675/p02k8mcv.jpg',
            startBid: '400',
            currentBid: '800',
            buyNow: '900',
            listed: true,
            bloodline: 'pure',
            owner: account
          },
          {
            tokenId: '31243',
            name: 'Cool Doggo',
            description: 'WOOF wO0F',
            'yield': '321',
            boost: '2',
            rarity: 'Uncommon',
            dob: '1627064176',
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIuXjTOdhD--589Qjr310qX4IgAZrz_4-RAw&usqp=CAU',
            startBid: '300',
            currentBid: '500',
            buyNow: '600',
            listed: true,
            bloodline: 'pure',
            owner: account
          },
          {
            tokenId: '41241',
            name: 'Seal',
            description: 'BARK',
            'yield': '31',
            boost: '22',
            rarity: 'Common',
            dob: '1627064176',
            imageUrl: 'https://sites.psu.edu/siowfa16/files/2016/09/baby-seal-29vsgyf.jpg',
            startBid: '200',
            currentBid: '201',
            buyNow: '300',
            listed: false,
            bloodline: 'pure',
            owner: account
          },
          {
            tokenId: '51241',
            name: 'Liger',
            description: 'Meow',
            'yield': '23',
            boost: '2200',
            rarity: 'Legendary',
            dob: '1627064176',
            imageUrl: 'https://newsfeed.time.com/wp-content/uploads/sites/9/2013/06/russia-zoo_yang-7.jpg?w=753',
            startBid: '200',
            currentBid: '201',
            buyNow: '300',
            listed: false,
            bloodline: 'hybrid',
            owner: account
          }
    ]

    const onVideoEnd = () => {
        setPlayVideo(false)
        console.log(egg)
        const eggStruct = {
            owner: egg.owner
        }
        console.log("BURNING")
        dispatch(burnEgg(egg))
        const randIdx = Math.floor(Math.random() * (6 - 0) + 0);
        console.log(randIdx)
        const newAnimal: Animal = animalArray[randIdx]
        dispatch(addAnimal(newAnimal)) 
    }


    const renderVideo = () => {
        return (
        <VideoPlayer videoPath={egg.basic ? "hatch_mobile_basic.mp4": "hatch_mobile_hybrid.mp4"} onDone={() => onVideoEnd()}/>
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
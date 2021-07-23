import React from 'react'
import styled from 'styled-components'
import {Text} from 'components'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import { IoPersonCircle } from "react-icons/io5";
import { FaMoneyBillWave, FaDollarSign } from "react-icons/fa";
import {Card as Existing } from 'components'
import { useMatchBreakpoints } from 'hooks';
import Moralis from 'moralis'
import { useHistory } from 'react-router-dom'
import { useModal } from "components/Modal";
import BidModal from 'components/MarketModals/BidModal'
import YieldModal from 'components/MarketModals/YieldModal'


const Container = styled.div<{isMobile?: boolean}>`

    height: ${({ isMobile }) => isMobile? `100vh`: null};
    display: ${({ isMobile }) => isMobile? null : "flex"};
    flex-direcetion: row;
    flex-wrap: wrap;
`
const Card = styled.div<{url?: string}>`
    width: 100vw;
    display: flex;
    flex-direction: column;
    background-image: url(${({ url }) => `${url}`});
    background-position: center; 
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    height: 100vh;
    max-height: 773px;
    max-width: 425px;
    ${({ theme }) => theme.mediaQueries.sm} {
      }
`
const FirstThird = styled.div`
    height: 33vh;
    width: 100%;
    max-height: 256px;

`
const SecondThird = styled.div`
    height: 33vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    max-height: 256px;
`
const FinalThird = styled.div`
    height: 33vh;
    width: 100%;
    padding-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-height: 256px;
`
const IconButton = styled.button`
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 9999999;
    align-items: center;
    background: none;
    border: none;
    outline: none;
    width: 80px;
    & span {
        text-align: center;
        font-weight: bold;
        width: 100%;
        color: black;
        -webkit-text-fill-color: white;
        -webkit-text-stroke-width: 1px;
        -webkit-text-stroke-color: black;
    }
    & svg {
        height: 24px;
        width: 24px;
        fill: white;
        stroke: black;
        stroke-width: 15px;
    }
`
const MainHeading = styled(Text)`
    font-size: 20px;
    width: 100%;
    color: black;
    font-weight: 900;
    -webkit-text-fill-color: white;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: black;
`
const Subheading = styled(Text)`
    width: 100%;
    color: black;
    font-weight: 800;
    font-size: 18px;
    -webkit-text-fill-color: white;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: black;
    :nth-child(3){
        font-size: 16px;
        font-weight: 600;
        
    }
`
const Card2 = styled(Existing)<{url?: string}>`
    background-image: url(${({ url }) => `${url}`});
    background-position: center; 
    background-repeat: no-repeat;
    background-size: cover;
    max-height: 773px;
    max-width: 425px;
`


Moralis.initialize("16weSJXK4RD3aYAuwiP46Cgzjm4Bng1Torxz5qiy");

Moralis.serverURL = "https://dblpeaqbqk32.usemoralis.com:2053/server"



export default function Marketplace() {
    const {isXs, isSm, isMd} = useMatchBreakpoints()
    const isMobile = isXs || isSm || isMd
    const queryObject = Moralis.Object.extend("Animals")
    const [animals, setAnimals] = React.useState([])
    const history = useHistory()
    const temp = {}
    const ypd = {}

    const [onBid] = useModal(
        <BidModal
            item = {temp}
            onDismiss={()=>null}
            Moralis = {Moralis}
        />
    )

    const onBidInfo = (item) => {
        temp["CurrentBid"] = item.get("CurrentBid")
        temp["Name"] = item.get("Name")
        temp["BuyNow"] = item.get("BuyNow")
        temp["AnimalId"] = item.get("AnimalID")
        onBid()
    }

    const [onYield] = useModal(
        <YieldModal
            item={temp}
            onDismiss={() => null}
            Moralis={Moralis}
        />
    )

    const onYieldInfo = (animal) => {
        ypd['Name'] = animal.get("Name")
        ypd['currentBlock'] = 'currentBlockNumber'
        ypd['birthBlock'] = 'birthBlockNumber'
        ypd['divideBy'] = '28800'
        ypd['animalYield'] = 'yieldOfAnimal'
        ypd['price'] = '0'
        onYield()
    }


    React.useEffect(()=>{
        getAnimals()
    },[])

    const HomeClick = () => {
        history.push("/account")
    }

    const getAnimals = async () => {
        const query = new Moralis.Query(queryObject)
        query.limit(1000)
        const results = await query.find()
        setAnimals(results)
    }

    return (
    <Container isMobile = {isMobile}>
        {   isMobile?
            <Swiper
                spaceBetween={50}
                slidesPerView={isMobile? 1 : 3}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
            {animals.map(item => {
                return (
                    <SwiperSlide key = {item.get("ObjectID")}>
                        <Card2 url={item.get("ImageURL")}>
                            <FirstThird/>
                            <SecondThird>
                               
                                <IconButton onClick={() => { onYieldInfo(item) }}><FaMoneyBillWave /><Text as="span">Yield</Text></IconButton>
                                <IconButton onClick={()=>{onBidInfo(item)}}><FaDollarSign /><Text as = "span">Bid</Text></IconButton>
                                <IconButton onClick={()=>{HomeClick()}}><IoPersonCircle/><Text as = "span">Home</Text></IconButton>
                            </SecondThird>
                            <FinalThird>
                                <MainHeading bold as = "p">{item.get("Name")}</MainHeading>  
                                <Subheading bold as = "p">{item.get("Rarity")}</Subheading>  
                                <Subheading bold as = "p">{`Born: ${item.get("Born")}`}</Subheading>  
                            </FinalThird>
                        </Card2>
                        
                    </SwiperSlide>
                )
            })}
            </Swiper>
            : 
            animals.map(item => {
                return (
                    <Card2 url={item.get("ImageURL")} key = {item.get("ObjectID")}>
                    <FirstThird/>
                    <SecondThird>
                        <IconButton onClick={() => { onYieldInfo(item) }}><FaMoneyBillWave /><Text as = "span">Yield</Text></IconButton>
                        <IconButton onClick={()=>{onBidInfo(item)}}><FaDollarSign /><Text as = "span">Bid</Text></IconButton>
                        <IconButton onClick={()=>{HomeClick()}}><IoPersonCircle/><Text as = "span">Home</Text></IconButton>
                    </SecondThird>
                    <FinalThird>
                        <MainHeading bold as = "p">{item.get("Name")}</MainHeading>  
                        <Subheading bold as = "p">{item.get("Rarity")}</Subheading>  
                        <Subheading bold as = "p">{`Born: ${item.get("Born")}`}</Subheading>  
                    </FinalThird>
                </Card2>
                )
            })
        }   
    </Container> 
    )
}

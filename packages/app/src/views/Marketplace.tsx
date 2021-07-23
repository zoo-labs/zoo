import React from 'react'
import styled from 'styled-components'
import {Text} from 'components'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import { useSelector } from 'react-redux'
import { IoPersonCircle } from "react-icons/io5";
import { FaMoneyBillWave, FaDollarSign } from "react-icons/fa";
import {Card as Existing } from 'components'
import { useMatchBreakpoints } from 'hooks';
import Moralis from 'moralis'
import { AppState } from 'state/index'
import { useHistory } from 'react-router-dom'
import { useModal } from "components/Modal";
import BidModal from 'components/MarketModals/BidModal'
import {useMoralisSubscription} from "react-moralis"
import { Animal } from "entities/zooentities";


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
    const animalsState = useSelector<AppState, AppState['zoo']['animals']>((state) => state.zoo.animals)
    const {isXs, isSm, isMd} = useMatchBreakpoints()
    const isMobile = isXs || isSm || isMd
    const queryObject = Moralis.Object.extend("Animals")
    const [animals, setAnimals] = React.useState([])
    const history = useHistory()
    let temp: Animal = {...Object.values(animalsState)[0]}

    const [onBid] = useModal(
        <BidModal
            item = {temp}
            onDismiss={()=>null}
        />
    )

    const onBidInfo = (item) => {
        temp = {...item}
        onBid()
    }

    React.useEffect(()=>{
        console.log("animals", animalsState)
        getAnimals()
    },[animalsState])

    const HomeClick = () => {
        history.push("/account")
    }

    const getAnimals = async () => {

        // const query = new Moralis.Query(queryObject)
        // query.limit(1000)
        // query.equalTo("Listed", true)
        // const results = await query.find()
        setAnimals(Object.values(animalsState))
    }

    // useMoralisSubscription("Animals", q => q, [], {
    //     onUpdate: data => getAnimals(),
    //   });


    return (
    <Container isMobile = {isMobile}>
        {   isMobile?
            <Swiper
                // spaceBetween={50}
                slidesPerView={isMobile? 1 : 3}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                direction={'vertical'}
            >
            {animals.filter((item)=> item.listed).map(item => {
                const date = new Date(item.dob * 1000)
                const StringDate = date.toLocaleDateString("en-US")
                return (
                    <SwiperSlide key = {item.tokenId}>
                        <Card2 url={item.imageUrl}>
                            <FirstThird/>
                            <SecondThird>
                                <IconButton onClick={()=>{alert("Some Yield Component")}}><FaMoneyBillWave /><Text as = "span">Yield</Text></IconButton>
                                <IconButton onClick={()=>{onBidInfo(item)}}><FaDollarSign /><Text as = "span">Bid</Text></IconButton>
                                <IconButton onClick={()=>{HomeClick()}}><IoPersonCircle/><Text as = "span">Home</Text></IconButton>
                            </SecondThird>
                            <FinalThird>
                                <MainHeading bold as = "p">{item.name}</MainHeading>  
                                <Subheading bold as = "p">{item.rarity}</Subheading>  
                                <Subheading bold as = "p">{`Born: ${StringDate}`}</Subheading>  
                            </FinalThird>
                        </Card2>
                    </SwiperSlide>
                )
            })}
            </Swiper>
            : 
            animals.map(item => {
                return (
                    <Card2 url={item.imageUrl} key = {item.tokenId}>
                    <FirstThird/>
                    <SecondThird>
                        <IconButton onClick={()=>{alert("Some Yield Component")}}><FaMoneyBillWave /><Text as = "span">Yield</Text></IconButton>
                        <IconButton onClick={()=>{onBidInfo(item)}}><FaDollarSign /><Text as = "span">Bid</Text></IconButton>
                        <IconButton onClick={()=>{HomeClick()}}><IoPersonCircle/><Text as = "span">Home</Text></IconButton>
                    </SecondThird>
                    <FinalThird>
                        <MainHeading bold as = "p">{item.name}</MainHeading>  
                        <Subheading bold as = "p">{item.rarity}</Subheading>  
                        <Subheading bold as = "p">{`Born: ${item.born}`}</Subheading>  
                    </FinalThird>
                </Card2>
                )
            })
        }   
    </Container> 
    )
}

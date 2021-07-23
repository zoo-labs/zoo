
import React from 'react'
import styled from 'styled-components'
import {Text} from 'components'
import { IoPersonCircle } from "react-icons/io5";
import { FaMoneyBillWave, FaDollarSign } from "react-icons/fa";
import { useHistory } from 'react-router-dom'
import { useModal } from "components/Modal";
import {Card as Existing } from 'components'
import BidModal from 'components/MarketModals/BidModal'
import { Animal } from "entities/zooentities";
import YieldModal from 'components/MarketModals/YieldModal';

interface Props {
    item: Animal,
    url?: string
}

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
        height: 30px;
        width: 30px;
        fill: white;
        stroke: black;
        stroke-width: 15px;
    }
`
const MainHeading = styled(Text)`
    font-size: 32px;
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
    font-size: 24px;
    -webkit-text-fill-color: white;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: black;
    :nth-child(3){
        font-size: 24px;
        font-weight: 600;
    }
`

const Card = styled(Existing)<{url?: string}>`
    background-image: url(${({ url }) => `${url}`});
    background-position: center; 
    background-repeat: no-repeat;
    background-size: cover;
    max-height: 773px;
    max-width: 425px;
`
const MarketplaceCard: React.FC<Props> =  ({ item }) => {
    const history = useHistory()
    const ypd = {}
    const HomeClick = () => {
        history.push("/account")
    }
    // const date = new Date(item.dob * 1000)
    // const StringDate = date.toLocaleDateString("en-US")

    const [onYield] = useModal(
        <YieldModal
            onDismiss={() => null}
        />
    )

    const onYieldInfo = (animal) => {
        ypd['Name'] = item.name
        ypd['currentBlock'] = "1291412"
        ypd['birthBlock'] = "1234731"
        ypd['divideBy'] = "28800"
        ypd['animalYield'] = 'yieldOfAnimal'
        ypd['price'] = '0'
        onYield()
    }
    
    const [onBid] = useModal(
        <BidModal
            item = {item}
            onDismiss={()=>null}
        />
    )

    const onBidInfo = () => {
        onBid()
    }
  
    const timestampRaw = new Date(Number(item.dob) * 1000).toISOString()
    const timestampConverted = timestampRaw.replace('T', ' ').substring(0, timestampRaw.length - 5)

    return(
        <>
            <Card url={item.imageUrl}>
                <FirstThird/>
                <SecondThird>
                    <IconButton onClick={()=>{alert("Some Yield Component")}}><FaMoneyBillWave /><Text as = "span" fontSize="18px">Yield</Text></IconButton>
                    <IconButton onClick={()=>{onBid()}}><FaDollarSign /><Text as = "span" fontSize="18px">Bid</Text></IconButton>
                    <IconButton onClick={()=>{HomeClick()}}><IoPersonCircle/><Text as = "span" fontSize="18px">Home</Text></IconButton>
                </SecondThird>
                <FinalThird>
                    <MainHeading bold as = "p">{item.name}</MainHeading>  
                    <Subheading bold as = "p">{item.rarity}</Subheading>  
                    <Subheading bold as = "p">{`Born: ${timestampConverted}`}</Subheading>  
                </FinalThird>
            </Card>
        </>
    )
}

export default MarketplaceCard
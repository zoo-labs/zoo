import React from "react";
import styled from "styled-components";
import { Text } from "components";
import { FaMoneyBillWave, FaDollarSign } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { useModal } from "components/Modal";
import { Card as Existing, Flex } from "components";
import BidModal from "components/MarketModals/BidModal";
import { Animal } from "entities/zooentities";
import YieldModal from "components/MarketModals/YieldModal";
import { RarityColor } from "enums/rarity-color";
import { ChevronLeftIcon } from 'components/Svg'
import ZooHomeButton from "components/SideMenu/components/ZooHomeButton";

interface Props {
  item: Animal;
  url?: string;
  animalGroup?: { [key: string]: number };
}

const FirstThird = styled.div`
   height: 35vh;
   width: 100%;
   // max-height: 256px;
`;
const SecondThird = styled.div`
   height: 35vh;
   width: 100%;
   display: flex;
   flex-direction: column;
   align-items: flex-end;
   // max-height: 256px;
`;
const FinalThird = styled.div`
  height: 35vh;
  width: 100%;
  padding-left: 15px;
   padding-bottom: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-height: 256px;
`;
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
      color: ${({ theme }) => theme.colors.text};
      -webkit-text-fill-color: ${({ theme }) => theme.colors.text};
      -webkit-text-stroke-width: 0.2px;
      -webkit-text-stroke-color: #a9a9a9;
   }
   & svg {
      height: 40px;
      width: 40px;
      // fill: ${({ theme }) => theme.colors.primaryLight};
      fill: ${({ theme }) => theme.colors.text};
      stroke: #a9a9a9;
      // text-shadow: 1px 1px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black;
      // stroke: ${({ theme }) => theme.colors.text};
      stroke-width: 15px;
   }
`;
const MainHeading = styled(Text)`
   font-size: 32px;
   width: 100%;
   line-height: 1;
   color: ${({ theme }) => theme.colors.primary};
   font-weight: 900;
   -webkit-text-fill-color: ${({ theme }) => theme.colors.text};
   -webkit-text-stroke-width: 0.5px;
   -webkit-text-stroke-color: ${({ theme }) => theme.colors.text};
`;
const Subheading = styled(Text)`
   width: 100%;
   color: black;
   font-weight: 500;
   font-size: 24px;
   -webkit-text-fill-color: ${({ theme }) => theme.colors.text};
   -webkit-text-stroke-width: 0.2px;
   -webkit-text-stroke-color: #a9a9a9;
   :nth-child(3) {
      font-size: 24px;
      font-weight: 600;
   }
`;

const Card = styled(Existing)<{ url?: string; isMobile?: boolean }>`
   background-image: url(${({ url }) => `${url}`});
   background-position: center;
   background-repeat: no-repeat;
   background-size: cover;
   // max-height: 773px;
   max-width: 425px;
   min-width: 325px;
   display: block;
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
      text-shadow: 2px 0 0 #0000006e, 0 -2px 0 #0000006e, 0 2px 0 #000, -2px 0 0 #0000006e;
   }
`;

const StyledChevron = styled(ChevronLeftIcon)`
   width: 40px;
   height: 40px;
`;

const ActionButonContainer = styled.div`
  width: 80px;
  display: flex;
  position: fixed;
  right: 0;
  bottom: 20px;
  flex-direction: row;
  // align-items: end;
  justify-content: flex-end;
 
`

const FeedCard: React.FC<Props> = ({ item, animalGroup }) => {
  const history = useHistory();
  const ypd = {};
  const date = new Date(Number(item.dob) * 1000);
  const StringDate = date.toLocaleDateString("en-US");

  const [onYield] = useModal(<YieldModal item={item} animalGroup={animalGroup} onDismiss={() => null} />);

   const [onBid] = useModal(<BidModal item={item} onDismiss={() => null} />);

   const onBidInfo = () => {
      onBid();
   };

  const rarityColor = RarityColor[item.rarity.toLowerCase()] || "white";
  const multiplier = animalGroup[item.animalId] > 1 ? `x${animalGroup[item.animalId]}` : "";

  return (
    <>
      <Card url={item.imageUrl}>
        <CardOverlay>
        <FirstThird />
        <SecondThird>
          
        </SecondThird>
        <FinalThird>
          <Flex flexDirection="row">
            <Flex flexDirection="column" width="calc(100% - 75px)"
                  style={{textShadow: "2px 0 0 #000, 0 -2px 0 #000, 0 2px 0 #000, -2px 0 0 #000"}}>
              <MainHeading
                bold
                as="p"
              >
                {`${item.name} ${multiplier}`}
              </MainHeading>
              <Subheading bold as="p"
                style={{
                  WebkitTextFillColor: rarityColor,
                  WebkitTextStrokeColor: rarityColor,
                }}>
                {item.rarity}
              </Subheading>
              <Subheading bold as="p">{`Born: ${StringDate}`}</Subheading>
              <Subheading bold as="p">{`Current Bid: ${item.currentBid}`}</Subheading>
            </Flex>
          <ActionButonContainer> 
              <Flex width="100%"
                  height="100%"
                // maxWidth="60px"
                  flexDirection="column"
              >
              <IconButton
                onClick={() => {
                  onYield();
                  }}
                  style={{padding: "10px 0px"}}
              >
                <FaMoneyBillWave />
                {/* <Text as="span" fontSize="18px">
                  Yield
                </Text> */}
              </IconButton>
              <IconButton
                onClick={() => {
                  onBid();
                  }}
                    style={{padding: "10px 0px"}}
              >
                <FaDollarSign />
                {/* <Text as="span" fontSize="18px" pb="5px">
                  Bid
                </Text> */}
              </IconButton>
                <ZooHomeButton /> </Flex>
              </ActionButonContainer>
          </Flex> 
        </FinalThird>
        </CardOverlay>
      </Card>
    </>
  );
};

export default FeedCard;

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

interface Props {
  item: Animal;
  url?: string;
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

const StyledChevron = styled(ChevronLeftIcon)`

  width: 40px;
  height: 40px;
`

const FeedCard: React.FC<Props> = ({ item }) => {
  const history = useHistory();
  const ypd = {};
  const date = new Date(Number(item.dob) * 1000);
  const StringDate = date.toLocaleDateString("en-US");

  const [onYield] = useModal(<YieldModal item={item} onDismiss={() => null} />);

  const [onBid] = useModal(<BidModal item={item} onDismiss={() => null} />);

  const onBidInfo = () => {
    onBid();
  };

  const rarityColor = RarityColor[item.rarity.toLowerCase()] || "white";

  return (
    <>
      <Card url={item.imageUrl}>
        <FirstThird />
        <SecondThird>
          
        </SecondThird>
        <FinalThird>
          <Flex flexDirection="row">
            <Flex flexDirection="column" width="calc(100% - 75px)">
              <MainHeading
                bold
                as="p"
              >
                {item.name}
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
            <Flex flexDirection="column" width="75px">
              <IconButton
                onClick={() => {
                  onYield();
                }}
              >
                <FaMoneyBillWave />
                <Text as="span" fontSize="18px">
                  Yield
                </Text>
              </IconButton>
              <IconButton
                onClick={() => {
                  onBid();
                }}
              >
                <FaDollarSign />
                <Text as="span" fontSize="18px">
                  Bid
                </Text>
              </IconButton>
            </Flex>
          </Flex>
        </FinalThird>
      </Card>
    </>
  );
};

export default FeedCard;

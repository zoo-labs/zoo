import React, { useState, useRef, useEffect } from "react";
import { Route, useRouteMatch } from "react-router-dom";
// import { AppState } from "state"
// import { useSelector } from "react-redux"
import { useWeb3React } from "@web3-react/core";
import styled from "styled-components";
import FlexLayout from "components/layout/Flex";
import Page from "components/layout/Page";
import { orderBy, parseInt } from "lodash";
import {
  Flex,
  Text,
  useMatchBreakpoints,
  Heading,
  Card,
  CardBody,
  CardFooter,
  CardContent,
} from "components";
import { VscLoading } from "react-icons/vsc";
// import { ViewMode } from "./components/types"

const IconCont = styled.div`
  display: flex;
  justify-content: center;
  & svg {
    color: ${({ theme }) => theme.colors.primary};
    animation: spin 2s ease infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
const InfoBlock = styled.div`
  padding: 24px;
`;

const _loadCount = 9;

const EggMarketplace: React.FC = () => {
  let empty;
  const { path } = useRouteMatch();
  const { chainId } = useWeb3React();
  const [numVisData, setNumVisData] = useState(_loadCount);
  const [observerIsSet, setObserverIsSet] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { isXl, isXs } = useMatchBreakpoints();
  const chainIdSet = chainId === undefined ? "1" : String(chainId);

  // const allEggs = useSelector<AppState, AppState['cryptozoo']>((state) => state.cryptozoo.allEggs)
  const allEggs = {
    "3BCR3nl2wyq95D1xhciAndNT": {
      currentBid: 500,
      born: "08/06/2021",
      rarity: "Legendary",
      name: "Red Panda",
      updatedAt: "23 July 2021 at 13:59:59 UTC",
      supply: 300,
      buyNow: 1000,
      imageURL:
        "https://i2.wp.com/bestlifeonline.com/wp-content/uploads/2018/10/red-panda-raising-fist.jpg?resize=640%2C360&ssl=1",
      animalID: 4,
      createdAt: "23 July 2021 at 13:56:24 UTC",
      startBid: 500,
    },
  };

  useEffect(() => {
    const showMoreData = (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setNumVisData((dataCurrent) => dataCurrent + _loadCount);
      }
    };

    if (!observerIsSet) {
      const loadMoreObserver = new IntersectionObserver(showMoreData, {
        rootMargin: "0px",
        threshold: 1,
      });
      loadMoreObserver.observe(bottomRef.current);
      setObserverIsSet(true);
    }
  }, [observerIsSet]);
  const shownData = (data) => {
    return data.slice(0, numVisData);
  };
  const renderContent = (): JSX.Element => {
    const data = [];
    // const updatedData = []
    Object.values(allEggs).forEach((egg, index) => {
      data.push({
        id: index,
        ...egg,
        name: egg.name.replace(/\u0000/g, ""),
      });
    });
    empty = data.length === 0 && Object.keys(allEggs).length !== 0;
    // Object.values(updatedTokens)
    //   .filter((tkn) => tkn.isToken)
    //   .forEach((token, ind) => {
    //     if (token.curve === undefined) {
    //       return
    //     }
    //     updatedData.push({ id: ind, ...token })
    //   })
    debugger; // eslint-disable-line no-debugger

    return (
      <FlexLayout>
        <Route exact path={`${path}`}>
          {shownData(data).map((egg) => (
            <Card>
              <CardBody>
                <CardContent imgSrc="/media/logo.svg">
                  <Heading mb="8px">{egg.name}</Heading>
                  {/* <Text>{TranslateString(999, 'Trade in your NFT for CAKE, or just keep it for your collection.')}</Text> */}
                </CardContent>
              </CardBody>
              <CardFooter>
                <InfoBlock>
                  <Text
                    as="p"
                    color="textSubtle"
                    style={{ textAlign: "center" }}
                  >
                    0D 7H
                  </Text>
                </InfoBlock>
              </CardFooter>
            </Card>
          ))}
        </Route>
        <Route exact path={`${path}/history`}>
          {shownData(data).map((egg) => (
            <Card
            // key={JSON.stringify(token)}
            />
          ))}
        </Route>
      </FlexLayout>
    );
  };

  return (
    <div>
      <Page>
        {renderContent()}
        <IconCont ref={bottomRef}>
          {" "}
          {numVisData < Object.keys(allEggs).length ? (
            <VscLoading size={36} />
          ) : null}{" "}
        </IconCont>
      </Page>
    </div>
  );
};

export default EggMarketplace;

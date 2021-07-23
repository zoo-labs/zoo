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
  CardHeader,
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
`
const ImageContainer = styled.div`
  img {
    width: 100%;
    height: 100%;
    minHeight: 300px;
    overflow: hidden;
  }
`

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

  const allAnimals = {
      1: {
         tokenId: "1",
         name: "Red Panda",
         description: "Mystery",
         yield: "543",
         boost: "5678",
         rarity: "Legendary",
         dob: "1627064176",
         imageUrl:
            "https://i2.wp.com/bestlifeonline.com/wp-content/uploads/2018/10/red-panda-raising-fist.jpg?resize=640%2C360&ssl=1",
      },
      2: {
         tokenId: "2",
         name: "Suzanne",
         description: "LOL",
         yield: "4223",
         boost: "2",
         rarity: "Rare",
         dob: "1627064176",
         imageUrl: "https://ichef.bbci.co.uk/images/ic/1200x675/p02k8mcv.jpg",
      },
      3: {
         tokenId: "3",
         name: "Cool Doggo",
         description: "WOOF wO0F",
         yield: "321",
         boost: "2",
         rarity: "Uncommon",
         dob: "1627064176",
         imageUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIuXjTOdhD--589Qjr310qX4IgAZrz_4-RAw&usqp=CAU",
      },
      4: {
         tokenId: "4",
         name: "Seal",
         description: "BARK",
         yield: "31",
         boost: "22",
         rarity: "Common",
         dob: "1627064176",
         imageUrl:
            "https://sites.psu.edu/siowfa16/files/2016/09/baby-seal-29vsgyf.jpg",
      },
   }

   const allEggs = {
      5: {
         tokenId: "5",
         parent1: "1",
         parent2: "2",
         basic: true
      },
      6: {
         tokenId: "6",
         parent1: "3",
         parent2: "4",
         basic: false
      },
    }

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
  const renderAnimals = (): JSX.Element => {
    const animalData = [];
    // const updatedData = []
    Object.values(allAnimals).forEach((animal, index) => {
      animalData.push({
        id: index,
        ...animal,
        name: animal.name.replace(/\u0000/g, ""),
      });
    });
    console.log(animalData)
    empty = animalData.length === 0 && Object.keys(allAnimals).length !== 0;
    // Object.values(updatedTokens)
    //   .filter((tkn) => tkn.isToken)
    //   .forEach((token, ind) => {
    //     if (token.curve === undefined) {
    //       return
    //     }
    //     updatedData.push({ id: ind, ...token })
    //   })


    return (
      <FlexLayout>
        <Route exact path={`${path}`}>
          {shownData(animalData).map((animal) => (
            <Card>
              {/* <CardHeader>
                <Heading color="cardLabel">
                  {animal.name}
                </Heading>
              </CardHeader> */}
              <CardBody style={{backgroundImage: `url("${animal.imageURL}")`, backgroundSize: 'cover', backgroundPosition: 'center', height: 500}}>
                <Heading mb="8px" style={{textShadow: '0px 2px rgba(0, 0, 0, 0.2)'}}>{animal.name}</Heading>
              </CardBody>
                <InfoBlock style={{textAlign: 'center'}}>
                  <Heading mb="8px" style={{textShadow: '0px 2px rgba(0, 0, 0, 0.2)'}}>{`BREED`}</Heading>
                </InfoBlock>
            </Card>
          ))}
        </Route>
        <Route exact path={`${path}/history`}>
          {shownData(animalData).map((animal) => (
            <Card
            // key={JSON.stringify(token)}
            />
          ))}
        </Route>
      </FlexLayout>
    );
  };

  const renderEggs = (): JSX.Element => {
    const eggData = [];
    // const updatedData = []
    Object.values(allEggs).forEach((egg, index) => {
      eggData.push({
        id: index,
        ...egg,
        name: egg.basic ? "BASIC" : "HYBRID"
      });
    });
    empty = eggData.length === 0 && Object.keys(allEggs).length !== 0;
    const basicEggURL = 'static/images/basic.png'
    const hybridEggURL = 'static/images/hybrid.png'

    return (
      <FlexLayout>
        <Route exact path={`${path}`}>
          {shownData(eggData).map((egg) => (
            <Card style={{backgroundColor: '#000000'}}>
              <CardBody style={{backgroundImage: `url("${egg.basic ? basicEggURL : hybridEggURL}")`, backgroundSize: 'cover', backgroundPosition: 'center', height: 250}}>
                <Heading mb="8px" style={{textShadow: '0px 2px rgba(0, 0, 0, 0.2)'}}>{egg.name}</Heading>
              </CardBody>
              <InfoBlock style={{textAlign: 'center'}}>
                <Heading mb="8px" style={{textShadow: '0px 2px rgba(0, 0, 0, 0.2)'}}>{`HATCH`}</Heading>
              </InfoBlock>
            </Card>
          ))}
        </Route>
        <Route exact path={`${path}/history`}>
          {shownData(eggData).map((egg) => (
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
        {renderEggs()}
        {renderAnimals()}
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

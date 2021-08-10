import React, { Suspense, useEffect, lazy } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import styled from "styled-components";
import BigNumber from "bignumber.js";
import useEagerConnect from "hooks/useEagerConnect";
import ResetCSS from "./components/ResetCSS";
import GlobalStyle from "./components/style/Global";
import Menu from "./components/Menu";
import SuspenseWithChunkError from "./components/SuspenseWithChunkError";
import ToastListener from "./components/ToastListener";
import PageLoader from "./components/Svg/Icons/LoadingLogo";
import history from "./routerHistory";
import { PrivateRoute } from "components/PrivateRoute";
import { useWeb3React } from "@web3-react/core";
import { useDispatch } from "react-redux";
import { clearZoo } from "state/zoo";
import { addEggs, addAnimals, addEgg, addAnimal, burnEgg } from "state/actions";
import Moralis from "moralis";
import { useMoralisSubscription, useMoralis } from "react-moralis";
import { Egg, Animal } from "types/zoo";
import { getZooKeeper } from "util/contractHelpers";
import useWeb3 from "hooks/useWeb3";

const Account = lazy(() => import("./views/Account"));
const Login = lazy(() => import("./views/Login"));
const Bank = lazy(() => import("./views/Bank"));
const Feed = lazy(() => import("./views/Feed"));

// This config is required for number formating
BigNumber.config({
   EXPONENTIAL_AT: 1000,
   DECIMAL_PLACES: 80,
});

const AppWrapper = styled.div`
   display: flex;
   flex-flow: column;
   align-items: flex-start;
   overflow-x: hidden;
`;

const BodyWrapper = styled.div`
   display: flex;
   flex-direction: column;
   width: 100%;
   align-items: center;
   flex: 1;
   overflow-y: auto;
   overflow-x: hidden;
   z-index: 1;
   justify-content: center;
   background-repeat: no-repeat;
   background-position: bottom 24px center;
   background-size: 90%;

   ${({ theme }) => theme.mediaQueries.xs} {
      background-size: auto;
   }

   ${({ theme }) => theme.mediaQueries.lg} {
      background-repeat: no-repeat;
      background-position: center 420px, 10% 230px, 90% 230px;
      background-size: contain, 266px, 266px;
      min-height: 90vh;
   }
`;

const Marginer = styled.div`
   margin-top: 5rem;
`;

function mapEgg(egg) {
    return {
        tokenID:       egg.get('tokenID'),
        kind:          egg.get('kind'),
        animalID:      egg.get('animalID'),
        basic:         egg.get('type') === 'basic',
        burned:        egg.get('burn'),
        hatched:       egg.get('hatched'),
        interactive:   egg.get('interactive'),
        owner:         egg.get('owner'),
        parentA:       egg.get('parentA'),
        parentB:       egg.get('parentB'),
        timeRemaining: egg.get('timeRemaining'),
        createdAt:     egg.get('createdAt'),
        updatedAt:     egg.get('updatedAt'),
        CTAOverride:   egg.get('CTAOverride'),
    }
}

function mapAnimal(animal) {
    return {
        owner:         String(animal.get('owner')),
        tokenID:       animal.get('tokenID'),
        name:          animal.get('name'),
        description:   animal.get('NA'),
        yield:         animal.get('yield'),
        boost:         animal.get('boost'),
        rarity:        animal.get('rarity'),
        dob:           animal.get('timestamp'),
        startBid:      animal.get('startBid'),
        currentBid:    animal.get('currentBid'),
        imageUrl:      animal.get('tokenURI'),
        listed:        animal.get('listed'),
        bloodline:     animal.get('kind') === 1 ? 'pure' :  'hybrid',
        selected:      false,
        bred:          false,
        breedCount:    animal.get('breedCount'),
        kind:          animal.get('kind'),
        timeRemaining: animal.get('timeRemaining'),
        CTAOverride:   animal.get('CTAOverride'),
        lastBred:      animal.get('lastBred'),
        buyNow:        animal.get('buyNow'),
        revealed:      animal.get('revealed'),
        freed:         animal.get('freed'),
    }
}

const App: React.FC = () => {
   useEagerConnect();
   const { chainId } = useWeb3React();
   const web3 = useWeb3();
   const dispatch = useDispatch();

   useMoralisSubscription("Eggs", (q) => q, [], {
      onCreate: (data) => createOrUpdateEgg(data),
      onUpdate: (data) => createOrUpdateEgg(data),
      onDelete: (data) => deleteEgg(data),
   });

   useMoralisSubscription("Animals", (q) => q, [], {
      onCreate: (data) => createOrUpdateAnimal(data),
      onUpdate: (data) => createOrUpdateAnimal(data),
   });

   useEffect(() => {
      dispatch(clearZoo());
      console.warn = () => null;
      getEggs();
      getAnimals();
   }, [chainId]);

   const signedIn = chainId && window.localStorage.getItem("connectorId");

   const getEggs = async () => {
      console.log("GETTING EGGS");
      try {
         const eggs = [];
         const MoralisObject = Moralis.Object.extend("Eggs");
         const query = new Moralis.Query(MoralisObject);
         query.limit(1000);
         const results = await query.find();
         for (let i = 0; i < results.length; i++) {
            eggs.push(mapEgg(results[i]))
         }
         dispatch(addEggs(eggs))
      } catch (e) {
         console.error("ISSUE GETTING EGGS \n", e);
      }
   };

   const getAnimals = async () => {
      console.log("GETTING ANIMALS");

      try {
         const animals = [];
         const MoralisObject = Moralis.Object.extend("Animals");
         const query = new Moralis.Query(MoralisObject);
         query.limit(1000);
         const results = await query.find();
         for (let i = 0; i < results.length; i++) {
            animals.push(mapAnimal(results[i]))
         }
         dispatch(addAnimals(animals));
      } catch (e) {
         console.error("ISSUE GETTING ANIMAL \n", e);
      }
   };

    const createOrUpdateEgg = async (data) => {
      console.log("UPDATING EGG", data)
      try {
         dispatch(addEgg(mapEgg(data)))
      } catch (e) {
         console.error("ISSUE UPDATING EGG \n", e);
      }
   };

   const createOrUpdateAnimal = async (data) => {
      console.log("UPDATING ANIMAL", data);

      try {
         const animal = data;
         let string = String(animal.get("createdAt"));
         const replacedString = string.replace("at ", "");
         const date = new Date(replacedString);
         const tempAnimal: Animal = {
            owner: String(animal.get("owner")),
            tokenID: animal.get("AnimalID"),
            name: animal.get("Name"),
            description: animal.get("NA"),
            yield: animal.get("Yield"),
            boost: animal.get("Boost"),
            rarity: animal.get("Rarity"),
            dob: animal.get("Timestamp"),
            startBid: animal.get("StartBid"),
            currentBid: animal.get("CurrentBid"),
            imageUrl: animal.get("TokenURI"),
            listed: animal.get("Listed"),
            bloodline: animal.get("Bloodline"),
            selected: false,
            bred: false,
            breedCount: animal.get("BreedCount"),
            kind: animal.get("AnimalTypeID"),
            timeRemaining: animal.get("TimeRemaining"),
            CTAOverride: animal.get("CTAOverride"),
            lastBred: animal.get("lastBred"),
            revealed: animal.get("Revealed"),
            freed: animal.get("Freed")
         };
         dispatch(addAnimal(tempAnimal));
      } catch (e) {
         console.error("ISSUE UPDATING ANIMAL \n", e);
      }
   };

   const deleteEgg = async (data) => {
    console.log("DELETING EGG");

    try {
       const singleResult = data;
       let string = String(singleResult.get("createdAt"));
       const replacedString = string.replace("at ", "");
       const date = new Date(replacedString);
       dispatch(burnEgg(mapEgg(data)))
    } catch (e) {
         console.error("ISSUE DELETING EGG \n", e);
      }
   };

   return (
         <Suspense fallback={null}>
            <Router history={history}>
               <ResetCSS />
               <GlobalStyle />
               <Switch>
                  {/* Zswap Routes  */}
                  {/* <Route path="/marketplace" exact>

                <Marketplace />
              </Route>
              <Route path="/splash" exact>

                <Splash />
              </Route>
              <Route path="/account" exact>

                <Account />
              </Route> */}

                  <Route exact path="/login">
                     {signedIn ? <Redirect to="/account" /> : <Login />}
                  </Route>

                  <SuspenseWithChunkError fallback={<></>}>
                     <Route exact path="/account">
                        {signedIn ? (
                           <Menu>
                              <Account />
                           </Menu>
                        ) : (
                           <Redirect to="/login" />
                        )}
                     </Route>
                     <Route path="/feed">
                        {signedIn ? <Feed /> : <Redirect to="/login" />}
                     </Route>
                     <Route exact path="/bank">
                        {signedIn ? (
                           <Menu>
                              <Bank />
                           </Menu>
                        ) : (
                           <Redirect to="/login" />
                        )}
                     </Route>
                     <Route exact path="/">
                        {signedIn ? (
                           <Redirect to="/account" />
                        ) : (
                           <Redirect to="/login" />
                        )}
                     </Route>
                  </SuspenseWithChunkError>
               </Switch>
               <ToastListener />
            </Router>
         </Suspense>
   );
};

export default React.memo(App);

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

// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page
const Account = lazy(() => import("./views/Account"));
const Login = lazy(() => import("./views/Login"));
const Bank = lazy(() => import("./views/Bank"));
const Feed = lazy(() => import("./views/Feed"));
// const Splash = lazy(() => import('./views/Splash'))

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

const App: React.FC = () => {
   useEagerConnect();
   const { chainId } = useWeb3React();
   const web3 = useWeb3();
   const dispatch = useDispatch();

   // const getEvents = async () => {
   //    const burn = await zooKeeper.getPastEvents("Burn", {
   //       fromBlock: 0,
   //       toBlock: "latest",
   //    });
   //    console.log("ALL BURN\n", burn);
   //    const hatch = await zooKeeper.getPastEvents("Hatch", {
   //       fromBlock: 0,
   //       toBlock: "latest",
   //    });
   //    console.log("ALL HATCH\n", hatch);
   // };

   // if (chainId) getEvents();

   useMoralisSubscription("Eggs", (q) => q, [], {
      onCreate: (data) => createdUpdateEgg(data),
      onUpdate: (data) => createdUpdateEgg(data),
      onDelete: (data) => deleteEgg(data),
   });

   useMoralisSubscription("Animals", (q) => q, [], {
      onCreate: (data) => createdUpdateAnimal(data),
      onUpdate: (data) => createdUpdateAnimal(data),
   });

   useEffect(() => {
      console.warn = () => null;
      getEggs();
      getAnimals();
   }, []);

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
         const Eggs = [];
         const MoralisObject = Moralis.Object.extend("Eggs");
         const query = new Moralis.Query(MoralisObject);
         query.limit(1000);
         const results = await query.find();
         for (let i = 0; i < results.length; i++) {
            const singleResult = results[i];
            const s = String(singleResult.get("createdAt"));
            const replacedString = s.replace("at ", "");
            const date = new Date(replacedString);
            const tempEgg: Egg = {
               owner: singleResult.get("owner"),
               tokenID: singleResult.get("tokenID"),
               kind: singleResult.get("kind"),
               parentA: singleResult.get("parentA"),
               parentB: singleResult.get("parentB"),
               basic: singleResult.get("type") === "basic",
               timeRemaining: singleResult.get("timeRemaining"),
               CTAOverride: singleResult.get("CTAOverride"),
               createdAt: singleResult.get('createdAt'),
               updatedAt: singleResult.get('updatedAt'),
               burned: singleResult.get("burn"),
               interactive: singleResult.get("interactive"),
               hatched: singleResult.get("hatched"),
               animalID: singleResult.get("animalID"),
            };
            Eggs.push(tempEgg);
         }
         dispatch(addEggs(Eggs));
      } catch (e) {
         console.error("ISSUE GETTING EGGS \n", e);
      }
   };

   const getAnimals = async () => {
      console.log("GETTING ANIMALS");

      try {
         const Animals = [];
         const MoralisObject = Moralis.Object.extend("Animals");
         const query = new Moralis.Query(MoralisObject);
         query.limit(1000);
         const results = await query.find();
         let animal;
         for (let i = 0; i < results.length; i++) {
            animal = results[i];
            const tempAnimal: Animal = {
               owner: String(animal.get("owner")),
               tokenID: animal.get("tokenID"),
               name: animal.get("name"),
               description: animal.get("NA"),
               yield: animal.get("yield"),
               boost: animal.get("boost"),
               rarity: animal.get("rarity"),
               dob: animal.get("timestamp"),
               startBid: animal.get("startBid"),
               currentBid: animal.get("currentBid"),
               imageUrl: animal.get("tokenURI"),
               listed: animal.get("listed"),
               bloodline: animal.get('kind') === 1 ? "pure" : "hybrid",
               selected: false,
               bred: false,
               breedCount: animal.get("breedCount"),
               kind: animal.get("kind"),
               timeRemaining: animal.get("timeRemaining"),
               CTAOverride: animal.get("CTAOverride"),
               lastBred: animal.get("lastBred"),
               buyNow: animal.get("buyNow"),
               revealed: animal.get("revealed"),
               freed: animal.get("freed")
            };
            Animals.push(tempAnimal);
         }
         dispatch(addAnimals(Animals));
      } catch (e) {
         console.error("ISSUE GETTING ANIMAL \n", e);
      }
   };

   const createdUpdateEgg = async (data) => {
      console.log("UPDATING EGG");
      try {
         const singleResult = data;
         let string = String(singleResult.get("createdAt"));
         const replacedString = string.replace("at ", "");
         const date = new Date(replacedString);
         const tempEgg: Egg = {
            owner: singleResult.get("owner"),
            tokenID: singleResult.get("tokenID"),
            kind: singleResult.get("kind"),
            parentA: singleResult.get("parentA"),
            parentB: singleResult.get("parentB"),
            basic: singleResult.get("type") === "basic",
            timeRemaining: singleResult.get("timeRemaining"),
            CTAOverride: singleResult.get("CTAOverride"),
            createdAt: singleResult.get('createdAt'),
            updatedAt: singleResult.get('updatedAt'),
            burned: singleResult.get("burn"),
            interactive: singleResult.get("interactive"),
            hatched: singleResult.get("hatched"),
            animalID: singleResult.get("animalID"),
         };
         dispatch(addEgg(tempEgg));
      } catch (e) {
         console.error("ISSUE UPDATING EGG \n", e);
      }
   };

   const createdUpdateAnimal = async (data) => {
      console.log("UPDATING ANIMAL");

      try {
         const animal = data;
         console.log(animal.attributes);
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
         const tempEgg: Egg = {
            owner: singleResult.get("owner"),
            tokenID: singleResult.get("tokenID"),
            kind: singleResult.get("kind"),
            parentA: singleResult.get("parentA"),
            parentB: singleResult.get("parentB"),
            basic: singleResult.get("type") === "basic",
            timeRemaining: singleResult.get("timeRemaining"),
            CTAOverride: singleResult.get("CTAOverride"),
            createdAt: singleResult.get('createdAt'),
            updatedAt: singleResult.get('updatedAt'),
            burned: singleResult.get("burn"),
            interactive: singleResult.get("interactive"),
            hatched: singleResult.get("hatched"),
            animalID: singleResult.get("animalID"),
         };
         dispatch(burnEgg(tempEgg));
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

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
import { MoralisProvider } from "react-moralis";
import { useDispatch } from "react-redux";
import { clearZoo } from "state/zoo";

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
   const dispatch = useDispatch();

   // Monkey patch warn() because of web3 flood
   // To be removed when web3 1.3.5 is released
   useEffect(() => {
      console.warn = () => null;
   }, []);

   useEffect(() => {
      dispatch(clearZoo());
   }, [chainId]);

   const signedIn = chainId && window.localStorage.getItem("connectorId");

   const moralisId =
      chainId === 97
         ? "16weSJXK4RD3aYAuwiP46Cgzjm4Bng1Torxz5qiy"
         : "cIGUkzL7pyhM8aC8gIcDiH46QGpsEutO5SAQzTgy";
   const moralisUrl =
      chainId === 97
         ? "https://dblpeaqbqk32.usemoralis.com:2053/server"
         : "https://j0ixlvmwc1kz.usemoralis.com:2053/server";

   return (
      <MoralisProvider appId={moralisId} serverUrl={moralisUrl}>
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
      </MoralisProvider>
   );
};

export default React.memo(App);

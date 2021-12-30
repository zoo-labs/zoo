import "../bootstrap";
import "../styles/index.css";

import { Fragment, FunctionComponent, useCallback, useMemo } from "react";
import { GetStaticProps, NextComponentType, NextPageContext } from "next";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "../state";

import type { AppProps } from "next/app";
import ApplicationUpdater from "../state/application/updater";
import DefaultLayout from "../layouts/Default";
import Dots from "../components/Dots";
import Head from "next/head";
import { I18nProvider } from "@lingui/react";
import ListsUpdater from "../state/lists/updater";
import MulticallUpdater from "../state/multicall/updater";
import ReactGA from "react-ga";
import { Provider as ReduxProvider, useDispatch } from "react-redux";
import TransactionUpdater from "../state/transactions/updater";
import UserUpdater from "../state/user/updater";
import Web3ReactManager from "../components/Web3ReactManager";
import { Web3ReactProvider } from "@web3-react/core";
import dynamic from "next/dynamic";
import { i18n } from "@lingui/core";
import { useEffect } from "react";
import { useRouter } from "next/router";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
import { useActiveWeb3React, useWeb3, useZooToken } from "../hooks";

import { updateGasPrice } from "state/network/actions";
import { clearZoo } from "state/zoo";
import {
  addAnimal,
  addAnimals,
  addEgg,
  addEggs,
  burnAnimal,
  burnEgg,
  getMyEggs,
  getMyTransactions,
  getZooBalance,
} from "state/zoo/actions";
import { mapAnimal, mapEgg, queryAnimals, queryEggs } from "util/moralis";
import { getLibrary } from "util/web3React";
import { useMoralisSubscription } from "react-moralis";
import { SubgraphProvider } from "providers/SubgraphProvider";
const client = new ApolloClient({
  uri: "http://127.0.0.1:8000/subgraphs/name/luxdefi/luxtown",
  cache: new InMemoryCache(),
});

const Web3ProviderNetwork = dynamic(
  () => import("../components/Web3ProviderNetwork"),
  { ssr: false }
);

// const Web3ReactManager = dynamic(() => import('../components/Web3ReactManager'), { ssr: false })

if (typeof window !== "undefined" && !!window.ethereum) {
  window.ethereum.autoRefreshOnNetworkChange = false;
}
function MyApp({
  Component,
  pageProps,
}: AppProps & {
  Component: NextComponentType<NextPageContext> & {
    Guard: FunctionComponent;
    Layout: FunctionComponent;
    Provider: FunctionComponent;
  };
}) {
  const { pathname, query, locale } = useRouter();

  useEffect(() => {
    ReactGA.initialize(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
      testMode: process.env.NODE_ENV === "development",
    });

    const errorHandler = (error) => {
      ReactGA.exception({
        description: `${error.message} @ ${error.filename}:${error.lineno}:${error.colno}`,
        fatal: true,
      });
    };

    window.addEventListener("error", errorHandler);

    return () => window.removeEventListener("error", errorHandler);
  }, []);

  useEffect(() => {
    ReactGA.pageview(`${pathname}${query}`);
  }, [pathname, query]);

  // Allows for conditionally setting a provider to be hoisted per page
  const Provider = Component.Provider || Fragment;

  // Allows for conditionally setting a layout to be hoisted per page
  const Layout = Component.Layout || DefaultLayout;

  // Allows for conditionally setting a guard to be hoisted per page
  const Guard = Component.Guard || Fragment;

  const { library, chainId, account } = useWeb3();
  const dispatch = useDispatch();

  // Test hitting subgraph
  const GET_MEDIAS = gql`
    query GetMedias {
      medias {
        id
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_MEDIAS);
  console.log("Subgraph Data", data);

  const valid = useMemo(() => {
    if (library && chainId) {
      return true;
    }
    return false;
  }, [library, chainId]);
  /* Set signedIn to true if chainId and window.localStorage.getItem('connectorId') exist */
  const signedIn =
    chainId !== undefined &&
    window.localStorage.getItem("connectorId") !== undefined;
  // const zooToken = useContract('ZOO')
  const zooToken = useZooToken();
  // const zooToken = getToken(web3)

  const getEggs = async (account) => {
    try {
      const eggs = [];

      for (const egg of await queryEggs()) {
        eggs.push(mapEgg(egg));
      }
      dispatch(addEggs(eggs));
      dispatch(getMyEggs(account, eggs));
    } catch (e) {
      console.error("ISSUE GETTING EGGS \n", e);
    }
  };

  const getAnimals = async () => {
    try {
      const animals = [];
      for (const animal of await queryAnimals()) {
        animals.push(mapAnimal(animal));
      }
      dispatch(addAnimals(animals));
    } catch (e) {
      console.error("ISSUE GETTING ANIMAL \n", e);
    }
  };

  const createEgg = async (data) => {
    try {
      dispatch(addEgg({ data: mapEgg(data), account }));
    } catch (e) {
      console.error("ISSUE CREATING EGG:", e);
    }
  };

  const updateEgg = async (data) => {
    try {
      dispatch(addEgg({ data: mapEgg(data), account }));
    } catch (e) {
      console.error("ISSUE UPDATING EGG:", e);
    }
  };

  const createAnimal = async (data) => {
    try {
      dispatch(addAnimal(mapAnimal(data)));
    } catch (e) {
      console.error("ISSUE CREATING ANIMAL:", e);
    }
  };

  const updateAnimal = async (data) => {
    try {
      dispatch(addAnimal(mapAnimal(data)));
    } catch (e) {
      console.error("ISSUE UPDATING ANIMAL:", e);
    }
  };

  const deleteAnimal = async (data) => {
    try {
      dispatch(burnAnimal(mapAnimal(data)));
    } catch (e) {
      console.error("ISSUE DELETING ANIMAL:", e);
    }
  };

  const deleteEgg = async (data) => {
    try {
      dispatch(burnEgg(mapEgg(data)));
    } catch (e) {
      console.error("ISSUE DELETING EGG:", e);
    }
  };

  useMoralisSubscription("Eggs", (q) => q, [], {
    onCreate: (data) => createEgg(data),
    onUpdate: (data) => updateEgg(data),
    onDelete: (data) => deleteEgg(data),
  });

  useMoralisSubscription("Animals", (q) => q, [], {
    onCreate: (data) => createAnimal(data),
    onUpdate: (data) => updateAnimal(data),
    onDelete: (data) => deleteAnimal(data),
  });
  const getValues = useCallback(
    (account) => {
      dispatch(updateGasPrice(library));
      dispatch(clearZoo());
      // @TODO the following calls are using moralis.
      // re-enable them after the changeover to subgraph
      // dispatch(getZooBalance(account, zooToken))
      // dispatch(getMyTransactions(account))
      // getEggs(account)
      // getAnimals()
    },
    [dispatch, getAnimals, getEggs, library, zooToken]
  );

  useEffect(() => {
    getValues(account);
  }, [chainId, account, getValues]);

  return (
    <Fragment>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <title key="title">LUX</title>

        <meta
          key="description"
          name="description"
          content="The future is decentralized."
        />

        <meta name="application-name" content="Lux Defi" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="Lux Defi" />

        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#F338C3" />

        <meta key="twitter:card" name="twitter:card" content="app" />
        <meta key="twitter:title" name="twitter:title" content="Lux Defi" />
        <meta
          key="twitter:url"
          name="twitter:url"
          content="https://lux.financial/"
        />
        <meta
          key="twitter:description"
          name="twitter:description"
          content="The future is decentralized."
        />
        <meta
          key="twitter:image"
          name="twitter:image"
          content="https://lux.financial/lux.png"
        />
        <meta
          key="twitter:creator"
          name="twitter:creator"
          content="@SushiSwap"
        />
        <meta key="og:type" property="og:type" content="website" />
        <meta key="og:site_name" property="og:site_name" content="Lux Defi" />
        <meta key="og:url" property="og:url" content="https://lux.financial" />
        <meta
          key="og:image"
          property="og:image"
          content="https://lux.financial/lux.png"
        />
        <meta
          key="og:description"
          property="og:description"
          content="The future is decentralized."
        />
      </Head>

      <I18nProvider i18n={i18n} forceRenderOnLocaleChange={false}>
        <Web3ReactProvider getLibrary={getLibrary}>
          <Web3ProviderNetwork getLibrary={getLibrary}>
            <Web3ReactManager>
              <SubgraphProvider>
                <ReduxProvider store={store}>
                  <PersistGate
                    loading={<Dots>loading</Dots>}
                    persistor={persistor}
                  >
                    <>
                      <ListsUpdater />
                      <UserUpdater />
                      <ApplicationUpdater />
                      <TransactionUpdater />
                      <MulticallUpdater />
                    </>
                    <Provider>
                      <Layout>
                        <Guard>
                          <Component {...pageProps} />
                        </Guard>
                      </Layout>
                    </Provider>
                  </PersistGate>
                </ReduxProvider>
              </SubgraphProvider>
            </Web3ReactManager>
          </Web3ProviderNetwork>
        </Web3ReactProvider>
      </I18nProvider>
    </Fragment>
  );
}

export default MyApp;

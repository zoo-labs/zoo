import { Fragment, FunctionComponent } from "react";
import { NextComponentType, NextPageContext } from "next";

import type { AppProps } from "next/app";
import { useDispatch } from "react-redux";
import { mapAnimal, mapEgg, queryAnimals, queryEggs } from "functions/moralis";
import { useGetEggs } from "state/zoo/hooks";

function Main({
  Component,
  pageProps,
}: AppProps & {
  Component: NextComponentType<NextPageContext> & {
    Guard: FunctionComponent;
    Layout: FunctionComponent;
    Provider: FunctionComponent;
  };
}) {
  //   const dispatch = useDispatch();
  //   const addEggs = useGetEggs();
  //   const getEggs = async (account) => {
  //     try {
  //       const eggs = [];

  //       for (const egg of await queryEggs()) {
  //         eggs.push(mapEgg(egg));
  //       }
  //       dispatch(addEggs(eggs));
  //       // dispatch(getMyEggs(account, eggs));
  //     } catch (e) {
  //       console.error("ISSUE GETTING EGGS \n", e);
  //     }
  //   };

  // const getAnimals = async () => {
  //   try {
  //     const animals = [];
  //     for (const animal of await queryAnimals()) {
  //       animals.push(mapAnimal(animal));
  //     }
  //     dispatch(addAnimals(animals));
  //   } catch (e) {
  //     console.error("ISSUE GETTING ANIMAL \n", e);
  //   }
  // };

  return (
    <Fragment>
      <Component {...pageProps} />
    </Fragment>
  );
}

export default Main;

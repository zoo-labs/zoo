/* eslint-disable no-param-reassign */
import { Toast } from "../../components/Toast";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ZooState } from "../types";
import { Animal, Egg } from "entities/zooentities";
import { test } from "./test";

// const initialState: ZooState = test;

const initialState: ZooState = {
   animals: {},
   eggs: {},
};

export const ZooSlice = createSlice({
   name: "zoo",
   initialState,
   reducers: {
      addEgg: (state: ZooState, action) => {
         const toAdd: Egg = action.payload;
         state.eggs[toAdd.tokenId] = toAdd;
      },
      addAnimal: (state: ZooState, action) => {
         const toAdd: Animal = action.payload;
         state.animals[toAdd.tokenId] = toAdd;
      },
      addEggs: (state: ZooState, action) => {
         const toAdd: Egg[] = action.payload;
         for (let i = 0; i < toAdd.length; i += 1) {
            const curr = toAdd[i];
            state.eggs[curr.tokenId] = curr;
         }
      },
      addAnimals: (state: ZooState, action) => {
         const toAdd: Animal[] = action.payload;
         for (let i = 0; i < toAdd.length; i += 1) {
            const curr = toAdd[i];
            state.animals[curr.tokenId] = curr;
         }
      },
      burnEgg: (state: ZooState, action) => {
         const toRemove: Egg = action.payload;
         console.log(toRemove);
         const newState = state;
         delete newState.eggs[toRemove.tokenId];
         state = newState;
      },
      burnAnimal: (state: ZooState, action) => {
         const toRemove: Animal = action.payload;
         const newState = state;
         delete newState.animals[toRemove.tokenId];
         state = newState;
      },
      clearZoo: () => {
         return initialState
      },
   },
});

// Actions
export const {
   addEgg,
   addAnimal,
   addEggs,
   addAnimals,
   burnEgg,
   burnAnimal,
   clearZoo,
} = ZooSlice.actions;

export default ZooSlice.reducer;

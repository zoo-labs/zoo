/* eslint-disable no-param-reassign */
import { Toast } from "../../components/Toast";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ZooState } from "../types";
import { Animal, Egg } from "entities/zooentities";

const initialState: ZooState = {
   animals: {
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
   },
   eggs: {
      5: {
         tokenId: "5",
         parent1: "1",
         parent2: "2",
      },
      6: {
         tokenId: "6",
         parent1: "3",
         parent2: "4",
      },
   },
};

export const ZooSlice = createSlice({
   name: "Zoo",
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
         state.eggs[toRemove.tokenId] = null;
      },
      burnAnimal: (state: ZooState, action) => {
         const toRemove: Animal = action.payload;
         state.animals[toRemove.tokenId] = null;
      },
   },
});

// Actions
export const { addEgg, addAnimal, addEggs, addAnimals, burnEgg, burnAnimal } =
   ZooSlice.actions;

export default ZooSlice.reducer;

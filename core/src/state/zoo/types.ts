import { Animal, Egg } from "types";

export interface AnimalState {
  eggs: number;
}

export interface ZooState {
  eggs: { [key: string]: Egg };
  animals: { [key: string]: Animal };
  zooBalance: number;
  myEggs: { [key: string]: Egg };
  myTransactions: Array<Object>;
  myBids: { [key: string]: Egg };
  myAuctions: { [key: string]: Egg };
}
export interface MyNFT {
  description: string;
  index: number;
  customName: string;
  name: string;
  kind: number;
  id: number;
  timestamp: number;
  birthday: number;
  dropId: number;
  eggId: number;
  dropEgg: number;
  swapped: boolean;
  burned: boolean;
  parents: {
    animalA: string;
    animalB: string;
    tokenA: number;
    tokenB: number;
  };
  // data: Array<any>,
  breed: {
    count: number;
    timestamp: number;
  };
  stage: number;
  meta: {
    eggID: number;
    dropID: number;
    swapped: boolean;
    burned: boolean;
    metaUri: string;
  };
  rarity: string;
  token_uri: string;
  attributes;
  image;
  animation_url;
  glb_animation_url;
  usdz_animation_url;
}

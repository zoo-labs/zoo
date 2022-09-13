// import {
//     getZooBalance,
// } from './actions'

// import { createReducer } from '@reduxjs/toolkit'
// import { updateVersion } from '../global/actions'
// import { ZooState } from './types'

// const currentTimestamp = () => new Date().getTime()

// export const initialState: ZooState = {
//     animals: {},
//     myBids: {},
//     myAuctions: {},
//     eggs: {},
//     zooBalance: 0,
//     myEggs: {},
//     myTransactions: [],
// }

// export default createReducer(initialState, (builder) =>
//     builder
//         .addCase(getZooBalance, (state, action) => {
//             state.zooBalance = action.payload.balance
//         })

// )

import {
  getZooBalance,
  getAllowance,
  addEgg,
  updateMyNfts,
  loading,
  eggsCount,
  animalsCount,
  breedsCount,
  addAuctionNft,
  getBNBBalance,
  addNftTTransfers,
} from "./actions";

import { createReducer } from "@reduxjs/toolkit";
import { updateVersion } from "../global/actions";
import { MyNFT, ZooState } from "./types";
import { isEmptyObj } from "functions";
import { Auction, AvailableEgg } from "types";

const currentTimestamp = () => new Date().getTime();

export const initialState: any = {
  animals: {},
  myBids: {},
  myAuctions: {},
  eggs: {},
  zooBalance: 0,
  bnbBalance: 0,
  myEggs: {},
  myTransactions: [],
  allowance: null,
  availableEggs: [],
  loading: false,
  myNfts: [],
  myEggsCount: 0,
  myAnimalsCount: 0,
  myBreedsCount: 0,
  allAuctions: [],
  nftTransfers: [],
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(loading, (state, action) => {
      state.loading = action.payload;
    })
    .addCase(getZooBalance, (state, action) => {
      state.zooBalance = action.payload.balance;
    })
    .addCase(getBNBBalance, (state, action) => {
      state.zooBalance = action.payload.balance;
    })
    .addCase(getAllowance, (state, action) => {
      state.allowance = action.payload;
    })
    .addCase(addEgg, (state, { payload: egg }: { payload: AvailableEgg }) => {
      if (egg && !isEmptyObj(egg)) {
        state.availableEggs[egg.id - 1] = egg;
      } else {
        console.log("NOT_ADDED_EGG", egg);
      }
    })
    .addCase(updateMyNfts, (state, { payload: nft }: { payload: MyNFT }) => {
      console.log("updateMyNfts", nft);
      if (nft && !isEmptyObj(nft)) {
        state.myNfts[nft.index] = nft;
      }
    })
    .addCase(
      addAuctionNft,
      (state, { payload: auction }: { payload: Auction }) => {
        console.log("update auction", auction);
        if (auction && !isEmptyObj(auction)) {
          state.allAuctions[auction.index] = auction;
        }
      }
    )
    .addCase(eggsCount, (state, action) => {
      state.myEggsCount = action.payload;
    })
    .addCase(animalsCount, (state, action) => {
      state.myAnimalsCount = action.payload;
    })
    .addCase(breedsCount, (state, action) => {
      state.myBreedsCount = action.payload;
    })
    .addCase(addNftTTransfers, (state, action) => {
      state.nftTransfers = action.payload;
    })
);

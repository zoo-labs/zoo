// import { CardEgg } from 'components/EggCard/types'
// import { eggTimeout } from 'constants/index'
// import { sortData } from 'functions'
// import { getTransactions } from 'functions/moralis'
// import { getDaysHours, getMilliseconds } from 'util/timeHelpers'
// import { updateMyEggs, updateMyTransactions, updatZooBalnce } from '.'

// export { addAnimal, addAnimals, addEgg, addEggs, burnAnimal, burnEgg, clearZoo, updatZooBalnce } from '.'
import { createAction } from "@reduxjs/toolkit";
// import { Egg } from 'types'

import { Auction, AvailableEgg, Egg } from "types";
import { MyNFT } from "./types";

export interface SerializedToken {
  chainId: number;
  address: string;
  decimals: number;
  symbol?: string;
  name?: string;
}

export interface SerializedPair {
  token0: SerializedToken;
  token1: SerializedToken;
}

export const getZooBalance =
  createAction<{ balance: number | string }>("zoo/getZooBalance");
export const getBNBBalance =
  createAction<{ balance: number }>("zoo/getBNBBalance");
export const getEggs = createAction<{ curr: any }>("zoo/getEggs");
export const getAllowance = createAction<number>("zoo/getAllowance");
export const addEgg = createAction<AvailableEgg>("zoo/addEgg");
export const loading = createAction<boolean>("zoo/loading");
export const updateMyNfts = createAction<MyNFT>("zoo/updateMyNfts");
export const eggsCount = createAction<number>("zoo/eggsCount");
export const animalsCount = createAction<number>("zoo/animalsCount");
export const breedsCount = createAction<number>("zoo/breedsCount");
export const addAuctionNft = createAction<Auction>("zoo/addAuctionNft");
export const createBid = createAction<any>("zoo/createBid");
export const addNftTTransfers = createAction<Array<any>>(
  "zoo/addNftTTransfers"
);

// export function getZooBalance(account, zooToken) {
//   return async (dispatch) => {
//     if (!account) return
//     try {
//       const decimals = await zooToken.decimals()
//       const rawBalance = await zooToken.balanceOf(account)
//       const divisor = parseFloat(Math.pow(10, decimals).toString())
//       const balance = rawBalance / divisor
//       dispatch(updatZooBalnce(balance))
//     } catch (e) {
//       console.error('ISSUE LOADING ZOO BALANCE \n', e)
//     }
//   }
// }

// export function getMyEggs(account, allEggs) {
//   return async (dispatch) => {
//     let eggData = []
//     Object.values(allEggs).forEach((egg: CardEgg, index) => {
//       if (!account) {
//         return
//       }
//       if ((egg.owner || '').toLowerCase() !== account.toLowerCase()) {
//         return
//       }
//       eggData.push(eggConverter(egg, account))
//     })

//     eggData = sortData(eggData, 'hybrid')
//     dispatch(updateMyEggs(eggData))
//   }
// }

// export function eggConverter(egg, account) {
//   if (egg.owner.toLowerCase() === account.toLowerCase() && !egg.burned) {
//     const eggType = egg.basic ? 'EGG' : 'HYBRID'
//     const now = new Date().getTime()
//     const elapsedTime = now - egg.createdAt.getTime()
//     const hatchTimeout = egg.basic ? 0 : getMilliseconds(eggTimeout)
//     const timeRemaining = hatchTimeout - elapsedTime
//     const timeRemainingDaysHours = getDaysHours(timeRemaining)
//     const barwidth = [100 * (elapsedTime / hatchTimeout), '%'].join('')
//     return {
//       id: egg.tokenID,
//       ...egg,
//       name: eggType,
//       timeRemaining: !egg.basic ? (elapsedTime < hatchTimeout ? timeRemaining : 0) : 0,
//       CTAOverride: !egg.basic ? (elapsedTime < hatchTimeout ? { barwidth, timeRemainingDaysHours } : null) : null,
//     }
//   }
// }
// export const getMyTransactions = (account) => async (dispatch) => {
//   const transactions = await getTransactions({ account })
//   dispatch(updateMyTransactions(transactions))
// }
export { clear, push, remove } from "../toasts";


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
    getAvailableEggs,
    updateMyNfts,
    loading,
    eggsCount,
    animalsCount,
    breedsCount,
    getAllAuctions
  } from './actions'
  
  import { createReducer } from '@reduxjs/toolkit'
  import { updateVersion } from '../global/actions'
  import { ZooState } from './types'
  
  const currentTimestamp = () => new Date().getTime()
  
  export const initialState: any = {
    animals: {},
    myBids: {},
    myAuctions: {},
    eggs: {},
    zooBalance: 0,
    myEggs: {},
    myTransactions: [],
    allowance: null,
    availableEggs: [],
    loading: false,
    myNfts: [],
    myEggsCount: 0,
    myAnimalsCount: 0,
    myBreedsCount: 0,
    allAuctions: []
  }
  
  export default createReducer(initialState, (builder) =>
    builder
      .addCase(loading, (state, action) => {
        state.loading = action.payload
      })
      .addCase(getZooBalance, (state, action) => {
        state.zooBalance = action.payload.balance
      })
      .addCase(getAllowance, (state, action) => {
        state.allowance = action.payload
      })
      .addCase(getAvailableEggs, (state, action) => {
        state.availableEggs = action.payload
      })
      .addCase(updateMyNfts, (state, action) => {
        state.myNfts = action.payload
      })
      .addCase(eggsCount, (state, action) => {
        state.myEggsCount = action.payload
      })
      .addCase(animalsCount, (state, action) => {
        state.myAnimalsCount = action.payload
      })
      .addCase(breedsCount, (state, action) => {
        state.myBreedsCount = action.payload
      })
      .addCase(getAllAuctions, (state, action) => {
        state.allAuctions = action.payload
      })
  )
  
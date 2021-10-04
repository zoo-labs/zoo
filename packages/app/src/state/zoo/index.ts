/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { Animal, Egg } from 'types/zoo'
import { ZooState } from '../types'
import { eggConverter } from './actions'

const initialState: ZooState = {
  animals: {},
  myBids: {},
  myAuctions: {},
  eggs: {},
  zooBalance: 0,
  myEggs: {},
  myTransactions: [],
}

export const ZooSlice = createSlice({
  name: 'zoo',
  initialState,
  reducers: {
    addEgg: (state: ZooState, action) => {
      const toAdd: Egg = action.payload.data
      const account: string = action.payload.account

      state.eggs[toAdd.tokenID] = toAdd
      state.myEggs[toAdd.tokenID] = eggConverter(toAdd, account)
    },
    addAnimal: (state: ZooState, action) => {
      const toAdd: Animal = action.payload
      state.animals[toAdd.tokenID] = toAdd
    },
    addEggs: (state: ZooState, action) => {
      const toAdd: Egg[] = action.payload
      console.log('eggs length', toAdd.length)
      for (let i = 0; i < toAdd.length; i += 1) {
        const curr = toAdd[i]
        if (curr.owner === '0x0770ACd6CF3Fc622148b1514066dD5A9147E08cb        ') {
          console.log('exists')
        }

        state.eggs[curr.tokenID] = curr
      }
    },
    addAnimals: (state: ZooState, action) => {
      const toAdd: Animal[] = action.payload
      for (let i = 0; i < toAdd.length; i += 1) {
        const curr = toAdd[i]
        state.animals[curr.tokenID] = curr
      }
    },
    burnEgg: (state: ZooState, action) => {
      const toRemove: Egg = action.payload
      console.log(toRemove)
      const newState = state
      delete newState.eggs[toRemove.tokenID]
      state = newState
    },
    burnAnimal: (state: ZooState, action) => {
      const toRemove: Animal = action.payload
      const newState = state
      delete newState.animals[toRemove.tokenID]
      state = newState
    },
    updatZooBalnce: (state: ZooState, action) => {
      const zooBalance = action.payload
      state.zooBalance = zooBalance
    },
    updateMyEggs: (state: ZooState, action) => {
      const myEggs: Egg[] = action.payload

      for (let i = 0; i < myEggs.length; i += 1) {
        const curr = myEggs[i]
        if (curr) {
          state.myEggs[curr.tokenID] = curr
        }
      }
    },
    updateMyTransactions: (state: ZooState, action) => {
      const myTransactions = action.payload
      state.myTransactions = myTransactions
    },
    clearZoo: () => {
      return initialState
    },
  },
})

// Actions
export const { addEgg, addAnimal, addEggs, addAnimals, burnEgg, burnAnimal, updatZooBalnce, updateMyEggs, updateMyTransactions, clearZoo } = ZooSlice.actions

export default ZooSlice.reducer

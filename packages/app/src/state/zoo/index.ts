/* eslint-disable no-param-reassign */
import { Toast } from '../../components/Toast'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ZooState } from '../types'
import { Animal, Egg } from 'types/zoo'
import { eggConverter } from './actions'

const initialState: ZooState = {
  animals: {},
  eggs: {},
  zooBalance:0,
  myEggs:{},
  myTransactions:[]
}

export const ZooSlice = createSlice({
  name: 'zoo',
  initialState,
  reducers: {
    addEgg: (state: ZooState, action) => {
      const toAdd: Egg = action.payload.data
      const account: string = action.payload.account
      const foundIndex =  Object.values(state.eggs).findIndex(egg => egg.tokenID ===  toAdd.tokenID);

      state.eggs[toAdd.tokenID] = toAdd;
      state.myEggs[toAdd.tokenID] = eggConverter(toAdd,account);
// console.log('myEggs',Object.assign({}, state.myEggs))
// console.log('toAdd',toAdd)

//       if(foundIndex){
//         console.log('egg exist',toAdd)
//         state.myEggs[foundIndex] = toAdd;
//       }else{
//         console.log('egg doesnt exist',toAdd)

//         state.myEggs.push(eggConverter(toAdd,account))
//       }

    //   const found = Object.values(state.eggs).some(el => el.tokenID === toAdd.tokenID);
    //  if (!found) state.myEggs.push(eggConverter(toAdd,account))
      
    },
    addAnimal: (state: ZooState, action) => {
      const toAdd: Animal = action.payload
      state.animals[toAdd.tokenID] = toAdd
    },
    addEggs: (state: ZooState, action) => {
      const toAdd: Egg[] = action.payload

      for (let i = 0; i < toAdd.length; i += 1) {
        const curr = toAdd[i]
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
    updatZooBalnce:(state: ZooState, action) => {
      const zooBalance = action.payload
      state.zooBalance = zooBalance
    },
    updateMyEggs:(state: ZooState, action) => {

      const myEggs: Egg[] = action.payload

      for (let i = 0; i < myEggs.length; i += 1) {
        const curr = myEggs[i]
        state.myEggs[curr.tokenID] = curr
      }
    },
    updateMyTransactions:(state: ZooState, action) => {
      const myTransactions = action.payload
      state.myTransactions = myTransactions
    },
    clearZoo: () => {
      return initialState
    },
  },
})

// Actions
export const { addEgg, addAnimal, addEggs, addAnimals, burnEgg, burnAnimal,updatZooBalnce,updateMyEggs,updateMyTransactions, clearZoo } = ZooSlice.actions

export default ZooSlice.reducer

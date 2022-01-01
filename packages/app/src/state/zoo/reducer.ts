
import {
    getZooBalance,
} from './actions'

import { createReducer } from '@reduxjs/toolkit'
import { updateVersion } from '../global/actions'
import { ZooState } from './types'

const currentTimestamp = () => new Date().getTime()

export const initialState: ZooState = {
    animals: {},
    myBids: {},
    myAuctions: {},
    eggs: {},
    zooBalance: 0,
    myEggs: {},
    myTransactions: [],
}

export default createReducer(initialState, (builder) =>
    builder
        .addCase(getZooBalance, (state, action) => {
            state.zooBalance = action.payload.balance
        })

)

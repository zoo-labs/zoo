/* eslint-disable no-param-reassign */
import { Toast } from '../../components/Toast'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EggsState } from '../types'

const initialState: EggsState = {
  eggs: 0,
}

export const EggsSlice = createSlice({
  name: 'toasts',
  initialState,
  reducers: {
    add: (state: EggsState, action) => {
      const { payload } = action
      state.eggs = payload
    },
  },
})

// Actions
export const { add } = EggsSlice.actions

export default EggsSlice.reducer

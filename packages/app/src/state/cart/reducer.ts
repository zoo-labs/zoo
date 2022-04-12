

import { createReducer } from '@reduxjs/toolkit'
import { addCartItem, getCartItems, removeCartItem } from './actions'
import { CartItem } from 'types/item'


export interface TransactionState {
  CartItems: CartItem[]
}

export const initialState: TransactionState = {
  CartItems: [],
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(getCartItems, (state, { payload: cartItems }) => {
      state.CartItems = cartItems
    })
    .addCase(addCartItem, ({ CartItems }, { payload: cartItem }) => {
      const { _id } = cartItem
      if (CartItems[cartItem._id]) {
        throw Error('Attempted to add existing cart Item.')
      }
      CartItems[_id] = cartItem
    })
    .addCase(removeCartItem, (state, { payload: cartItem }) => {
      const { _id } = cartItem
      if (!_id) {
        return state;
      }
      const newCartItems = [...state.CartItems]
      delete newCartItems[_id];
      return {
        ...state,
        CartItems: { ...newCartItems },
      };
    }).addCase('clearCart', (state, { }) => {
      return { ...initialState }
    })
)

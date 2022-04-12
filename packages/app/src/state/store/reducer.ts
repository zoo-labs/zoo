

import { createReducer } from '@reduxjs/toolkit'
import { addCartItem, getCartItems, getProducts, removeCartItem } from './actions'
import { CartItem } from 'types/cart'
import { Product } from 'types/product';


export interface StoreState {
  CartItems: CartItem[];
  Products: Product[]
}

export const initialState: StoreState = {
  CartItems: [],
  Products: []
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(getProducts, (state, { payload: products }) => {
      state.Products = products
    })
    .addCase(getCartItems, (state, { payload: cartItems }) => {
      state.CartItems = cartItems
    })
    .addCase(addCartItem, ({ CartItems }, { payload: cartItem }) => {
      const { id } = cartItem
      if (CartItems[cartItem.id]) {
        throw Error('Attempted to add existing cart Item.')
      }
      CartItems[id] = cartItem
    })
    .addCase(removeCartItem, (state, { payload: cartItem }) => {
      const { id } = cartItem
      if (!id) {
        return state;
      }
      const newCartItems = [...state.CartItems]
      delete newCartItems[id];
      return {
        ...state,
        CartItems: { ...newCartItems },
      };
    }).addCase('clearCart', (state, { }) => {
      return { ...initialState }
    })
)

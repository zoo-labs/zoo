

import { createReducer } from '@reduxjs/toolkit'
import { addCartItem, getCartItems, getProducts, removeCartItem, clearCartItems } from './actions'
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
      const index = CartItems.findIndex((item) => item.id == id)

      if (CartItems[index]) {
        throw Error('Attempted to add existing cart Item.')
      }
      CartItems.push(cartItem)

    })
    .addCase(removeCartItem, (state, { payload: id }) => {
      if (!id) {
        return state;
      }
      const newCartItems = [...state.CartItems]
      return {
        ...state,
        CartItems: [...newCartItems.filter((item) => item.productId !== id)],
      };
    }).addCase(clearCartItems, (state, { }) => {
      return { ...state, CartItems: [] }
    })
)

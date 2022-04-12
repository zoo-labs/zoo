import { createAction } from '@reduxjs/toolkit'
import { CartItem } from 'types/cart'
import { Product } from 'types/product'

export const getCartItems = createAction<CartItem[]>('cart/getCartItems')
export const addCartItem = createAction<CartItem>('cart/addCartItem')
export const updateCartItem = createAction<CartItem>('cart/updateCartItem')
export const removeCartItem = createAction<CartItem>('cart/removeCartItem')
export const getProducts = createAction<Product[]>('product/getProducts')

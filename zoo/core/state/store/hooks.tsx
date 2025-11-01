import { useAppDispatch, useAppSelector } from "../hooks";
import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addCartItem,
  getCartItems,
  getProducts,
  removeCartItem,
  clearCartItems,
  updateCartItem,
} from "./actions";
import { toast } from "react-toastify";
import { CartItem } from "types/cart";
import { db } from "config/firebase";
import {
  collection,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { Product } from "types/product";

const notify = (message: string, type: string) => {
  switch (type) {
    case "error":
      toast.error(message);
      break;
    case "success":
      toast.success(message);
      break;
    default:
      toast.info(message);
  }
};

export function useCart(): [
  (cartItem: CartItem) => void,
  (id: string) => void,
  (cartItem: CartItem) => void,
  () => void
] {
  const dispatch = useAppDispatch();
  const addToCart = useCallback((cartItem) => {
    dispatch(addCartItem(cartItem));
  }, []);
  const removeFromCart = useCallback((id) => {
    dispatch(removeCartItem(id));
  }, []);
  const updateCart = useCallback((cartItem) => {
    dispatch(updateCartItem(cartItem));
  }, []);
  const clearCart = useCallback(() => {
    dispatch(clearCartItems());
  }, []);
  return [addToCart, removeFromCart, updateCart, clearCart];
}

// returns all the products
export function useAllProducts(): (
  startDate?: string,
  endDate?: string,
  noLimit?: boolean,
  callback?: (val: Array<Product>) => void
) => void {
  const dispatch = useDispatch();

  return useCallback(async (startDate, endDate, noLimit, callback) => {
    const products: Array<Product> = [];
    const productsRef = collection(db, "products");
    const productsQuery = query(productsRef, orderBy("createdAt"), limit(100));
    const productsQuerySnapshot = await getDocs(productsQuery);
    productsQuerySnapshot.forEach((doc) => {
      const data = { ...doc.data(), id: doc.id } as Product;
      products.push(data);
    });
    if (callback) {
      callback(products);
    } else {
      dispatch(getProducts(products));
    }
  }, []);
}

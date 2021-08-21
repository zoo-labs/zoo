import { configureStore, createSerializableStateInvariantMiddleware, isPlain } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import toastsReducer from './toasts'
import zooReducer from './zoo'

import { Iterable } from 'immutable'

// Augment middleware to consider Immutable.JS iterables serializable
const isSerializable = (value: any) => Iterable.isIterable(value) || isPlain(value) || value instanceof Date
const getEntries = (value: any) => (Iterable.isIterable(value) ? value.entries() : Object.entries(value))
const serializableMiddleware = createSerializableStateInvariantMiddleware({ isSerializable, getEntries })

const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    toasts: toastsReducer,
    zoo: zooReducer,
  },
  middleware: [serializableMiddleware],
})

export type AppDispatch = typeof store.dispatch
export type AppState = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store

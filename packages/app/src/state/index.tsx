import { configureStore, createSerializableStateInvariantMiddleware, isPlain } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import toastsReducer from './toasts'
import zooReducer from './zoo'
import swapReducer from './swap/reducer'
import listsReducer from './lists/reducer'
import multicallReducer from './multicall/reducer'
import applicationReducer from './application/reducer'
import userReducer from './user/reducer'
import transactionsReducer from './transactions/reducer'
import { Iterable } from 'immutable/dist/immutable.es.js'
import thunkMiddleware from "redux-thunk";


// Augment middleware to consider Immutable.JS iterables serializable
const isSerializable = (value: any) => Iterable.isIterable(value) || isPlain(value) || value instanceof Date
const getEntries = (value: any) => (Iterable.isIterable(value) ? value.entries() : Object.entries(value))
const serializableMiddleware = createSerializableStateInvariantMiddleware({ isSerializable, getEntries })

const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    toasts: toastsReducer,
    zoo: zooReducer,
    swap: swapReducer,
    lists: listsReducer,
    multicall: multicallReducer,
    application: applicationReducer,
    user: userReducer,
    transactions: transactionsReducer,
  },
  middleware: [thunkMiddleware,serializableMiddleware],
})

export type AppDispatch = typeof store.dispatch
export type AppState = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store

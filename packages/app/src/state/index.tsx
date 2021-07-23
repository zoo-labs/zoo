import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import toastsReducer from "./toasts";
import zooReducer from "./zoo"


const store = configureStore({
    devTools: process.env.NODE_ENV !== 'production',
    reducer: {
      toasts: toastsReducer,
      zoo: zooReducer,
    },
})
  

export type AppDispatch = typeof store.dispatch
export type AppState = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store
import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import toastsReducer from "./toasts";
import eggsReducer from "./toasts";


const store = configureStore({
    devTools: process.env.NODE_ENV !== 'production',
    reducer: {
      toasts: toastsReducer,
      eggs: eggsReducer,
    },
})
  

export type AppDispatch = typeof store.dispatch
export type AppState = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store
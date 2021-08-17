import React, { useState } from 'react'
import { Provider } from 'react-redux'
import { createStore } from '@reduxjs/toolkit'
import withReduxEnhancer from 'addon-redux/enhancer'

export const store = createStore(() => {}, withReduxEnhancer)

export const intState = {
  yourStorage: [],
}

export const StaticStore = ({ children }) => {
  return <Provider store={store}>{children}</Provider>
}

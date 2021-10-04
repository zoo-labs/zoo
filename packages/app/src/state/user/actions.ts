import { createAction, createAsyncThunk } from '@reduxjs/toolkit'

export interface SerializedToken {
  chainId: number
  address: string
  decimals: number
  symbol?: string
  name?: string
}

export interface SerializedPair {
  token0: SerializedToken
  token1: SerializedToken
}

export const updateMatchesDarkMode = createAction<{ matchesDarkMode: boolean }>('user/updateMatchesDarkMode')
export const updateUserDarkMode = createAction<{ userDarkMode: boolean }>('user/updateUserDarkMode')
export const updateUserAnimationMode = createAction<{ userAnimationMode: boolean }>('user/updateUserAnimationMode')
export const updateUserExpertMode = createAction<{ userExpertMode: boolean }>('user/updateUserExpertMode')
export const updateUserSingleHopOnly = createAction<{
  userSingleHopOnly: boolean
}>('user/updateUserSingleHopOnly')
export const updateUserSlippageTolerance = createAction<{
  userSlippageTolerance: number | 'auto'
}>('user/updateUserSlippageTolerance')
export const updateUserDeadline = createAction<{ userDeadline: number }>('user/updateUserDeadline')
export const addSerializedToken = createAction<{
  serializedToken: SerializedToken
}>('user/addSerializedToken')
export const removeSerializedToken = createAction<{
  chainId: number
  address: string
}>('user/removeSerializedToken')
export const addSerializedPair = createAction<{
  serializedPair: SerializedPair
}>('user/addSerializedPair')
export const removeSerializedPair = createAction<{
  chainId: number
  tokenAAddress: string
  tokenBAddress: string
}>('user/removeSerializedPair')
export const toggleURLWarning = createAction<void>('app/toggleURLWarning')
export const updateUserArcherUseRelay = createAction<{
  userArcherUseRelay: boolean
}>('user/updateUserArcherUseRelay')
export const updateUserArcherGasPrice = createAction<{
  userArcherGasPrice: string
}>('user/updateUserArcherGasPrice')
export const updateUserArcherETHTip = createAction<{
  userArcherETHTip: string
}>('user/updateUserArcherETHTip')
export const updateUserArcherGasEstimate = createAction<{
  userArcherGasEstimate: string
}>('user/updateUserArcherGasEstimate')
export const updateUserArcherTipManualOverride = createAction<{
  userArcherTipManualOverride: boolean
}>('user/updateUserArcherTipManualOverride')
export const setEthBalance = createAsyncThunk('user/setEthBalance', async (account: any, library: any) => {
  if (!account) return { balance: 0 }
  try {
    const val = await library.eth.getBalance(account)
    const divisor = parseFloat(Math.pow(10, 18).toString())
    const balance = parseFloat(val) / divisor
    return { balance }
  } catch (e) {
    console.error(`ISSUE LOADING ETH BALANCE`, e)
    return { balance: 0 }
  }
})

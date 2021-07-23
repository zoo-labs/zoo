import { Toast } from 'components'
import BigNumber from 'bignumber.js'
import { Token } from 'config/constants/types'

export type TranslatableText =
    | string
    | {
        id: number
        fallback: string
        data?: {
            [key: string]: string | number
        }
    }

export enum NFTCategory {
    GIF = 'gif',
    IMAGE = 'image',
    VIDEO = 'video',
    AUDIO = 'audio',
    TEXT = 'text',
    OTHER = 'other'
}

export interface Ask {
    id?: number
    amount?: BigNumber
    currency?: Currency
    createdByTimestamp?: BigNumber
    createdAtBlockNumber?: BigNumber
}

export interface userType {
    id: string
    profileImageRef?: string
    name?: string
    bio?: string
    website?: string
}

export interface Currency {
    id?: number
    symbol?: string
}

export interface latestBid {
    id?: number
    amount?: BigNumber
    currency?: string
}

// Slices states

export interface ToastsState {
    data: Toast[]
}

export interface EggsState {
    eggs: number
}


// Global state

export interface State {
    toasts: ToastsState,
    eggs: EggsState
}
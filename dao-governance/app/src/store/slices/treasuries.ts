import { StateCreator } from 'zustand';
import { DAOKey, DAOTreasury, TransferDisplayData } from '../../types';
import { GlobalStore, StoreMiddleware, StoreSlice } from '../store';

export type TreasuriesSlice = {
  treasuries: StoreSlice<DAOTreasury>;
  setTreasury: (daoKey: DAOKey, treasury: DAOTreasury) => void;
  getTreasury: (daoKey: DAOKey) => DAOTreasury;
  setTransfers: (daoKey: DAOKey, transfers: TransferDisplayData[]) => void;
  setTransfer: (daoKey: DAOKey, transfer: TransferDisplayData) => void;
};

const EMPTY_TREASURY: DAOTreasury = {
  totalUsdValue: 0,
  assetsFungible: [],
  assetsNonFungible: [],
  assetsDeFi: [],
  transfers: [],
};

export const createTreasuriesSlice: StateCreator<
  GlobalStore,
  StoreMiddleware,
  [],
  TreasuriesSlice
> = (set, get) => ({
  treasuries: {},
  setTreasury: (daoKey, treasury) => {
    set(
      state => {
        state.treasuries[daoKey] = treasury;
      },
      false,
      'setTreasury',
    );
  },
  setTransfers: (daoKey, transfers) => {
    set(
      state => {
        if (!state.treasuries[daoKey]) {
          state.treasuries[daoKey] = { ...EMPTY_TREASURY, transfers };
        } else {
          state.treasuries[daoKey].transfers = transfers;
        }
      },
      false,
      'setTransfers',
    );
  },
  setTransfer: (daoKey, transfer) => {
    set(
      state => {
        if (!state.treasuries[daoKey]) {
          state.treasuries[daoKey] = { ...EMPTY_TREASURY, transfers: [transfer] };
        } else if (state.treasuries[daoKey].transfers) {
          state.treasuries[daoKey].transfers?.push(transfer);
        } else {
          state.treasuries[daoKey].transfers = [transfer];
        }
      },
      false,
      'setTransfer',
    );
  },
  getTreasury: daoKey => {
    const treasuries = get().treasuries;
    const treasury = treasuries[daoKey];
    if (!treasury) {
      return EMPTY_TREASURY;
    }
    return treasury;
  },
});

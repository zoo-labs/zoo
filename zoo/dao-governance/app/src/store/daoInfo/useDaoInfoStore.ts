import { getAddress } from 'viem';
import { create } from 'zustand';
import { DAOOwnedEntities, DAOSubgraph, DAOModule, IDAO, SafeWithNextNonce } from '../../types';

export const initialDaoInfoStore: IDAO & DAOOwnedEntities = {
  safe: null,
  subgraphInfo: null,
  modules: null,
  gaslessVotingEnabled: false,
  paymasterAddress: null,
};

export interface DaoInfoStore extends IDAO {
  setSafeInfo: (safe: SafeWithNextNonce) => void;
  setDaoInfo: (daoInfo: DAOSubgraph) => void;
  setDAOModules: (modules: DAOModule[]) => void;
  resetDaoInfoStore: () => void;
}

export const useDaoInfoStore = create<DaoInfoStore>()(set => ({
  ...initialDaoInfoStore,
  setSafeInfo: (safe: SafeWithNextNonce) => {
    const { address, owners, nonce, nextNonce, threshold, modules, guard } = safe;
    set({
      safe: {
        owners: owners.map(owner => getAddress(owner)),
        modulesAddresses: modules.map(module => getAddress(module)),
        guard: getAddress(guard),
        address: getAddress(address),
        nextNonce,
        threshold,
        nonce: Number(nonce),
      },
    });
  },

  // called by subgraph data flow
  setDaoInfo: (subgraphInfo: DAOSubgraph) => {
    set({ subgraphInfo });
  },

  setDAOModules: (modules: DAOModule[]) => {
    set({ modules });
  },

  resetDaoInfoStore: () => set(initialDaoInfoStore),
}));

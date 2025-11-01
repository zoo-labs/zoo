import { createContext } from 'react';
import { DaoInfoStore } from '../../store/daoInfo/useDaoInfoStore';
import { EMPTY_GOVERNANCE } from '../../store/slices/governances';
import { useGlobalStore } from '../../store/store';
import { DAOKey, DAOSubgraph, DAOModule, FractalStore, SafeWithNextNonce } from '../../types';

export const FractalContext = createContext<FractalStore | null>(null);

type FractalStoreWithNode = FractalStore & {
  node: DaoInfoStore;
};

export const useDAOStore = ({ daoKey }: { daoKey: DAOKey | undefined }): FractalStoreWithNode => {
  const { getDaoNode, setDaoNode, getTreasury, getGovernance, getGuard, getGuardAccountData } =
    useGlobalStore();

  if (!daoKey) {
    return {
      node: {
        safe: null,
        subgraphInfo: null,
        modules: null,
        setSafeInfo: () => {},
        setDaoInfo: () => {},
        setDAOModules: () => {},
        resetDaoInfoStore: () => {},
      },
      treasury: {
        assetsDeFi: [],
        assetsFungible: [],
        assetsNonFungible: [],
        totalUsdValue: 0,
        transfers: [],
      },
      governance: EMPTY_GOVERNANCE,
      guard: {
        freezeProposalCreatedTime: null,
        freezePeriod: null,
        freezeProposalPeriod: null,
        freezeProposalVoteCount: null,
        freezeVotesThreshold: null,
        isFrozen: false,
      },
      guardAccountData: {
        userHasFreezeVoted: false,
        userHasVotes: false,
      },
      guardContracts: {
        freezeGuardContractAddress: undefined,
        freezeVotingContractAddress: undefined,
        freezeGuardType: null,
        freezeVotingType: null,
      },
      governanceContracts: {
        isLoaded: false,
        strategies: [],
        linearVotingErc20Address: undefined,
        linearVotingErc20WithHatsWhitelistingAddress: undefined,
        linearVotingErc721Address: undefined,
        linearVotingErc721WithHatsWhitelistingAddress: undefined,
        moduleAzoriusAddress: undefined,
        votesTokenAddress: undefined,
        lockReleaseAddress: undefined,
      },
    };
  }

  // Returning complete data from Zustand store will be handled in future tickets under following project:
  // https://linear.app/hanzoai/project/architecture-zustand-dao-addresses-as-keys-809cf9fe41b0
  const node = getDaoNode(daoKey);
  const treasury = getTreasury(daoKey);
  const governance = getGovernance(daoKey);
  const guard = getGuard(daoKey);
  const guardAccountData = getGuardAccountData(daoKey);
  return {
    node: {
      // TODO: Will be cleaned up in scope of https://linear.app/hanzoai/issue/ENG-630/cleanup-types-from-old-store-structure
      ...getDaoNode(daoKey),
      setSafeInfo: (safe: SafeWithNextNonce) => {
        setDaoNode(daoKey, { safe, daoInfo: node.subgraphInfo!, modules: node.modules! });
      },
      setDaoInfo: (daoInfo: DAOSubgraph) => {
        setDaoNode(daoKey, {
          safe: node.safe! as unknown as SafeWithNextNonce,
          daoInfo,
          modules: node.modules!,
        });
      },
      setDAOModules: (modules: DAOModule[]) => {
        setDaoNode(daoKey, {
          safe: node.safe! as unknown as SafeWithNextNonce,
          daoInfo: node.subgraphInfo!,
          modules,
        });
      },
      resetDaoInfoStore: () => {
        // Do nothing - global store currently not supposed to reset anything
      },
    },
    treasury,
    governance,
    governanceContracts: {
      isLoaded: governance.isLoaded,
      strategies: governance.strategies,
      linearVotingErc20Address: governance.linearVotingErc20Address,
      linearVotingErc20WithHatsWhitelistingAddress:
        governance.linearVotingErc20WithHatsWhitelistingAddress,
      linearVotingErc721Address: governance.linearVotingErc721Address,
      linearVotingErc721WithHatsWhitelistingAddress:
        governance.linearVotingErc721WithHatsWhitelistingAddress,
      moduleAzoriusAddress: governance.moduleAzoriusAddress,
      votesTokenAddress: governance.votesTokenAddress,
      lockReleaseAddress: governance.lockReleaseAddress,
    },
    guard,
    guardAccountData,
    guardContracts: {
      freezeGuardContractAddress: guard.freezeGuardContractAddress,
      freezeVotingContractAddress: guard.freezeVotingContractAddress,
      freezeGuardType: guard.freezeGuardType,
      freezeVotingType: guard.freezeVotingType,
    },
  };
};

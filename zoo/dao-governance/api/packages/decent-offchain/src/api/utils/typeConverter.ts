import { zeroAddress } from 'viem';
import { Dao } from 'sdk';
import { DbDao, DbOnchainProposal } from '@/db/schema/onchain';

export const formatDao = (dbDao: DbDao): Dao => {
  const dao = {
    chainId: dbDao.chainId,
    address: dbDao.address,
    safe: {
      owners: dbDao.signers.map(signer => signer.address),
      threshold: dbDao.requiredSignatures || 0,
    },
    name: dbDao.name,
    proposalTemplatesCID: dbDao.proposalTemplatesCID,
    governanceModules: dbDao.governanceModules.map(module => ({
      address: module.address,
      strategies: module.votingStrategies.map(strategy => ({
        address: strategy.address,
        version: 1, // TODO: [ENG-551] add version to db
        votingTokens: strategy.votingTokens.map(token => ({
          address: token.address,
          type: token.type,
        })),
      })),
    })),
    guardAddress: dbDao.guardAddress || zeroAddress,
    fractalModuleAddress: dbDao.fractalModuleAddress,
    hatIdToStreamIds: dbDao.hatIdToStreamIds.map(hatIdToStreamId => ({
      hatId: hatIdToStreamId.hatId,
      streamId: hatIdToStreamId.streamId,
    })),
    gastank: {
      address: dbDao.gasTankAddress,
      enabled: Boolean(dbDao.gasTankAddress && dbDao.gasTankEnabled),
    },
    creatorAddress: dbDao.creatorAddress,
    snapshotENS: dbDao.snapshotENS,
    createdAt: dbDao.createdAt || 0,
    updatedAt: dbDao.updatedAt || 0,
    parent: null,
    children: null,
    cycle: null,
  };
  return dao;
};

export const formatProposal = (dbProposal: DbOnchainProposal) => {
  const proposal = {
    id: dbProposal.id,
    title: dbProposal.title,
    description: dbProposal.description,
    proposer: dbProposal.proposer,
    votingStrategyAddress: dbProposal.votingStrategyAddress,
    transactions: dbProposal.transactions,
    decodedTransactions: dbProposal.decodedTransactions,
    proposedTxHash: dbProposal.proposedTxHash,
    executedTxHash: dbProposal.executedTxHash,
    createdAt: dbProposal.createdAt,
  };
  return proposal;
};

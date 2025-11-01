import { sql } from 'drizzle-orm';
import { schema } from './schema';

export const DEFAULT_DAO_WITH = {
  governanceModules: {
    columns: {
      address: true,
      name: true,
      description: true,
    },
    with: {
      votingStrategies: {
        columns: {
          address: true,
          minProposerBalance: true,
          name: true,
          description: true,
        },
        with: {
          votingTokens: {
            columns: {
              address: true,
              type: true,
            },
          },
        },
      },
    },
  },
  signers: {
    columns: {
      address: true,
    },
  },
  hatIdToStreamIds: {
    columns: {
      hatId: true,
      streamId: true,
    },
  },
};

export const DAO_SELECT_FIELDS = {
  chainId: schema.daoTable.chainId,
  address: schema.daoTable.address,
  name: schema.daoTable.name,
  proposalTemplatesCID: schema.daoTable.proposalTemplatesCID,
  snapshotENS: schema.daoTable.snapshotENS,
  subDaoOf: schema.daoTable.subDaoOf,
  topHatId: schema.daoTable.topHatId,
  gasTankEnabled: schema.daoTable.gasTankEnabled,
  gasTankAddress: schema.daoTable.gasTankAddress,
  creatorAddress: schema.daoTable.creatorAddress,
  requiredSignatures: schema.daoTable.requiredSignatures,
  guardAddress: schema.daoTable.guardAddress,
  fractalModuleAddress: schema.daoTable.fractalModuleAddress,
  erc20Address: schema.daoTable.erc20Address,
  createdAt: schema.daoTable.createdAt,
  updatedAt: schema.daoTable.updatedAt,
  governanceModuleExists: sql<boolean>`
    EXISTS (
      SELECT 1 FROM ${schema.governanceModuleTable}
      WHERE ${schema.daoTable.chainId} = ${schema.governanceModuleTable.daoChainId}
        AND ${schema.daoTable.address} = ${schema.governanceModuleTable.daoAddress}
    )
  `.as('governanceModuleExists'),
};

export const DAO_GOVERNANCE_MODULE_JOIN_CONDITION = sql`${schema.daoTable.chainId} = ${schema.governanceModuleTable.daoChainId} AND ${schema.daoTable.address} = ${schema.governanceModuleTable.daoAddress}`;

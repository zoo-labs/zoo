import { pgSchema, integer, text, boolean, bigint, primaryKey, json } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { Address } from 'viem';
import { SupportedChainId } from 'sdk';
import { hex } from './hex';

export type Transaction = {
  to: Address;
  value: bigint;
  data: string;
  operation: number;
};

// ================================
// ========= Tables ===============
// ================================
export const onchainSchema = pgSchema('onchain');
export const daoTable = onchainSchema.table(
  'dao',
  {
    chainId: integer('dao_chain_id').notNull().$type<SupportedChainId>(),
    address: hex('dao_address').notNull(),
    name: text('dao_name'),
    proposalTemplatesCID: text(),
    snapshotENS: text(),
    subDaoOf: hex(),
    topHatId: text(),
    gasTankEnabled: boolean(),
    gasTankAddress: hex(),
    creatorAddress: hex(),
    requiredSignatures: integer(),
    guardAddress: hex(),
    fractalModuleAddress: hex(),
    erc20Address: hex(),
    createdAt: bigint('created_at', { mode: 'number' }),
    updatedAt: bigint('updated_at', { mode: 'number' }),
  },
  t => [primaryKey({ columns: [t.chainId, t.address] })],
);

export const governanceModuleTable = onchainSchema.table('governance_module', {
  address: hex('governance_module_address').primaryKey(),
  daoChainId: integer('dao_chain_id').notNull(),
  daoAddress: hex('dao_address').notNull(),
  name: text('governance_module_name'),
  description: text('governance_module_description'),
});

export const votingStrategyTable = onchainSchema.table('voting_strategy', {
  address: hex('voting_strategy_address').primaryKey(),
  governanceModuleId: hex('governance_module_id').notNull(), // references governanceModule.address
  minProposerBalance: text('min_proposer_balance'),
  name: text('voting_strategy_name'),
  description: text('voting_strategy_description'),
  enabledAt: bigint('voting_strategy_enabled_at', { mode: 'number' }),
  disabledAt: bigint('voting_strategy_disabled_at', { mode: 'number' }),
});

export const tokenTypeEnum = onchainSchema.enum('token_type', ['ERC20', 'ERC721', 'ERC1155']);
export const votingTokenTable = onchainSchema.table('voting_token', {
  address: hex('voting_token_address').primaryKey(),
  votingStrategyId: hex('voting_strategy_id').notNull(), // references votingStrategy.address
  type: tokenTypeEnum('type').notNull(),
});

export const signerTable = onchainSchema.table('signer', {
  address: hex('signer_address').primaryKey(),
  label: text('signer_label'),
});

export const signerToDaoTable = onchainSchema.table(
  'signer_to_dao',
  {
    address: hex('std_signer_address').notNull(),
    daoChainId: integer('std_dao_chain_id').notNull(),
    daoAddress: hex('std_dao_address').notNull(),
  },
  t => [primaryKey({ columns: [t.address, t.daoChainId, t.daoAddress] })],
);

export const hatIdToStreamIdTable = onchainSchema.table(
  'hat_id_to_stream_id',
  {
    hatId: text('hat_id').notNull(),
    streamId: text('stream_id').notNull(),
    daoChainId: integer('dao_chain_id').notNull(),
    daoAddress: hex('dao_address').notNull(),
  },
  t => [primaryKey({ columns: [t.hatId, t.streamId] })],
);

export const onchainProposalTable = onchainSchema.table(
  'proposal',
  {
    id: bigint('proposal_id', { mode: 'number' }).notNull(),
    daoChainId: integer('dao_chain_id').notNull(),
    daoAddress: hex('dao_address').notNull(),
    proposer: hex('proposer').notNull(),
    votingStrategyAddress: hex('voting_strategy_address').notNull(),
    transactions: json('transactions').$type<Transaction[]>(),
    title: text('title').notNull(),
    description: text('description').notNull(),
    createdAt: bigint('created_at', { mode: 'number' }).notNull(),
    proposedTxHash: hex('proposed_tx_hash').notNull(),
    executedTxHash: hex('executed_tx_hash'),
  },
  t => [primaryKey({ columns: [t.id, t.daoChainId, t.daoAddress] })],
);

// ================================
// ========= Relations ============
// ================================
export const daoTableRelations = relations(daoTable, ({ many }) => ({
  signers: many(signerToDaoTable),
  governanceModules: many(governanceModuleTable),
  hatIdToStreamIds: many(hatIdToStreamIdTable),
}));

export const governanceModuleTableRelations = relations(governanceModuleTable, ({ one, many }) => ({
  dao: one(daoTable, {
    fields: [governanceModuleTable.daoChainId, governanceModuleTable.daoAddress],
    references: [daoTable.chainId, daoTable.address],
  }),
  votingStrategies: many(votingStrategyTable),
}));

export const signerTableRelations = relations(signerTable, ({ many }) => ({
  daos: many(signerToDaoTable),
}));

export const signerToDaoTableRelations = relations(signerToDaoTable, ({ one }) => ({
  signer: one(signerTable, {
    fields: [signerToDaoTable.address],
    references: [signerTable.address],
  }),
  dao: one(daoTable, {
    fields: [signerToDaoTable.daoChainId, signerToDaoTable.daoAddress],
    references: [daoTable.chainId, daoTable.address],
  }),
}));

export const votingStrategyTableRelations = relations(votingStrategyTable, ({ one, many }) => ({
  governanceModule: one(governanceModuleTable, {
    fields: [votingStrategyTable.governanceModuleId],
    references: [governanceModuleTable.address],
  }),
  votingTokens: many(votingTokenTable),
}));

export const votingTokenTableRelations = relations(votingTokenTable, ({ one }) => ({
  votingStrategy: one(votingStrategyTable, {
    fields: [votingTokenTable.votingStrategyId],
    references: [votingStrategyTable.address],
  }),
}));

export const hatIdToStreamIdTableRelations = relations(hatIdToStreamIdTable, ({ one }) => ({
  dao: one(daoTable, {
    fields: [hatIdToStreamIdTable.daoChainId, hatIdToStreamIdTable.daoAddress],
    references: [daoTable.chainId, daoTable.address],
  }),
}));

export const onchainProposalTableRelations = relations(onchainProposalTable, ({ one }) => ({
  dao: one(daoTable, {
    fields: [onchainProposalTable.daoChainId, onchainProposalTable.daoAddress],
    references: [daoTable.chainId, daoTable.address],
  }),
}));

// ================================
// ========== Types ===============
// ================================
export type DbDao = typeof daoTable.$inferSelect & {
  signers: DbSignerToDao[];
  governanceModules: DbGovernanceModule[];
  hatIdToStreamIds: DbHatIdToStreamId[];
};
export type DbGovernanceModule = typeof governanceModuleTable.$inferSelect & {
  votingStrategies: DbVotingStrategy[];
};
export type DbVotingStrategy = typeof votingStrategyTable.$inferSelect & {
  votingTokens: DbVotingToken[];
};
export type DbVotingToken = typeof votingTokenTable.$inferSelect;
export type DbSigner = typeof signerTable.$inferSelect;
export type DbSignerToDao = typeof signerToDaoTable.$inferSelect;
export type DbHatIdToStreamId = typeof hatIdToStreamIdTable.$inferSelect;
export type DbOnchainProposal = typeof onchainProposalTable.$inferSelect;

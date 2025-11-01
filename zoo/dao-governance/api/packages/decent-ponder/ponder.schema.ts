import {
  onchainTable,
  text,
  hex,
  bigint,
  boolean,
  integer,
  primaryKey,
  relations,
  onchainEnum,
  json,
} from 'ponder';

// ================================
// ========= Tables ===============
// ================================
export const dao = onchainTable('dao', {
    chainId:                integer('dao_chain_id').notNull(),
    address:                hex('dao_address').notNull(),
    name:                   text('dao_name'),
    proposalTemplatesCID:   text(),
    snapshotENS:            text(),
    subDaoOf:               hex(),
    topHatId:               text(),
    gasTankEnabled:         boolean(),
    gasTankAddress:         hex(),
    creatorAddress:         hex(),
    requiredSignatures:     integer(),
    guardAddress:           hex(),
    fractalModuleAddress:   hex(),
    erc20Address:           hex(),
    createdAt:              bigint('created_at'),
    updatedAt:              bigint('updated_at'),
  },
  (t) => ({ pk: primaryKey({ columns: [t.chainId, t.address] }) })
);

export const governanceModule = onchainTable('governance_module', {
  address:      hex('governance_module_address').primaryKey(),
  daoChainId:   integer('dao_chain_id').notNull(),
  daoAddress:   hex('dao_address').notNull(),
  name:         text('governance_module_name'),
  description:  text('governance_module_description'),
});

export const votingStrategy = onchainTable('voting_strategy', {
  address:            hex('voting_strategy_address').primaryKey(),
  governanceModuleId: hex('governance_module_id').notNull(), // references governanceModule.address
  minProposerBalance: text('min_proposer_balance').notNull(),
  name:               text('voting_strategy_name'),
  description:        text('voting_strategy_description'),
  enabledAt:          bigint('voting_strategy_enabled_at'),
  disabledAt:         bigint('voting_strategy_disabled_at'),
});

export const tokenType = onchainEnum('token_type', ['ERC20', 'ERC721', 'ERC1155']);
export const votingToken = onchainTable('voting_token', {
  address:          hex('voting_token_address').primaryKey(),
  votingStrategyId: hex('voting_strategy_id').notNull(), // references votingStrategy.address
  type:             tokenType('type').notNull(),
});

export const signer = onchainTable('signer', {
  address:  hex('signer_address').primaryKey(),
  label:    text('signer_label'),
});

export const signerToDao = onchainTable('signer_to_dao', {
  address:          hex('std_signer_address').notNull(),
  daoChainId:       integer('std_dao_chain_id').notNull(),
  daoAddress:       hex('std_dao_address').notNull(),
},(t) => ({ pk: primaryKey({ columns: [t.address, t.daoChainId, t.daoAddress] }) }));

export const hatIdToStreamId = onchainTable('hat_id_to_stream_id', {
  hatId:      text('hat_id'),
  streamId:   text('stream_id'),
  daoChainId: integer('dao_chain_id').notNull(),
  daoAddress: hex('dao_address').notNull(),
}, (t) => ({ pk: primaryKey({ columns: [t.hatId, t.streamId] }) }));

export const proposal = onchainTable('proposal', {
  id: bigint('proposal_id').notNull(),
  daoChainId: integer('dao_chain_id').notNull(),
  daoAddress: hex('dao_address').notNull(),
  proposer: hex('proposer').notNull(),
  votingStrategyAddress: hex('voting_strategy_address').notNull(),
  transactions: json('transactions'),
  title: text('title').notNull(),
  description: text('description').notNull(),
  createdAt: bigint('created_at').notNull(),
  proposedTxHash: hex('proposed_tx_hash').notNull(),
  executedTxHash: hex('executed_tx_hash'),
}, (t) => ({ pk: primaryKey({ columns: [t.id, t.daoChainId, t.daoAddress] }) }));

// ================================
// ========= Relations ============
// ================================
export const daoRelations = relations(dao, ({ many }) => ({
  signers: many(signerToDao),
  governanceModules: many(governanceModule),
  hatIdToStreamIds: many(hatIdToStreamId),
  proposals: many(proposal),
}));

export const governanceModuleRelations = relations(governanceModule, ({ one, many }) => ({
  dao: one(dao, {
    fields: [governanceModule.daoChainId, governanceModule.daoAddress],
    references: [dao.chainId, dao.address],
  }),
  votingStrategies: many(votingStrategy),
}));

export const signerRelations = relations(signer, ({ many }) => ({
  daos: many(signerToDao),
}));

export const signerDaoRelations = relations(signerToDao, ({ one }) => ({
  signer: one(signer, {
    fields: [signerToDao.address],
    references: [signer.address],
  }),
  dao: one(dao, {
    fields: [signerToDao.daoChainId, signerToDao.daoAddress],
    references: [dao.chainId, dao.address],
  }),
}));

export const votingStrategyRelations = relations(votingStrategy, ({ one, many }) => ({
  governanceModule: one(governanceModule, {
    fields: [votingStrategy.governanceModuleId],
    references: [governanceModule.address],
  }),
  votingTokens: many(votingToken),
}));

export const votingTokenRelations = relations(votingToken, ({ one }) => ({
  votingStrategy: one(votingStrategy, {
    fields: [votingToken.votingStrategyId],
    references: [votingStrategy.address],
  }),
}));

export const hatIdToStreamIdRelations = relations(hatIdToStreamId, ({ one }) => ({
  dao: one(dao, {
    fields: [hatIdToStreamId.daoChainId, hatIdToStreamId.daoAddress],
    references: [dao.chainId, dao.address],
  }),
}));

export const proposalRelations = relations(proposal, ({ one }) => ({
  dao: one(dao, {
    fields: [proposal.daoChainId, proposal.daoAddress],
    references: [dao.chainId, dao.address],
  }),
}));

// ================================
// ========== Types ===============
// ================================
export type Dao = typeof dao.$inferSelect;
export type DaoInsert = typeof dao.$inferInsert;
export type GovernanceModule = typeof governanceModule.$inferSelect;
export type GovernanceModuleInsert = typeof governanceModule.$inferInsert;
export type VotingStrategy = typeof votingStrategy.$inferSelect;
export type VotingStrategyInsert = typeof votingStrategy.$inferInsert;
export type VotingToken = typeof votingToken.$inferSelect;
export type VotingTokenInsert = typeof votingToken.$inferInsert;
export type Signer = typeof signer.$inferSelect;
export type SignerInsert = typeof signer.$inferInsert;
export type SignerToDao = typeof signerToDao.$inferSelect;
export type SignerToDaoInsert = typeof signerToDao.$inferInsert;
export type HatIdToStreamId = typeof hatIdToStreamId.$inferSelect;
export type HatIdToStreamIdInsert = typeof hatIdToStreamId.$inferInsert;

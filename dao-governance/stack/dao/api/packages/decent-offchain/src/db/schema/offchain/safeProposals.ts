import { integer, text, primaryKey, json, timestamp } from 'drizzle-orm/pg-core';
import { offchainSchema } from './offchain';
import { hex } from '../hex';
import { DataDecoded } from '@/lib/safe/types';

export const safeProposalTable = offchainSchema.table(
  'safe_proposals',
  {
    daoChainId: integer('dao_chain_id').notNull(),
    daoAddress: hex('dao_address').notNull(),
    safeNonce: integer('safe_nonce').notNull(),
    title: text('title'),
    description: text('description'),
    proposer: hex('proposer').notNull(),
    metadataCID: text('metadata_cid'),
    transactions: json('transactions').$type<DataDecoded>(),
    safeTxHash: hex('safe_tx_hash'),
    executedTxHash: hex('executed_tx_hash'),
    submissionDate: timestamp('submission_date').notNull(),
    executionDate: timestamp('execution_date'),
  },
  t => [primaryKey({ columns: [t.daoChainId, t.daoAddress, t.safeTxHash] })],
);

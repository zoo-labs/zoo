import * as onchainSchema from './onchain';
import { sessionTable } from './offchain/sessions';
import { safeProposalTable } from './offchain/safeProposals';

export const schema = {
  ...onchainSchema,
  safeProposalTable,
  sessionTable,
};

export type DbNewSafeProposal = typeof safeProposalTable.$inferInsert;

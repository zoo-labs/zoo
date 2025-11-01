import { Address, Optional } from './Common';
import { Token } from './Token';

export type ProposalPermission = {
  threshold: number; // voting weight
  whitelist: Optional<Address[]>; // Hats token IDs
};

export type VotingStrategy = {
  address: Address; // string
  version: Optional<number>;
  votingTokens: Token[];
};

export type GovernanceModule = {
  address: Address; // module address
  strategies: VotingStrategy[];
};

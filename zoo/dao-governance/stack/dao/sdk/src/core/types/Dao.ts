import { Address, Optional } from './Common';
import { GovernanceModule } from './Governance';
import { Safe } from './Safe';
import { SupportedChainId } from './Chains';

export type GasTank = {
  address: Optional<Address>;
  enabled: boolean; // if enabled, address should hold a value
};

export type GovernanceCycle = {
  firstStart: Date; // first ever cycle. Voting starts on cycle start
  days: number; // Days
};

export type HatPaymentStream = {
  hatId: string;
  streamId: string;
};

export type Dao = {
  chainId: SupportedChainId;
  address: Address;
  safe: Optional<Safe>;
  name: Optional<string>;
  proposalTemplatesCID: Optional<string>; // for ipfs proposal templates
  governanceModules: Optional<GovernanceModule[]>; // null if Multi-sig
  guardAddress: Address; // for subDAO, Freeze, parent DAO vote on FreezeVoting
  fractalModuleAddress: Optional<Address>; // for subDAO only, parent DAO can force child DAO to make a transaction
  hatIdToStreamIds: Optional<HatPaymentStream[]>;
  parent: Optional<Address>;
  children: Optional<Address[]>;
  gastank: Optional<GasTank>;
  snapshotENS: Optional<string>;
  cycle: Optional<GovernanceCycle>;
  createdAt: number; // created at block timestamp
  updatedAt: number; // updated at block timestamp
};

import { Tree } from '@hatsprotocol/sdk-v1-subgraph';
import { Client } from 'urql';
import { Address, Hex, PublicClient } from 'viem';
import { StoreSlice } from '../store/store';
import { SendAssetsData } from '../utils/dao/prepareSendAssetsActionData';
import { BigIntValuePair } from './common';
import { CreateProposalMetadata } from './proposalBuilder';

interface DAOHat {
  id: Hex;
  prettyId: string;
  name: string;
  description: string;
  smartAddress: Address;
}

export interface DAOTopHat extends DAOHat {}

export interface DAOAdminHat extends DAOHat {
  wearer?: Address;
}

type RoleTerm = {
  nominee: Address;
  termEndDate: Date;
  termNumber: number;
};

export type DAORoleHatTerms = {
  allTerms: RoleTerm[];
  currentTerm: (RoleTerm & { isActive: boolean | undefined }) | undefined;
  nextTerm: RoleTerm | undefined;
  expiredTerms: RoleTerm[];
};

export interface DAORoleHat extends Omit<DAOHat, 'smartAddress'> {
  wearerAddress: Address;
  smartAddress?: Address;
  roleTerms: DAORoleHatTerms;
  canCreateProposals: boolean;
  payments: SablierPayment[];
  isTermed: boolean;
  eligibility?: Address;
}

export interface DAOTree {
  topHat: DAOTopHat;
  adminHat: DAOAdminHat;
  roleHats: DAORoleHat[];
}

export interface SablierPayment {
  streamId: string;
  contractAddress: Address;
  recipient: Address;
  asset: {
    address: Address;
    name: string;
    symbol: string;
    decimals: number;
    logo: string;
  };
  amount: BigIntValuePair;
  startDate: Date;
  endDate: Date;
  cliffDate: Date | undefined;
  isStreaming: () => boolean;
  canUserCancel: () => boolean;
  withdrawableAmount: bigint;
  isCancelled: boolean;
}

export interface SablierPaymentFormValues extends Partial<SablierPayment> {
  isStreaming: () => boolean;
  canUserCancel: () => boolean;
  isCancelling: boolean;
  isValidatedAndSaved?: boolean;
  cancelable: boolean;
}

export interface RoleProps {
  handleRoleClick: () => void;
  name: string;
  wearerAddress?: Address;
  paymentsCount?: number;
  isCurrentTermActive?: boolean;
  isMemberTermPending?: boolean;
}

export interface RoleEditProps
  extends Omit<
    RoleProps,
    'hatId' | 'handleRoleClick' | 'paymentsCount' | 'name' | 'currentRoleTermStatus'
  > {
  name?: string;
  handleRoleClick: () => void;
  editStatus?: EditBadgeStatus;
  payments?: SablierPaymentFormValues[];
}

export interface RoleDetailsDrawerRoleHatProp
  extends Omit<DAORoleHat, 'payments' | 'smartAddress'> {
  smartAddress?: Address;
  payments?: (Omit<SablierPayment, 'contractAddress' | 'streamId'> & {
    contractAddress?: Address;
    streamId?: string;
  })[];
}

export interface RoleDetailsDrawerEditingRoleHatProp
  extends Omit<RoleDetailsDrawerRoleHatProp, 'wearerAddress'> {
  wearer: string;
}

export enum EditBadgeStatus {
  Updated,
  New,
  Removed,
  NewTermedRole,
  Inactive,
}
export const BadgeStatus: Record<EditBadgeStatus, string> = {
  [EditBadgeStatus.Updated]: 'updated',
  [EditBadgeStatus.New]: 'new',
  [EditBadgeStatus.Removed]: 'removed',
  [EditBadgeStatus.NewTermedRole]: 'newTermedRole',
  [EditBadgeStatus.Inactive]: 'Inactive',
};
export const BadgeStatusColor: Record<EditBadgeStatus, string> = {
  [EditBadgeStatus.Updated]: 'color-lilac-100',
  [EditBadgeStatus.New]: 'color-green-500',
  [EditBadgeStatus.Removed]: 'color-error-400',
  [EditBadgeStatus.NewTermedRole]: 'color-green-500',
  [EditBadgeStatus.Inactive]: 'color-neutral-400',
};

export enum RoleFormTermStatus {
  ReadyToStart,
  Current,
  Queued,
  Expired,
  Pending,
}
export interface HatStruct {
  maxSupply: 1; // No more than this number of wearers. Hardcode to 1
  details: string; // IPFS url/hash to JSON { version: '1.0', data: { name, description, ...arbitraryData } }
  imageURI: string;
  isMutable: boolean; // true
  wearer: Address;
  termEndDateTs: bigint; // 0 for non-termed roles
}

export interface HatStructWithPayments extends HatStruct {
  sablierStreamsParams: {
    sablier: Address;
    sender: Address;
    totalAmount: bigint;
    asset: Address;
    cancelable: boolean;
    transferable: boolean;
    timestamps: { start: number; cliff: number; end: number };
    broker: { account: Address; fee: bigint };
  }[];
}

export type EditedRoleFieldNames =
  | 'roleName'
  | 'roleDescription'
  | 'member'
  | 'payments'
  | 'roleType'
  | 'newTerm'
  | 'canCreateProposals';

export interface EditedRole {
  fieldNames: EditedRoleFieldNames[];
  status: EditBadgeStatus;
}

export interface RoleHatFormValue
  extends Partial<Omit<DAORoleHat, 'id' | 'wearerAddress' | 'payments' | 'roleTerms'>> {
  id: Hex;
  // The user-input field that could either be an address or an ENS name.
  wearer?: string;
  // Not a user-input field.
  // `resolvedWearer` is dynamically set from the resolved address of `wearer`, in case it's an ENS name.
  resolvedWearer?: Address;
  payments: SablierPaymentFormValues[];
  // form specific state
  editedRole?: EditedRole;
  roleEditingPaymentIndex?: number;
  isTermed?: boolean;
  roleTerms?: {
    nominee?: string;
    termEndDate?: Date;
    termNumber: number;
  }[];
  canCreateProposals: boolean;
}

export interface RoleHatFormValueEdited extends RoleHatFormValue {
  editedRole: EditedRole;
}

export type RoleFormValues = {
  proposalMetadata: CreateProposalMetadata;
  hats: RoleHatFormValue[];
  roleEditing?: RoleHatFormValue;
  customNonce?: number;
  actions: SendAssetsData[];
  newRoleTerm?: {
    nominee: string;
    termEndDate: Date;
    termNumber: number;
  };
};

export type PreparedNewStreamData = {
  recipient: Address;
  startDateTs: number;
  endDateTs: number;
  cliffDateTs: number;
  totalAmount: bigint;
  assetAddress: Address;
  cancelable: boolean;
};

export interface RoleDetailsDrawerProps {
  roleHat: RoleDetailsDrawerRoleHatProp | RoleDetailsDrawerEditingRoleHatProp;
  onOpen?: () => void;
  onClose: () => void;
  onEdit: (hatId: Hex) => void;
  isOpen?: boolean;
}

export interface RolesStoreData {
  hatsTreeId: undefined | null | StoreSlice<number>;
  hatsTree: undefined | null | DAOTree;
  streamsFetched: boolean;
  contextChainId: number | null;
}

export interface RolesStore extends RolesStoreData {
  getHat: (hatId: Hex) => DAORoleHat | null;
  getPayment: (hatId: Hex, streamId: string) => SablierPayment | null;
  setHatKeyValuePairData: (args: {
    daoKey: string;
    contextChainId: number | null;
    hatsTreeId?: number | null;
    streamIdsToHatIds: { hatId: BigInt; streamId: string }[];
  }) => void;
  setHatsTree: (params: {
    hatsTree: Tree | null | undefined;
    chainId: bigint;
    hatsProtocol: Address;
    erc6551Registry: Address;
    hatsAccountImplementation: Address;
    hatsElectionsImplementation: Address;
    publicClient: PublicClient;
    sablierSubgraphClient: Client;
    whitelistingVotingStrategy?: Address;
  }) => Promise<void>;
  refreshWithdrawableAmount: (hatId: Hex, streamId: string, publicClient: PublicClient) => void;
  updateCurrentTermStatus: (hatId: Hex, termStatus: 'active' | 'inactive') => void;
  resetRoles: () => void;
}

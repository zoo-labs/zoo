import { Address, Hex } from '../../types/Common';
import { SupportedChainId } from '../../types/Chains';
import { NewComment, UpdateComment } from '../../types/Discussion';
import { NewProposal, UpdateProposal } from '../../types/Proposal';

// Shared Params type used by multiple fetch functions
export type BaseParams = {
  apiUrl?: string;
};

// Auth
export type VerifySiweParams = {
  message: string;
  signature: Hex;
  apiUrl?: string;
};

// Comment
export type GetAllCommentsParams = {
  chainId: SupportedChainId;
  address: Address;
  slug: string;
  apiUrl?: string;
};

export type CreateCommentParams = {
  chainId: SupportedChainId;
  address: Address;
  slug: string;
  comment: NewComment;
  apiUrl?: string;
};

export type UpdateCommentParams = {
  chainId: SupportedChainId;
  address: Address;
  slug: string;
  commentId: string;
  comment: UpdateComment;
  apiUrl?: string;
};

export type DeleteCommentParams = {
  chainId: SupportedChainId;
  address: Address;
  slug: string;
  commentId: string;
  apiUrl?: string;
};

// DAO
export type GetDaoParams = {
  chainId: SupportedChainId;
  address: Address;
  apiUrl?: string;
};

export type GetAllDaosFilterParams = {
  chainId?: SupportedChainId;
  apiUrl?: string;
};

// Generic
export type GenericFetchParams = {
  route: string;
  options?: RequestInit;
  apiUrl?: string;
};

// Proposal
export type GetAllProposalsParams = {
  chainId: SupportedChainId;
  address: Address;
  apiUrl?: string;
};

export type ProposalParams = {
  chainId: SupportedChainId;
  address: Address;
  slug: string;
  apiUrl?: string;
};

export type CreateProposalParams = {
  chainId: SupportedChainId;
  address: Address;
  proposal: NewProposal;
  apiUrl?: string;
};

export type UpdateProposalParams = {
  chainId: SupportedChainId;
  address: Address;
  slug: string;
  proposal: UpdateProposal;
  apiUrl?: string;
};

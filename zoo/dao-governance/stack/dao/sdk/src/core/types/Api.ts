import { Address, Hex } from './Common';

export type ApiResponse<T = unknown> = {
  success: boolean;
  data?: T;
  error?: {
    type?: string;
    message: string;
    code?: string;
    details?: unknown;
  };
};

export type ProposalParams = {
  chainId: string;
  address: Address;
  slug?: string;
}

export type Meta = {
  name: string;
  version: string;
};

export type Health = string;

export type Permissions = {
  isProposer: boolean;
  isVoter: boolean;
  isSigner: boolean;
  isModerator: boolean;
};

export type User = {
  address: Address;
  ensName: string | null;
  permissions?: Permissions;
};

export type Nonce = {
  sessionId: string;
  nonce: string;
};

export type Logout = string;

export type VerifySiwe = {
  message: string;
  signature: Hex;
}

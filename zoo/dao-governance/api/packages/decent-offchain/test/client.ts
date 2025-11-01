import { beforeAll } from 'bun:test';
import { createWalletClient, http } from 'viem';
import { privateKeyToAccount, generatePrivateKey } from 'viem/accounts';
import { base } from 'viem/chains';
import { createSiweMessage } from 'viem/siwe';
import { db } from '@/db';
import { schema } from '@/db/schema';

// delete all sessions before running tests
beforeAll(async () => {
  await db.delete(schema.sessionTable).execute();
});

type WalletNumber = 1 | 2 | 3;

const PK1 = (process.env.TEST_PRIVATE_KEY_1 as `0x${string}`) || generatePrivateKey();
const PK2 = (process.env.TEST_PRIVATE_KEY_2 as `0x${string}`) || generatePrivateKey();
const PK3 = (process.env.TEST_PRIVATE_KEY_3 as `0x${string}`) || generatePrivateKey();

const PRIVATE_KEYS: Record<WalletNumber, `0x${string}`> = {
  1: PK1,
  2: PK2,
  3: PK3,
};

type WalletSession = {
  address: `0x${string}`;
  sessionId: string;
};

export const WALLETS: Record<WalletNumber, WalletSession> = {
  1: {
    address: privateKeyToAccount(PRIVATE_KEYS[1]).address,
    sessionId: 'blank',
  },
  2: {
    address: privateKeyToAccount(PRIVATE_KEYS[2]).address,
    sessionId: 'blank',
  },
  3: {
    address: privateKeyToAccount(PRIVATE_KEYS[3]).address,
    sessionId: 'blank',
  },
};

console.log('WALLETS');
console.log(WALLETS);

type ClientStore = {
  proposalSlug: string;
  commentId: string;
};
export const clientStore: ClientStore = {
  proposalSlug: '',
  commentId: '',
};

export const signedSiweMessage = async (nonce: string, accountNumber: WalletNumber) => {
  const account = privateKeyToAccount(PRIVATE_KEYS[accountNumber]);
  const client = createWalletClient({
    account,
    chain: base,
    transport: http(process.env.PONDER_RPC_URL_8453 as string),
  });

  const message = createSiweMessage({
    chainId: base.id,
    nonce,
    address: account.address,
    domain: 'localhost',
    uri: 'http://localhost:3000',
    version: '1',
  });

  const signature = await client.signMessage({ message });

  return {
    message,
    signature,
  };
};

export const setSessionId = (accountNumber: WalletNumber, sessionId: string) => {
  WALLETS[accountNumber].sessionId = sessionId;
};

export const setClientStore = (key: keyof ClientStore, value: string) => {
  clientStore[key] = value;
};

export const authHeader = (accountNumber: WalletNumber) => {
  return {
    Authorization: `Bearer ${WALLETS[accountNumber].sessionId}`,
  };
};

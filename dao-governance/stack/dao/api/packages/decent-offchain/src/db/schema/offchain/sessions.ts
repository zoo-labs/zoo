import { index, text, timestamp } from 'drizzle-orm/pg-core';
import { nanoid } from 'nanoid';
import { offchainSchema } from './offchain';
import { hex } from '../hex';

export const sessionTable = offchainSchema.table(
  'sessions',
  {
    id: text()
      .primaryKey()
      .$defaultFn(() => nanoid()),
    nonce: text().notNull(),
    address: hex(),
    ensName: text(),
    signature: text(),
    createdAt: timestamp().defaultNow(),
  },
  t => [index().on(t.address)],
);

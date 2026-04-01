import { sql } from 'drizzle-orm';
import { timestamp } from 'drizzle-orm/pg-core';

export const timestamps = {
  createdAt: timestamp({ mode: 'date', precision: 3 })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: timestamp({ mode: 'date', precision: 3 })
    .default(sql`null`)
    .$onUpdate(() => new Date()),
};

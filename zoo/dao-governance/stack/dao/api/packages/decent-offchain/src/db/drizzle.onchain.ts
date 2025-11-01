import { defineConfig } from 'drizzle-kit';
import { connectionString } from '.';

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/db/schema/onchain.ts',
  out: './test',
  dbCredentials: {
    url: connectionString,
  },
  casing: 'snake_case',
  verbose: true,
  schemaFilter: ['onchain'],
});

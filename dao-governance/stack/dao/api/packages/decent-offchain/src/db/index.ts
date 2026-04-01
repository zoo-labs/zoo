import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { schema } from './schema';

const LOCAL_DB = `postgres://${process.env.USER}@localhost:5432/dao`;
const DATABASE_URL = process.env.DATABASE_URL || LOCAL_DB;
const hide = (str: string) => str.replace(/:(.*?)@/, ':****@');
console.log('DB URL:', hide(DATABASE_URL));

export const connectionString = DATABASE_URL;

const client = new Pool({ connectionString });

export const db = drizzle({
  client,
  schema,
  casing: 'snake_case',
  // logger: true,
});

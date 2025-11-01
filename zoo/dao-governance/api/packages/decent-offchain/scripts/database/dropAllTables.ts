// THIS DELETES ALL TABLES AND SCHEMAS
// USE WITH CAUTION

import { Client } from 'pg';

async function dropAllTablesAndSchemas() {
  const client = new Client({
    // connectionString: process.env.DATABASE_URL,
    user: process.env.USER,
    host: 'localhost',
    database: 'dao',
    port: 5432,
  });

  try {
    await client.connect();

    // Drop all tables
    const tablesResult = await client.query(`
            SELECT tablename
            FROM pg_tables
            WHERE schemaname = 'public' OR schemaname = 'onchain' OR schemaname = 'offchain';
        `);

    console.log(tablesResult.rows);

    for (const row of tablesResult.rows) {
      await client.query(`DROP TABLE IF EXISTS ${row.tablename};`);
    }

    // Drop all schemas except 'public'
    const schemasResult = await client.query(`
            SELECT schema_name
            FROM information_schema.schemata
            WHERE schema_name = 'onchain' OR schema_name = 'offchain';
        `);

    for (const row of schemasResult.rows) {
      await client.query(`DROP SCHEMA IF EXISTS ${row.schema_name} CASCADE;`);
    }

    console.log('All tables and schemas dropped successfully.');
  } catch (err) {
    console.error('Error dropping tables and schemas:', err);
  } finally {
    await client.end();
  }
}

dropAllTablesAndSchemas();

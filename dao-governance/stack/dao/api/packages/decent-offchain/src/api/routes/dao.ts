import { Hono } from 'hono';
import { sql } from 'drizzle-orm';
import { db } from '@/db';
import resf, { ApiError } from '@/api/utils/responseFormatter';
import { bearerAuth } from '@/api/middleware/auth';
import { daoCheck } from '@/api/middleware/dao';
import { permissionsCheck } from '@/api/middleware/permissions';
import { getChainId } from '@/api/utils/chains';
import { getCIDFromSafeTransaction, getSafeTransactions } from '@/lib/safe';
import { schema } from '@/db/schema';
import { DAO_SELECT_FIELDS, DAO_GOVERNANCE_MODULE_JOIN_CONDITION } from '@/db/queries';
import { fetchMetadata } from '@/api/utils/metadata';

const app = new Hono();

/**
 * @title Get all DAOs
 * @route GET /d
 * @param {string} [name] - Optional name query parameter
 * @returns {Dao[]} Array of DAO objects
 */
app.get('/', async c => {
  const nameQueryParam = c.req.query('name');
  const daos = await db
    .select(DAO_SELECT_FIELDS)
    .from(schema.daoTable)
    .leftJoin(schema.governanceModuleTable, DAO_GOVERNANCE_MODULE_JOIN_CONDITION)
    .where(
      nameQueryParam ? sql`${schema.daoTable.name} ilike ${`%${nameQueryParam}%`}` : undefined,
    );
  return resf(c, daos);
});

/**
 * @title Get all DAOs for a specific chain
 * @route GET /d/{chainId}
 * @param {string} chainId - Chain ID parameter
 * @returns {Dao[]} Array of DAO objects
 */
app.get('/:chainId', async c => {
  const { chainId } = c.req.param();
  const chainIdNumber = getChainId(chainId);
  const daos = await db
    .select(DAO_SELECT_FIELDS)
    .from(schema.daoTable)
    .leftJoin(schema.governanceModuleTable, DAO_GOVERNANCE_MODULE_JOIN_CONDITION)
    .where(sql`${schema.daoTable.chainId} = ${chainIdNumber}`);

  return resf(c, daos);
});

/**
 * @title Get a DAO by chain ID and address
 * @route GET /d/{chainId}/{address}
 * @param {string} chainId - Chain ID parameter
 * @param {string} address - Address parameter
 * @returns {Dao} DAO object
 */
app.get('/:chainId/:address', daoCheck, async c => {
  const dao = c.get('dao');
  return resf(c, dao);
});

/**
 * @title Fetch all Safe proposals from Safe API and save to our DB
 * @route POST /d/{chainId}/{address}/safe-proposals
 * @param {string} chainId - Chain ID parameter
 * @param {string} address - Address parameter
 * @returns {SafeProposal[]} Array of Safe proposal objects
 */
app.post('/:chainId/:address/safe-proposals', daoCheck, async c => {
  const dao = c.get('dao');
  if (dao.governanceModules?.length !== 0) throw new ApiError('DAO is not a Safe DAO', 400);
  const latestProposal = await db.query.safeProposalTable.findFirst({
    where: (safeProposal, { eq }) =>
      eq(safeProposal.daoChainId, dao.chainId) && eq(safeProposal.daoAddress, dao.address),
    orderBy: (safeProposal, { desc }) => desc(safeProposal.submissionDate),
  });
  const since = latestProposal ? new Date(latestProposal.submissionDate.getTime() + 1) : undefined;

  const transactions = await getSafeTransactions(dao.chainId, dao.address, since);
  if (transactions.results.length === 0) return resf(c, []);

  const proposals = await Promise.all(
    transactions.results.map(async t => {
      const proposer = (t.proposer || t.confirmations?.[0]?.owner) as `0x${string}`;
      const executedTxHash = t.transactionHash as `0x${string}`;
      const safeTxHash = t.safeTxHash as `0x${string}`;
      const cid = getCIDFromSafeTransaction(t);
      const metadata = cid ? await fetchMetadata(cid) : { title: null, description: null };
      const { title, description } = metadata;
      const submissionDate = new Date(t.submissionDate);
      const executionDate = t.executionDate ? new Date(t.executionDate) : null;
      return {
        daoChainId: dao.chainId,
        daoAddress: dao.address,
        proposer,
        safeNonce: t.nonce,
        safeTxHash,
        transactions: t.dataDecoded,
        executedTxHash,
        metadataCID: cid,
        title,
        description,
        submissionDate,
        executionDate,
      };
    }),
  );

  const inserted = await db
    .insert(schema.safeProposalTable)
    .values(proposals)
    .onConflictDoUpdate({
      target: [
        schema.safeProposalTable.daoChainId,
        schema.safeProposalTable.daoAddress,
        schema.safeProposalTable.safeTxHash,
      ],
      set: {
        metadataCID: sql.raw(`excluded.${schema.safeProposalTable.metadataCID.name}`),
        transactions: sql.raw(`excluded.${schema.safeProposalTable.transactions.name}`),
        executedTxHash: sql.raw(`excluded.${schema.safeProposalTable.executedTxHash.name}`),
        title: sql.raw(`excluded.${schema.safeProposalTable.title.name}`),
        description: sql.raw(`excluded.${schema.safeProposalTable.description.name}`),
        submissionDate: sql.raw(`excluded.${schema.safeProposalTable.submissionDate.name}`),
        executionDate: sql.raw(`excluded.${schema.safeProposalTable.executionDate.name}`),
      },
    })
    .returning();

  return resf(c, inserted);
});

/**
 * @title Get my permissions for a DAO
 * @route GET /d/{chainId}/{address}/me
 * @param {string} chainId - Chain ID parameter
 * @param {string} address - Address parameter
 * @returns {User} User object
 */
app.get('/:chainId/:address/me', daoCheck, bearerAuth, permissionsCheck, async c => {
  const user = c.get('user');
  if (!user) throw new ApiError('User not found', 401);
  return resf(c, user);
});

export default app;

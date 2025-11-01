import { Hono } from 'hono';
import { Health, Meta, SupportedChainId } from 'sdk';
import { count } from 'drizzle-orm';
import resf, { ApiError } from '@/api/utils/responseFormatter';
import { db } from '@/db';
import { daoTable, onchainProposalTable } from '@/db/schema/onchain';

const app = new Hono();

/**
 * @title Get API metadata
 * @route GET /
 * @returns {Meta} API metadata
 */
app.get('/', c => {
  const version = process.env.RAILWAY_GIT_COMMIT_SHA?.slice(0, 7) || 'local';
  const meta: Meta = {
    name: 'offchain',
    version,
  };
  return resf(c, meta);
});

/**
 * @title Get API health status
 * @route GET /health
 * @returns {Health} Health status
 */
app.get('/health', c => {
  const status: Health = 'ok';
  return resf(c, status);
});

/**
 * @title Get all chains with DAOs
 * @route GET /chains
 * @returns {SupportedChainId[]} Array of chain IDs
 */
app.get('/chains', async c => {
  const chainIds = await db.selectDistinct({ chainId: daoTable.chainId }).from(daoTable);
  const chains: SupportedChainId[] = chainIds.map(chain => chain.chainId).sort((a, b) => a - b);
  return resf(c, chains);
});

/**
 * @title Get platform stats
 * @route GET /stats
 * @returns Platform stats
 */
app.get('/stats', async c => {
  const [daoCountResult, proposalCountResult] = await Promise.all([
    db.select({ count: count() }).from(daoTable),
    db.select({ count: count() }).from(onchainProposalTable),
  ]);

  if (!daoCountResult.length || !daoCountResult[0]) throw new ApiError('Failed to get daos', 500);
  if (!proposalCountResult.length || !proposalCountResult[0])
    throw new ApiError('Failed to get proposals', 500);

  const daoCount = daoCountResult[0].count;
  const proposalCount = proposalCountResult[0].count;

  return resf(c, { daoCount, proposalCount });
});
export default app;

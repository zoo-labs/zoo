import { Context, Hono } from 'hono';
import { sql } from 'drizzle-orm';
import { Address, getAbiItem, isAddress, toFunctionSelector } from 'viem';
import { db } from '@/db';
import { schema } from '@/db/schema';
import { ApiError } from '@/api/utils/responseFormatter';
import { abis } from '@fractal-framework/fractal-contracts';

const app = new Hono();

// ================================
// ====== HELPER FUNCTIONS ========
// ================================
// simple function selectors for now
const functionSelectors = {
  transfer: toFunctionSelector('transfer(address,uint256)'),
  disperseToken: toFunctionSelector('disperseToken(address,address[],uint256[])'),
  createRoleHats: toFunctionSelector(
    getAbiItem({
      abi: abis.DecentHatsModificationModule,
      name: 'createRoleHats',
    }),
  ),
  createAndDeclareTree: toFunctionSelector(
    getAbiItem({
      abi: abis.DecentHatsCreationModule,
      name: 'createAndDeclareTree',
    }),
  ),
  createWithDurationsLT: toFunctionSelector(
    'createWithDurationsLT(address,address,(address,address,uint128,bool,bool,(uint128,uint40)[],(address,uint256))[])',
  ),
};

type FunctionSelector = keyof typeof functionSelectors;

const checkDataForFunction = (data: string, selector: FunctionSelector) => {
  if (!data) return false;
  const functionSelector = functionSelectors[selector];
  return data.startsWith(functionSelector);
};

const getProposalsByAuthor = async ({
  address,
  passed,
}: {
  address: Address;
  passed?: boolean;
}) => {
  const [onchainProposals, safeProposals] = await Promise.all([
    db.query.onchainProposalTable.findMany({
      where: passed
        ? sql`LOWER(${schema.onchainProposalTable.proposer}) = ${address} AND ${schema.onchainProposalTable.executedTxHash} IS NOT NULL`
        : sql`LOWER(${schema.onchainProposalTable.proposer}) = ${address}`,
    }),
    db.query.safeProposalTable.findMany({
      where: passed
        ? sql`LOWER(${schema.safeProposalTable.proposer}) = ${address} AND ${schema.safeProposalTable.executedTxHash} IS NOT NULL`
        : sql`LOWER(${schema.safeProposalTable.proposer}) = ${address}`,
    }),
  ]);
  return {
    onchainProposals,
    safeProposals,
  };
};

const checkAddress = async (c: Context) => {
  const _address = c.req.query('address');
  if (!_address) throw new ApiError('Address is required', 400);
  const valid = isAddress(_address);
  if (!valid) throw new ApiError('Invalid address', 400);
  const address = _address.toLowerCase() as Address;
  return address;
};
// ================================
// ================================

/**
 * @title Get the number of proposals that an address has submitted, optionally filtered by passed status
 * @route GET /points/proposals
 * @param {string} address - Address parameter
 * @param {boolean} passed - Whether to filter for passed proposals
 * @returns {address, proposalCount, status} - The address and the number of proposals that the address has submitted and 'success' or 'failed'
 */
app.get('/proposals', async c => {
  const address = await checkAddress(c);
  const passed = c.req.query('passed') === 'true';
  const { onchainProposals, safeProposals } = await getProposalsByAuthor({ address, passed });
  const proposalCount = onchainProposals.length + safeProposals.length;
  const status = proposalCount > 0 ? 'success' : 'failed';
  return c.json({ address, proposalCount, status });
});

/**
 * @title Get the number of passing transfer proposals that an address has submitted
 * @route GET /points/transfers
 * @param {string} address - Address parameter
 * @returns {address, transferCount, status} - The address and the number of transfer proposals that the address has submitted and 'success' or 'failed'
 */
app.get('/transfers', async c => {
  const address = await checkAddress(c);
  const { onchainProposals, safeProposals } = await getProposalsByAuthor({ address, passed: true });

  const hasOnchainTransferProposal = onchainProposals.filter(proposal =>
    proposal.transactions?.find(transaction => checkDataForFunction(transaction.data, 'transfer')),
  ).length;

  const hasSafeTransferProposal = safeProposals.filter(proposal =>
    proposal?.transactions?.parameters?.find(parameter =>
      parameter.valueDecoded?.find(value => checkDataForFunction(value.data, 'transfer')),
    ),
  ).length;

  const transferCount = hasOnchainTransferProposal + hasSafeTransferProposal;
  const status = transferCount > 0 ? 'success' : 'failed';
  return c.json({ address, transferCount, status });
});

/**
 * @title Get the number of passing disperse proposals that an address has submitted
 * @route GET /points/disperses
 * @param {string} address - Address parameter
 * @returns {address, disperseCount, status} - The address and the number of disperse proposals that the address has submitted and 'success' or 'failed'
 */
app.get('/disperses', async c => {
  const address = await checkAddress(c);
  const { onchainProposals, safeProposals } = await getProposalsByAuthor({ address, passed: true });

  const hasOnchainDisperseProposal = onchainProposals.filter(proposal =>
    proposal.transactions?.find(transaction =>
      checkDataForFunction(transaction.data, 'disperseToken'),
    ),
  ).length;

  const hasSafeDisperseProposal = safeProposals.filter(proposal =>
    proposal?.transactions?.parameters?.find(parameter =>
      parameter.valueDecoded?.find(value => checkDataForFunction(value.data, 'disperseToken')),
    ),
  ).length;

  const disperseCount = hasOnchainDisperseProposal + hasSafeDisperseProposal;
  const status = disperseCount > 0 ? 'success' : 'failed';
  return c.json({ address, disperseCount, status });
});

/**
 * @title Get the number of passing role proposals that an address has submitted
 * @route GET /points/roles
 * @param {string} address - Address parameter
 * @param {boolean} passed - Whether to filter for passed proposals
 * @returns {address, roleCount, status} - The address and the number of role proposals that the address has submitted and 'success' or 'failed'
 */
app.get('/roles', async c => {
  const address = await checkAddress(c);
  const { onchainProposals, safeProposals } = await getProposalsByAuthor({ address, passed: true });

  const hasOnchainRoleProposal = onchainProposals.filter(proposal =>
    proposal.transactions?.find(
      transaction =>
        checkDataForFunction(transaction.data, 'createRoleHats') ||
        checkDataForFunction(transaction.data, 'createAndDeclareTree'),
    ),
  ).length;

  const hasSafeRoleProposal = safeProposals.filter(proposal =>
    proposal?.transactions?.parameters?.find(parameter =>
      parameter.valueDecoded?.find(
        value =>
          checkDataForFunction(value.data, 'createRoleHats') ||
          checkDataForFunction(value.data, 'createAndDeclareTree'),
      ),
    ),
  ).length;

  const roleCount = hasOnchainRoleProposal + hasSafeRoleProposal;
  const status = roleCount > 0 ? 'success' : 'failed';
  return c.json({ address, roleCount, status });
});

/**
 * @title Get the number of passing stream proposals that an address has submitted
 * @route GET /points/streams
 * @param {string} address - Address parameter
 * @returns {address, streamCount, status} - The address and the number of stream proposals that the address has submitted and 'success' or 'failed'
 */
app.get('/streams', async c => {
  const address = await checkAddress(c);
  const { onchainProposals, safeProposals } = await getProposalsByAuthor({ address, passed: true });

  const hasOnchainStreamProposal = onchainProposals.filter(proposal =>
    proposal.transactions?.find(transaction =>
      checkDataForFunction(transaction.data, 'createWithDurationsLT'),
    ),
  ).length;

  const hasSafeStreamProposal = safeProposals.filter(proposal =>
    proposal?.transactions?.parameters?.find(parameter =>
      parameter.valueDecoded?.find(value =>
        checkDataForFunction(value.data, 'createWithDurationsLT'),
      ),
    ),
  ).length;

  const streamCount = hasOnchainStreamProposal + hasSafeStreamProposal;
  const status = streamCount > 0 ? 'success' : 'failed';
  return c.json({ address, streamCount, status });
});

export default app;

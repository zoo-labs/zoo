import { isAddress } from 'viem';
import { Context, ponder } from 'ponder:registry';
import { replaceBigInts } from 'ponder';
import { fetchGovernance } from './fetch';
import {
  dao,
  DaoInsert,
  governanceModule,
  signer,
  signerToDao,
  votingStrategy,
  votingToken,
  hatIdToStreamId,
  HatIdToStreamIdInsert,
  proposal
} from 'ponder:schema';
import { AzoriusAbi } from '../abis/Azorius';

// @TODO ENG-1080
// Use ZodiacModuleProxyFactory to get
// initial data Safe and governance modules for the DAO
const handleGovernanceData = async (
  entry: DaoInsert,
  context: Context,
  timestamp: bigint,
) => {
  const { address } = entry;

  let governance = null;
  governance = await fetchGovernance(context, address);
  entry.guardAddress = governance.guard;
  entry.fractalModuleAddress = governance.fractalModuleAddress;
  entry.requiredSignatures = governance.threshold;

  await context.db.insert(dao).values({ ...entry, createdAt: timestamp }).onConflictDoUpdate(() => {
    const { chainId, address, ...rest } = entry;
    return {
      ...rest,
      updatedAt: timestamp,
    }
  });

  if (governance.governanceModules.length > 0) {
    await context.db.insert(governanceModule).values(
      governance.governanceModules
    ).onConflictDoNothing();
  }

  if (governance.votingStrategies.length > 0) {
    await context.db.insert(votingStrategy).values(
      governance.votingStrategies
    ).onConflictDoNothing();
  }

  if (governance.votingTokens.length > 0) {
    await context.db.insert(votingToken).values(
      governance.votingTokens
    ).onConflictDoNothing();
  }

  if (governance.signers.length > 0) {
    await context.db.insert(signer).values(
      governance.signers
    ).onConflictDoNothing();
  }

  if (governance.signerToDaos.length > 0) {
    await context.db.insert(signerToDao).values(
      governance.signerToDaos
    ).onConflictDoNothing();
  }
};

// KeyValuePairs is a generic key value store for DAO
// Subgraph: https://github.com/luxdao/subgraph/blob/main/src/key-value-pairs.ts
// Contract: https://github.com/luxdao/contracts/blob/develop/contracts/singletons/KeyValuePairs.sol
ponder.on('KeyValuePairs:ValueUpdated', async ({ event, context }) => {
  const { theAddress: safeAddress, key, value } = event.args;
  const entry: DaoInsert = {
    chainId: context.chain.id,
    address: safeAddress,
  }

  if (key === 'daoName') {
    entry.name = value;
    entry.creatorAddress = event.transaction.from;

  } else if (key === 'proposalTemplates') {
    entry.proposalTemplatesCID = value;

  } else if (key === 'snapshotENS' || key === 'snapshotURL') {
    const cleanedValue = value === '' ? null : value;
    entry.snapshotENS = cleanedValue;

  } else if (key === 'childDao') {
    if (!isAddress(value)) {
      throw new Error(`Invalid childDao: ${value} for ${safeAddress}`);
    }
    entry.address = value;
    entry.subDaoOf = safeAddress;

  } else if (key === 'topHatId') {
    entry.topHatId = value;

  } else if (key === 'hatIdToStreamId') {
    const [hatId, streamId] = value.split(':');
    const hatIdToStreamIdData: HatIdToStreamIdInsert = {
      daoChainId: context.chain.id,
      daoAddress: safeAddress,
      hatId: hatId,
      streamId: streamId,
    }
    await context.db.insert(hatIdToStreamId).values(hatIdToStreamIdData).onConflictDoNothing();
    return;

  } else if (key === 'gaslessVotingEnabled') {
    entry.gasTankEnabled = value === 'true';

  } else if (key === 'erc20Address') {
    if (!isAddress(value)) {
      throw new Error(`Invalid erc20Address: ${value} for ${safeAddress}`);
    }
    entry.erc20Address = value;

  } else {
    console.log('--------------------------------');
    console.log('Unknown key:', key);
    console.log('Network:', context.chain.id);
    console.log(`DAO: ${entry.chainId}:${entry.address}`);
    console.log('Value:', value);
    console.log('--------------------------------');
  }

  try {
    await handleGovernanceData(entry, context, event.block.timestamp);
  } catch (error) {
    console.log('--------------------------------');
    console.log('Error handling governance data:', error);
    console.dir(event, { depth: null });
    console.log('--------------------------------');
  }
});

// DAO used to be called Fractal and used this event to set the dao name
// Subgraph: https://github.com/luxdao/subgraph/blob/main/src/fractal-registry.ts
// Contract: https://github.com/luxdao/contracts/blob/87b74fc69c788709bb606c59e41cf5a365506b06/contracts/FractalRegistry.sol
ponder.on('FractalRegistry:FractalNameUpdated', async ({ event, context }) => {
  const { daoAddress, daoName } = event.args;
  const entry: DaoInsert = {
    chainId: context.chain.id,
    address: daoAddress,
    name: daoName,
    creatorAddress: event.transaction.from,
  }

  await handleGovernanceData(entry, context, event.block.timestamp);
});

ponder.on('FractalRegistry:FractalSubDAODeclared', async ({ event, context }) => {
  const { parentDAOAddress, subDAOAddress } = event.args;
  const entry: DaoInsert = {
    chainId: context.chain.id,
    address: subDAOAddress,
    subDaoOf: parentDAOAddress,
  }

  await handleGovernanceData(entry, context, event.block.timestamp);
});


ponder.on('ZodiacModules:ProposalCreated', async ({ event, context }) => {
  try {
    const { proposalId, proposer, transactions, metadata, strategy } = event.args;
    if (!event.transaction.to) return;
    const daoAddress = await context.client.readContract({
      address: event.transaction.to,
      abi: AzoriusAbi,
      functionName: 'target',
    });
    const { title, description } = JSON.parse(metadata);
    await context.db.insert(proposal).values({
      id: proposalId,
      daoChainId: context.chain.id,
      daoAddress,
      proposer,
      votingStrategyAddress: strategy,
      transactions: replaceBigInts(transactions, (x) => x.toString()),
      title,
      description,
      createdAt: event.block.timestamp,
      proposedTxHash: event.transaction.hash,
    }).onConflictDoNothing();
  } catch (error) {
    console.log('assuming not Azorius module, skipping...');
  }
});

ponder.on('ZodiacModules:ProposalExecuted', async ({ event, context }) => {
  try {
    const { proposalId } = event.args;
    if (!event.transaction.to) return;
    const daoAddress = await context.client.readContract({
      address: event.transaction.to,
      abi: AzoriusAbi,
      functionName: 'target'
    });
    await context.db.update(proposal, {
      id: BigInt(proposalId),
      daoAddress,
      daoChainId: context.chain.id,
    }).set({
      executedTxHash: event.transaction.hash,
    });
  } catch (error) {
    console.log('event.transaction.to is not Azorius module, skipping...');
  }
});

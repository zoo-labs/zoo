import { Hono } from 'hono';
import { Address, isAddress } from 'viem';
import { SUPPORTED_CHAIN_IDS } from 'sdk';
import { eq, and, or, sql, inArray } from 'drizzle-orm';
import { db } from '@/db';
import resf, { ApiError } from '@/api/utils/responseFormatter';
import {
  daoTable,
  votingTokenTable,
  votingStrategyTable,
  governanceModuleTable,
} from '@/db/schema/onchain';
import { duneFetchBalances, duneFetchTransactions, duneFetchToken } from '@/lib/dune';
import { LogEntry } from '@/lib/dune/types';

const app = new Hono();

const TRANSFER_TOPIC = '0xddf252ad';
const STAKE_METHOD_ID = '0xa694fc3a';

function getStakedTokenPair(logs: LogEntry[], userAddress: Address): [Address, Address] | null {
  const token = logs.find(
    log =>
      log.topics?.[0]?.startsWith(TRANSFER_TOPIC) &&
      log.topics?.[1]?.slice(-40) === userAddress.slice(2),
  );

  const stakedToken = logs.find(
    log =>
      log.topics?.[0]?.startsWith(TRANSFER_TOPIC) &&
      log.topics?.[2]?.slice(-40) === userAddress.slice(2),
  );

  if (!token || !stakedToken) return null;

  return [token.address, stakedToken.address];
}

/**
 * @title Get DAOs that wallet address holds tokens OR has staked tokens from
 * @route GET /wallet/:walletAddress
 * @returns
 *  {
 *    chainId: number,
 *    address: string,
 *    name: string,
 *    token: {
 *      address: string,
 *      symbol: string,
 *      name: string,
 *      balance: string,
 *      decimals: number,
 *      price_usd: number,
 *      value_usd: number,
 *      logo?: string
 *    },
 *    stakedToken?: {
 *      address: string,
 *      symbol: string,
 *      name: string,
 *      balance: string,
 *      decimals: number,
 *      price_usd: number,
 *      value_usd: number,
 *      logo?: string
 *    }
 *  }[]
 */
app.get('/:walletAddress', async c => {
  const { walletAddress } = c.req.param();
  const walletQuery = walletAddress?.toLowerCase() as Address;
  if (!isAddress(walletQuery)) throw new ApiError('Invalid wallet address', 400);

  const { balances } = await duneFetchBalances(walletQuery, {
    chainIds: SUPPORTED_CHAIN_IDS.join(','),
    metadata: true,
  });

  // Filter out tokens that have a space in the symbol, these are spam
  const filteredTokens = balances.filter(token => !token.symbol?.includes(' '));
  if (filteredTokens.length === 0) throw new ApiError('No tokens found for wallet', 404);

  const dbSearchTokenSet = new Set(
    filteredTokens.map(token => token.address.toLowerCase() as Address),
  );

  // Get stake transactions for the wallet
  const { transactions } = await duneFetchTransactions(walletQuery, {
    chainIds: SUPPORTED_CHAIN_IDS.join(','),
    method_id: STAKE_METHOD_ID,
  });

  const stakedTokenMap = new Map(
    transactions
      .map(tx => {
        const pair = getStakedTokenPair(tx.logs, walletQuery);
        // Wallet may only hold the staked token so we need to add the token to the search
        if (pair) dbSearchTokenSet.add(pair[0]);
        return pair;
      })
      .filter(pair => pair !== null),
  );

  const daos = await db
    .selectDistinct({
      name: daoTable.name,
      address: daoTable.address,
      chainId: daoTable.chainId,
      tokenAddress: sql<Address>`
        CASE 
          WHEN ${daoTable.erc20Address} IS NOT NULL THEN ${daoTable.erc20Address}
          ELSE ${votingTokenTable.address}
        END
      `.as('tokenAddress'),
    })
    .from(daoTable)
    .leftJoin(
      governanceModuleTable,
      and(
        eq(governanceModuleTable.daoChainId, daoTable.chainId),
        eq(governanceModuleTable.daoAddress, daoTable.address),
      ),
    )
    .leftJoin(
      votingStrategyTable,
      eq(votingStrategyTable.governanceModuleId, governanceModuleTable.address),
    )
    .leftJoin(votingTokenTable, eq(votingTokenTable.votingStrategyId, votingStrategyTable.address))
    .where(
      or(
        inArray(daoTable.erc20Address, Array.from(dbSearchTokenSet)),
        inArray(votingTokenTable.address, Array.from(dbSearchTokenSet)),
      ),
    );

  const tokenMap = new Map(
    filteredTokens.map(token => [token.address.toLowerCase() as Address, token]),
  );
  if (daos.length === 0) throw new ApiError('No associated DAO tokens found in wallet', 404);

  const daosWithTokens = await Promise.all(
    daos.map(async d => {
      let tokenInfo = tokenMap.get(d.tokenAddress);

      // If DAO token is not held by wallet (they only hold staked tokens), fetch it from Dune
      if (!tokenInfo) {
        const tokenQuery = await duneFetchToken(d.tokenAddress, {
          chainIds: d.chainId.toString(),
        });
        const tokenData = tokenQuery.tokens[0];
        if (!tokenData) {
          throw new Error(`No token data found for ${d.tokenAddress}`);
        }
        tokenInfo = {
          address: tokenQuery.contract_address,
          chain: tokenData.chain,
          chain_id: tokenData.chain_id,
          amount: '0',
          symbol: tokenData.symbol,
          name: tokenData.name,
          decimals: tokenData.decimals,
          price_usd: tokenData.price_usd,
          token_metadata: {
            logo: tokenData.logo,
          },
        };
      }
      const stakedTokenKey = stakedTokenMap.get(d.tokenAddress);
      const stakedTokenInfo = stakedTokenKey ? tokenMap.get(stakedTokenKey) : undefined;
      const stakedToken = stakedTokenInfo && {
        address: stakedTokenInfo.address,
        symbol: stakedTokenInfo.symbol,
        name: stakedTokenInfo.name,
        balance: stakedTokenInfo.amount,
        decimals: stakedTokenInfo.decimals,
        price_usd: stakedTokenInfo.price_usd,
        value_usd: stakedTokenInfo.value_usd,
        logo: stakedTokenInfo.token_metadata?.logo,
      };

      const ret = {
        name: d.name,
        chainId: d.chainId,
        address: d.address,
        token: {
          address: tokenInfo?.address,
          symbol: tokenInfo?.symbol,
          name: tokenInfo?.name,
          balance: tokenInfo?.amount || '0',
          decimals: tokenInfo?.decimals,
          price_usd: tokenInfo?.price_usd,
          value_usd: tokenInfo?.value_usd,
          logo: tokenInfo?.token_metadata?.logo,
        },
        stakedToken,
      };
      return ret;
    }),
  );

  return resf(c, daosWithTokens);
});

export default app;

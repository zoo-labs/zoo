import { Context, Next } from 'hono';
import { isAddress } from 'viem';
import { Dao } from 'sdk';
import { db } from '@/db';
import { DEFAULT_DAO_WITH } from '@/db/queries';
import { ApiError } from '@/api/utils/responseFormatter';
import { formatDao } from '@/api/utils/typeConverter';
import { DbDao } from '@/db/schema/onchain';
import { getChainId } from '@/api/utils/chains';

declare module 'hono' {
  interface ContextVariableMap {
    dao: Dao;
  }
}

export const daoCheck = async (c: Context, next: Next) => {
  const { chainId, address } = c.req.param();
  const chainIdNumber = getChainId(chainId);

  const addressLower = address?.toLowerCase();
  if (!addressLower || !isAddress(addressLower)) throw new ApiError('Invalid dao address', 400);

  const query = (await db.query.daoTable.findFirst({
    where: (dao, { eq, and }) => and(eq(dao.chainId, chainIdNumber), eq(dao.address, addressLower)),
    with: DEFAULT_DAO_WITH,
  })) as DbDao;

  if (!query) throw new ApiError('DAO not found', 404);

  c.set('dao', formatDao(query));
  await next();
};

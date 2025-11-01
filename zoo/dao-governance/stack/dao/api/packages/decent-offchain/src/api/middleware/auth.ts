import { Context, Next } from 'hono';
import { User } from 'sdk';
import { db } from '@/db';
import { ApiError } from '@/api/utils/responseFormatter';
import { getSessionId } from '@/api/utils/bearer';

declare module 'hono' {
  interface ContextVariableMap {
    user: User;
  }
}

export const bearerAuth = async (c: Context, next: Next) => {
  const sessionId = getSessionId(c);

  const session = await db.query.sessionTable.findFirst({
    where: (s, { eq }) => eq(s.id, sessionId),
  });

  if (!session) throw new ApiError('session not found', 401);
  if (!session.address) throw new ApiError('address not found in session', 401);

  c.set('user', {
    address: session.address,
    ensName: session.ensName,
  });

  await next();
};

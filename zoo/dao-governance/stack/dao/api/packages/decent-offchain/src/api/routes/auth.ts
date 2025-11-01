import { Hono } from 'hono';
import { generateSiweNonce, parseSiweMessage } from 'viem/siwe';
import { eq, and } from 'drizzle-orm';
import { User, Logout } from 'sdk';
import { bearerAuth } from '@/api/middleware/auth';
import { schema } from '@/db/schema';
import { db } from '@/db';
import resf, { ApiError } from '@/api/utils/responseFormatter';
import { publicClient } from '@/api/utils/publicClient';
import { getSessionId } from '@/api/utils/bearer';

const app = new Hono();

/**
 * @title Get a nonce for SIWE authentication
 * @route GET /auth/nonce
 * @returns {Nonce} Nonce object
 */
app.get('/nonce', async c => {
  const nonce = generateSiweNonce();

  const [session] = await db
    .insert(schema.sessionTable)
    .values({
      nonce,
    })
    .returning();

  if (!session) throw new ApiError('session not created', 401);

  const data = { nonce, sessionId: session.id };

  return resf(c, data);
});

/**
 * @title Verify a SIWE message and signature
 * @route POST /auth/verify
 * @body { message: string, signature: string }
 * @returns {User} User object
 */
app.post('/verify', async c => {
  const sessionId = getSessionId(c);

  const { message, signature } = await c.req.json();
  const { address, nonce } = parseSiweMessage(message);
  if (!nonce) throw new ApiError('invalid nonce', 401);
  if (!address) throw new ApiError('no address found in message', 401);

  const [session] = await db
    .select()
    .from(schema.sessionTable)
    .where(and(eq(schema.sessionTable.id, sessionId), eq(schema.sessionTable.nonce, nonce)));
  if (!session) throw new ApiError('session not found', 401);

  const success = await publicClient.verifySiweMessage({
    message,
    signature,
    nonce,
    address,
  });

  if (!success) throw new ApiError('invalid signature', 401);

  const ensName = await publicClient.getEnsName({ address });

  await db
    .update(schema.sessionTable)
    .set({
      address,
      ensName,
      signature,
    })
    .where(eq(schema.sessionTable.id, sessionId));

  const data: User = {
    address,
    ensName,
  };

  return resf(c, data);
});

/**
 * @title Get the current authenticated user's information
 * @route GET /auth/me
 * @returns {User} Me object
 */
app.get('/me', bearerAuth, async c => {
  const user = c.get('user');
  return resf(c, user);
});

/**
 * @title Log out the current user
 * @route POST /auth/logout
 * @returns {Logout} string 'ok'
 */
app.post('/logout', async c => {
  const sessionId = getSessionId(c);

  await db.delete(schema.sessionTable).where(eq(schema.sessionTable.id, sessionId));

  const data: Logout = 'ok';
  return resf(c, data);
});

export default app;

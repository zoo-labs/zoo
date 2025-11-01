import type { Context } from 'hono';
import { ApiError } from './responseFormatter';

export const getSessionId = (c: Context) => {
  const authHeader = c.req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new ApiError('no bearer token found', 401);
  }
  const sessionId = authHeader.substring(7);
  if (!sessionId || sessionId.length !== 21) throw new ApiError('invalid bearer token', 401);
  return sessionId;
};

import { describe, expect, it } from 'bun:test';
import { ApiResponse, Logout } from 'sdk';
import app from '@/api/index';
import { authHeader } from 'test/client';

describe('Logout', () => {
  it('should logout a user', async () => {
    const res = await app.request('/auth/logout', {
      method: 'POST',
      headers: authHeader(1),
    });
    const json = (await res.json()) as ApiResponse<Logout>;
    expect(res.status).toBe(200);
    expect(json.data).toBe('ok');
  });
});

import { describe, it, expect } from 'bun:test';
import app from '@/api/index';
import { ApiResponse, Meta, Health } from 'sdk';

describe('Hono API Routes', () => {
  it('GET / should return service info', async () => {
    const res = await app.request('/');
    expect(res.status).toBe(200);

    const { success, data } = (await res.json()) as ApiResponse<Meta>;
    expect(success).toBe(true);
    expect(data?.version).toBe('local');
  });

  it('GET /health should return ok', async () => {
    const res = await app.request('/health');
    expect(res.status).toBe(200);
    const { success, data } = (await res.json()) as ApiResponse<Health>;
    expect(success).toBe(true);
    expect(data).toBe('ok');
  });
});

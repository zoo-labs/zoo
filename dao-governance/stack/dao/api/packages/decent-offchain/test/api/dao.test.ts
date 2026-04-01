import { Address } from 'viem';
import { describe, it, expect } from 'bun:test';
import app from '@/api/index';
import { ApiResponse, Dao } from 'sdk';

describe('DAO API', () => {
  let daoAddress: Address | undefined;
  let daoChainId: number | undefined;

  it('GET all DAOs', async () => {
    const res = await app.request('/d');
    expect(res.status).toBe(200);
    const { data } = (await res.json()) as ApiResponse<Dao[]>;
    expect(data).toBeDefined();
    expect(data?.length).toBeGreaterThan(0);
    daoAddress = data?.[0]?.address;
    daoChainId = data?.[0]?.chainId;
  });

  it('GET DAOs by chainId', async () => {
    const res = await app.request(`/d/${daoChainId}`);
    expect(res.status).toBe(200);
    const { data } = (await res.json()) as ApiResponse<Dao[]>;
    expect(data).toBeDefined();
    expect(data?.length).toBeGreaterThan(0);
  });

  it('GET DAO by chainId and address', async () => {
    const res = await app.request(`/d/${daoChainId}/${daoAddress}`);
    expect(res.status).toBe(200);
    const { data } = (await res.json()) as ApiResponse<Dao>;
    expect(data).toBeDefined();
  });
});

import { describe, it, expect } from 'bun:test';
import { apiInfo, apiHealth, apiChains } from '../../src/core/fetch/meta';
import { apiUrl } from '../constants';

describe('Meta Routes', () => {
  it('should get api info', async () => {
    const meta = await apiInfo({
      apiUrl,
    });
    expect(meta).toBeDefined();
  });

  it('should get health', async () => {
    const health = await apiHealth({
      apiUrl,
    });
    expect(health).toBeDefined();
  });

  it('should get chains', async () => {
    const chains = await apiChains({
      apiUrl,
    });
    expect(chains).toEqual([1, 10, 137, 8453]);
  });
});


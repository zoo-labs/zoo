import { describe, it, expect } from 'bun:test';
import { getAllDaos, getDao } from '../../src/core/fetch/dao';
import { chainId, daoAddress, apiUrl } from '../constants';

describe('DAO Routes', () => {
  it('should get all daos', async () => {
    const daos = await getAllDaos({
      apiUrl,
    });
    expect(daos).toBeDefined();
    expect(daos.length).toBeGreaterThan(0);
  });

  it('should get single test dao', async () => {
    const dao = await getDao({
      chainId: chainId,
      address: daoAddress,
      apiUrl,
    });
    expect(dao).toBeDefined();
    expect(dao.address).toBe(daoAddress);
  });
});


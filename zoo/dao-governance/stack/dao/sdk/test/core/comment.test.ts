import { describe, it, expect } from 'bun:test';
import { getAllComments } from '../../src/core/fetch/comment';
import { chainId, daoAddress, apiUrl } from '../constants';

describe('Comment', () => {
  it('should get all comments', async () => {
    const comments = await getAllComments({
      chainId,
      address: daoAddress,
      slug: '2kexrO95CnUSOgKdGj_k1',
      apiUrl,
    });
    expect(comments).toBeDefined();
  });
});

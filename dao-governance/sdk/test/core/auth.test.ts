import { describe, it, expect } from 'bun:test';
import { getNonce } from '../../src/core/fetch/auth';
import { apiUrl } from '../constants';

describe('Auth', () => {
  it('should get nonce', async () => {
    const nonce = await getNonce({ apiUrl });
    console.log(nonce);
    expect(nonce).toBeDefined();
  });
});

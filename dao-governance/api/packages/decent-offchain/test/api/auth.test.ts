import { describe, it, expect } from 'bun:test';
import app from '@/api/index';
import { ApiResponse, Nonce, User } from 'sdk';
import { authHeader, setSessionId, signedSiweMessage, WALLETS } from 'test/client';

describe('Auth API', () => {
  let nonce: string;

  it('should return a nonce and sessionId', async () => {
    const res = await app.request('/auth/nonce');
    expect(res.status).toBe(200);
    const { data } = (await res.json()) as ApiResponse<Nonce>;
    if (!data) throw new Error('No data returned');
    expect(data?.nonce).toBeDefined();
    expect(data?.sessionId).toBeDefined();
    setSessionId(1, data.sessionId);
    nonce = data?.nonce || '';
  });

  it('verify siwe message', async () => {
    const signedMessage = await signedSiweMessage(nonce, 1);
    const res = await app.request('/auth/verify', {
      method: 'POST',
      headers: authHeader(1),
      body: JSON.stringify({
        message: signedMessage.message,
        signature: signedMessage.signature,
      }),
    });
    const json = (await res.json()) as ApiResponse<User>;
    expect(json.error).toBeFalsy();
    expect(json.success).toBeTrue();
    expect(json.data?.address).toBe(WALLETS[1].address);
    expect(json.data?.ensName).toBeDefined();
  });

  it('send a bad bearer token', async () => {
    const res = await app.request('/auth/me', {
      headers: {
        Authorization: 'Bearer ' + 'bad-token',
      },
    });
    const json = (await res.json()) as ApiResponse<User>;
    expect(json.error).toBeTruthy();
    expect(json.success).toBeFalse();
  });

  it('should return a user', async () => {
    const res = await app.request('/auth/me', {
      headers: authHeader(1),
    });
    expect(res.status).toBe(200);
    const { data } = (await res.json()) as ApiResponse<User>;
    expect(data?.address).toBe(WALLETS[1].address);
    expect(data?.ensName).toBeDefined();
  });

  it('auth 2nd wallet', async () => {
    const res = await app.request('/auth/nonce');
    expect(res.status).toBe(200);
    const { data } = (await res.json()) as ApiResponse<{ nonce: string; sessionId: string }>;
    if (!data) throw new Error('No data returned');
    expect(data?.nonce).toBeDefined();
    expect(data?.sessionId).toBeDefined();
    setSessionId(2, data.sessionId);
    nonce = data?.nonce || '';
    const signedMessage = await signedSiweMessage(nonce, 2);
    const verifyRes = await app.request('/auth/verify', {
      method: 'POST',
      headers: authHeader(2),
      body: JSON.stringify({
        message: signedMessage.message,
        signature: signedMessage.signature,
      }),
    });
    const json = (await verifyRes.json()) as ApiResponse<User>;
    expect(json.error).toBeFalsy();
    expect(json.success).toBeTrue();
    expect(json.data?.address).toBe(WALLETS[2].address);
    expect(json.data?.ensName).toBeDefined();
  });

  it('auth 3rd wallet', async () => {
    const res = await app.request('/auth/nonce');
    expect(res.status).toBe(200);
    const { data } = (await res.json()) as ApiResponse<{ nonce: string; sessionId: string }>;
    if (!data) throw new Error('No data returned');
    expect(data?.nonce).toBeDefined();
    expect(data?.sessionId).toBeDefined();
    setSessionId(3, data.sessionId);
    nonce = data?.nonce || '';
    const signedMessage = await signedSiweMessage(nonce, 3);
    const verifyRes = await app.request('/auth/verify', {
      method: 'POST',
      headers: authHeader(3),
      body: JSON.stringify({
        message: signedMessage.message,
        signature: signedMessage.signature,
      }),
    });
    const json = (await verifyRes.json()) as ApiResponse<User>;
    expect(json.error).toBeFalsy();
    expect(json.success).toBeTrue();
    expect(json.data?.address).toBe(WALLETS[3].address);
    expect(json.data?.ensName).toBeDefined();
  });
});

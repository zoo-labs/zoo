import { describe, it, expect } from 'bun:test';
import { Proposal, ApiResponse } from 'sdk';
import app from '@/api/index';
import { authHeader, clientStore, setClientStore } from 'test/client';
import { daoChainId, daoAddress, newProposal } from 'test/constants';

describe('Proposals API', () => {
  it('POST proposal without a cookie', async () => {
    const res = await app.request(`/d/${daoChainId}/${daoAddress}/proposals`, {
      method: 'POST',
      body: JSON.stringify(newProposal),
    });
    expect(res.status).toBe(401);
  });

  it('POST proposal with a valid cookie', async () => {
    const res = await app.request(`/d/${daoChainId}/${daoAddress}/proposals`, {
      method: 'POST',
      headers: authHeader(1),
      body: JSON.stringify(newProposal),
    });
    const json = (await res.json()) as ApiResponse<Proposal>;
    if (!json.data?.slug) throw new Error('issue creating proposal');

    setClientStore('proposalSlug', json.data.slug);
    expect(res.status).toBe(200);
  });

  it('PUT proposal with a valid cookie', async () => {
    newProposal.title = 'Updated Proposal';
    const res = await app.request(
      `/d/${daoChainId}/${daoAddress}/proposals/${clientStore.proposalSlug}`,
      {
        method: 'PUT',
        headers: authHeader(1),
        body: JSON.stringify(newProposal),
      },
    );
    const json = (await res.json()) as ApiResponse<Proposal>;
    expect(res.status).toBe(200);
    expect(json.data?.title).toBe(newProposal.title);
  });

  it('PUT proposal from another wallet with proposer permissions', async () => {
    const res = await app.request(
      `/d/${daoChainId}/${daoAddress}/proposals/${clientStore.proposalSlug}`,
      {
        method: 'PUT',
        headers: authHeader(2),
        body: JSON.stringify(newProposal),
      },
    );
    const json = (await res.json()) as ApiResponse<Proposal>;
    expect(json.error).toBeDefined();
    expect(json?.error?.message).toBe('Proposal not found or you are not the author');
    expect(res.status).toBe(403);
  });

  it('PUT proposal from another wallet without proposer permissions', async () => {
    const res = await app.request(
      `/d/${daoChainId}/${daoAddress}/proposals/${clientStore.proposalSlug}`,
      {
        method: 'PUT',
        headers: authHeader(3),
        body: JSON.stringify(newProposal),
      },
    );
    const json = (await res.json()) as ApiResponse<Proposal>;
    expect(json.error).toBeDefined();
    expect(json?.error?.message).toBe('User does not have proposer permissions');
    expect(res.status).toBe(403);
  });
});

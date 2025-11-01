import { describe, it, expect } from 'bun:test';
import { ApiResponse, Comment } from 'sdk';
import app from '@/api/index';
import { authHeader, clientStore } from 'test/client';
import { daoChainId, daoAddress, newComment } from 'test/constants';

describe('Comments API', () => {
  it('POST comment without a cookie', async () => {
    const res = await app.request(
      `/d/${daoChainId}/${daoAddress}/proposals/${clientStore.proposalSlug}/comments`,
      {
        method: 'POST',
        body: JSON.stringify(newComment),
      },
    );

    expect(res.status).toBe(401);
  });

  it('POST comment with wallet 2', async () => {
    const res = await app.request(
      `/d/${daoChainId}/${daoAddress}/proposals/${clientStore.proposalSlug}/comments`,
      {
        method: 'POST',
        headers: authHeader(2),
        body: JSON.stringify(newComment),
      },
    );

    expect(res.status).toBe(200);
    const json = (await res.json()) as ApiResponse<Comment>;
    if (!json.data?.id) throw new Error('issue creating comment');

    clientStore.commentId = json.data.id;
  });

  it('PUT wallet 2 comment with wallet 3', async () => {
    const res = await app.request(
      `/d/${daoChainId}/${daoAddress}/proposals/${clientStore.proposalSlug}/comments/${clientStore.commentId}`,
      {
        method: 'PUT',
        headers: authHeader(1),
        body: JSON.stringify({ content: 'updated comment' }),
      },
    );

    expect(res.status).toBe(403);
  });

  it('PUT wallet 2 comment with wallet 2', async () => {
    const res = await app.request(
      `/d/${daoChainId}/${daoAddress}/proposals/${clientStore.proposalSlug}/comments/${clientStore.commentId}`,
      {
        method: 'PUT',
        headers: authHeader(2),
        body: JSON.stringify({ content: 'updated comment' }),
      },
    );

    expect(res.status).toBe(200);
    const json = (await res.json()) as ApiResponse<Comment>;
    if (!json.data?.id) throw new Error('issue updating comment');

    expect(json.data.content).toBe('updated comment');
    expect(json.data.updatedAt).toBeDefined();
  });

  it('POST comment with wallet 1', async () => {
    const res = await app.request(
      `/d/${daoChainId}/${daoAddress}/proposals/${clientStore.proposalSlug}/comments`,
      {
        method: 'POST',
        headers: authHeader(1),
        body: JSON.stringify(newComment),
      },
    );

    expect(res.status).toBe(200);
    const json = (await res.json()) as ApiResponse<Comment>;
    if (!json.data?.id) throw new Error('issue creating comment');

    clientStore.commentId = json.data.id;
  });

  it('DELETE wallet 1 comment with wallet 1', async () => {
    const res = await app.request(
      `/d/${daoChainId}/${daoAddress}/proposals/${clientStore.proposalSlug}/comments/${clientStore.commentId}`,
      {
        method: 'DELETE',
        headers: authHeader(1),
      },
    );

    expect(res.status).toBe(200);
  });
});

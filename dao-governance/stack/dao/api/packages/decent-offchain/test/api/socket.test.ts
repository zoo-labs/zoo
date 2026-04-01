import WebSocket from 'ws';
import { describe, it, expect, afterAll } from 'bun:test';
import app from '@/api/index';
import { daoChainId, daoAddress, newProposal, newComment } from 'test/constants';
import { Topics } from '@/api/ws/topics';
import {
  ConnectionResponseType,
  SubscriptionRequestType,
  SubscriptionResponseType,
  WsMessage,
} from '@/api/ws/connections';
import { clientStore, authHeader, setClientStore } from 'test/client';
import { ApiResponse, Comment, Proposal } from 'sdk';

const port = 2000;
const server = Bun.serve({
  port,
  fetch: app.fetch,
  websocket: app.websocket,
});

let _ws: WebSocket | null = null;

describe('WebSocket Integration', () => {
  const url = `ws://localhost:${port}/ws`;

  const message = 'message';

  const connected = async (ws: WebSocket) => {
    const connectedResponse = JSON.parse(
      await new Promise(resolve => {
        ws.addEventListener(message, ({ data }) => resolve(data.toString('utf8')), {
          once: true,
        });
      }),
    ) as WsMessage;
    expect(connectedResponse.msg).toBe(ConnectionResponseType.Connected);
  };

  const subscribeToTopic = async (ws: WebSocket, topic: string, firstTime: boolean) => {
    const subscribeMessage = JSON.stringify({
      msg: SubscriptionRequestType.Subscribe,
      topic: topic,
    });

    // First subscribe to a topic
    const subscribedResponse = JSON.parse(
      await new Promise(resolve => {
        ws.addEventListener(message, ({ data }) => resolve(data.toString('utf8')), {
          once: true,
        });

        // Send a client message to the server
        ws.send(subscribeMessage);
      }),
    ) as WsMessage;

    // console.log(subscribedResponse);

    // Perform assertions on the response message that the client receives
    expect(subscribedResponse.msg).toBe(SubscriptionResponseType.Subscribed);
    expect(subscribedResponse.topic).toBe(topic);
    expect(subscribedResponse.data).toBeDefined();
    if (firstTime) {
      expect(subscribedResponse.warning).toBeUndefined();
    } else {
      expect(subscribedResponse.warning).toBe('Previously subscribed');
    }
  };

  const unsubscribeFromTopic = async (ws: WebSocket, topic: string, firstTime: boolean) => {
    const unsubscribeMessage = JSON.stringify({
      msg: SubscriptionRequestType.Unsubscribe,
      topic: topic,
    });

    const unsubscribedResponse = JSON.parse(
      await new Promise(resolve => {
        ws.addEventListener(message, ({ data }) => resolve(data.toString('utf8')), {
          once: true,
        });

        // Send a client message to the server
        ws.send(unsubscribeMessage);
      }),
    ) as WsMessage;

    // console.log(unsubscribedResponse);

    // Perform assertions on the response message that the client receives
    expect(unsubscribedResponse.msg).toBe(SubscriptionResponseType.Unsubscribed);
    expect(unsubscribedResponse.topic).toBe(topic);
    if (firstTime) {
      expect(unsubscribedResponse.warning).toBeUndefined();
    } else {
      expect(unsubscribedResponse.warning).toBe('Previously unsubscribed');
    }
  };

  it('Connect to Websocket', async () => {
    const ws = new WebSocket(url);
    await connected(ws);

    it('Subscribe and Unsubscribe', async () => {
      const topic = Topics.dao(daoChainId, daoAddress);

      await subscribeToTopic(ws, topic, true);
      await subscribeToTopic(ws, topic, false);
      await unsubscribeFromTopic(ws, topic, true);
      await unsubscribeFromTopic(ws, topic, false);
    });

    it('Publish and Subscribe for Proposals', async () => {
      const topic = Topics.proposals(daoChainId, daoAddress);

      await subscribeToTopic(ws, topic, true);

      // Create a new proposal
      {
        const res = await app.request(`/d/${daoChainId}/${daoAddress}/proposals`, {
          method: 'POST',
          headers: authHeader(1),
          body: JSON.stringify(newProposal),
        });
        const json = (await res.json()) as ApiResponse<Proposal>;
        console.log(json);
        if (!json.data?.slug) throw new Error('issue creating proposal');
        setClientStore('proposalSlug', json.data.slug);
        expect(res.status).toBe(200);

        const responseProposal = json.data;

        const updateResponse = JSON.parse(
          await new Promise(resolve => {
            ws.addEventListener(message, ({ data }) => resolve(data.toString('utf8')), {
              once: true,
            });
          }),
        ) as WsMessage;

        console.log(updateResponse);

        expect(updateResponse.msg).toBe(SubscriptionResponseType.Updated);
        expect(updateResponse.topic).toBe(topic);
        expect(updateResponse.warning).toBeUndefined();

        const updatedProposal = updateResponse.data as Proposal;
        expect(updatedProposal).toBeDefined();
        expect(responseProposal).toBeDefined();
        expect(updatedProposal.title).toBe(responseProposal!.title!);
      }
      // Update an existing proposal
      {
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

        const responseProposal = json.data;

        const updateResponse = JSON.parse(
          await new Promise(resolve => {
            ws.addEventListener(message, ({ data }) => resolve(data.toString('utf8')), {
              once: true,
            });
          }),
        ) as WsMessage;

        console.log(updateResponse);

        expect(updateResponse.msg).toBe(SubscriptionResponseType.Updated);
        expect(updateResponse.topic).toBe(topic);
        expect(updateResponse.warning).toBeUndefined();

        const updatedProposal = updateResponse.data as Proposal;
        expect(updatedProposal).toBeDefined();
        expect(responseProposal).toBeDefined();
        expect(updatedProposal.title).toBe(responseProposal!.title!);
      }

      await unsubscribeFromTopic(ws, topic, true);
    });

    it('Publish and Subscribe for Comments', async () => {
      const slug = clientStore.proposalSlug;
      const topic = Topics.comments(daoChainId, daoAddress, slug);

      await subscribeToTopic(ws, topic, true);

      // Create a new proposal
      {
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

        const responseComment = json.data;

        const updateResponse = JSON.parse(
          await new Promise(resolve => {
            ws.addEventListener(message, ({ data }) => resolve(data.toString('utf8')), {
              once: true,
            });
          }),
        ) as WsMessage;

        console.log(updateResponse);

        expect(updateResponse.msg).toBe(SubscriptionResponseType.Updated);
        expect(updateResponse.topic).toBe(topic);
        expect(updateResponse.warning).toBeUndefined();

        const updatedComment = updateResponse.data as Comment;
        expect(updatedComment).toBeDefined();
        expect(responseComment).toBeDefined();
        expect(updatedComment.id).toBe(responseComment!.id!);
      }
      // Update an existing comment
      {
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

        const responseComment = json.data;

        const updateResponse = JSON.parse(
          await new Promise(resolve => {
            ws.addEventListener(message, ({ data }) => resolve(data.toString('utf8')), {
              once: true,
            });
          }),
        ) as WsMessage;

        console.log(updateResponse);

        expect(updateResponse.msg).toBe(SubscriptionResponseType.Updated);
        expect(updateResponse.topic).toBe(topic);
        expect(updateResponse.warning).toBeUndefined();

        const updatedComment = updateResponse.data as Comment;
        expect(updatedComment).toBeDefined();
        expect(responseComment).toBeDefined();
        expect(updatedComment.id).toBe(responseComment!.id!);
      }

      // Delete an existing comment
      {
        const res = await app.request(
          `/d/${daoChainId}/${daoAddress}/proposals/${clientStore.proposalSlug}/comments/${clientStore.commentId}`,
          {
            method: 'DELETE',
            headers: authHeader(2),
          },
        );
        expect(res.status).toBe(200);

        const deleteResponse = JSON.parse(
          await new Promise(resolve => {
            ws.addEventListener(message, ({ data }) => resolve(data.toString('utf8')), {
              once: true,
            });
          }),
        ) as WsMessage;

        console.log(deleteResponse);

        expect(deleteResponse.msg).toBe(SubscriptionResponseType.Deleted);
        expect(deleteResponse.topic).toBe(topic);
        expect(deleteResponse.warning).toBeUndefined();

        const updatedComment = deleteResponse.data as { id?: string };
        expect(updatedComment).toBeDefined();
        expect(updatedComment.id).toBe(clientStore.commentId);
      }

      await unsubscribeFromTopic(ws, topic, true);
    });
  });
});

afterAll(() => {
  if (_ws) {
    _ws.close();
    _ws = null;
  }
  server.stop();
});

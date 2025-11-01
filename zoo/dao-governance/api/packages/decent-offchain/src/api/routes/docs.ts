import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';

const app = new Hono();

app.get(
  '/',
  serveStatic({
    path: './src/api/static/docs.html',
  }),
);

app.get(
  '/openapi.json',
  serveStatic({
    path: './src/api/static/openapi.json',
  }),
);

export default app;

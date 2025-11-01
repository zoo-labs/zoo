import { Hono } from 'hono';
import { cors } from 'hono/cors';
import resf from '@/api/utils/responseFormatter';

// Route imports
import meta from '@/api/routes/meta';
import docs from '@/api/routes/docs';
import auth from '@/api/routes/auth';
import dao from '@/api/routes/dao';
import proposals from '@/api/routes/dao.proposals';
import points from '@/api/routes/points';
import wallet from '@/api/routes/wallet';

const app = new Hono();

const port = process.env.PORT || 3005;

app.use(
  '*',
  cors({
    origin: origin => {
      const allowedOrigins = [
        'http://localhost:3000',
        'http://localhost:5173',
        'https://app.luxdao.org',
        'https://galxe.com',
        'https://app.galxe.com',
        'https://dashboard.galxe.com',
      ];
      if (allowedOrigins.includes(origin)) {
        return origin;
      }
      if (origin.endsWith('.interface.pages.dev')) {
        return origin;
      }
      return null;
    },
    credentials: true,
  }),
);

app.onError((err, c) => {
  return resf(c, err, 500);
});

// Routes
app.route('/', meta);
app.route('/docs', docs);
app.route('/auth', auth);
app.route('/points', points);
app.route('/wallet', wallet);
app.route('/d', dao);
app.route('/d/:chainId/:address/proposals', proposals);

export default {
  ...app,
  port,
};

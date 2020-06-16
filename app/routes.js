import Router from 'koa-router';
import koaSend from 'koa-send';
import path from 'path';

import auth from './middlewares/auth';

import authCallback from './controllers/public-api/callback';
import authLogin from './controllers/public-api/login';

import apiAdminItems from './controllers/adm-api/items';

const Route = () => {
  const router = new Router();

  const authAPI = new Router();
  authAPI.post('/items', apiAdminItems);

  router.use('/auth-api', auth, authAPI.routes(), authAPI.allowedMethods());

  const API = new Router();
  API.post('/login', authLogin);
  API.post('/login-callback', authCallback);

  router.use('/public-api', API.routes(), API.allowedMethods());

  router.get('/assets/(.*)', async ctx =>
    koaSend(ctx, ctx.path.slice(8), {
      root: path.resolve(__dirname, `../dist`),
      immutable: true
    })
  );

  router.get('/(.*)', async ctx =>
    koaSend(ctx, 'index.html', {
      root: path.resolve(__dirname, `../dist`),
      immutable: true
    })
  );

  return router;
};

export default Route;

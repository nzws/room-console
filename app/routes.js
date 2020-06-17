import Router from 'koa-router';
import koaSend from 'koa-send';
import path from 'path';

import auth from './middlewares/auth';

import authCallback from './controllers/public-api/callback';
import authLogin from './controllers/public-api/login';

import apiDevices from './controllers/auth-api/devices';
import apiSend from './controllers/auth-api/send';
import apiAddDevice from './controllers/auth-api/add-device';
import apiWeather from './controllers/auth-api/weather';
import apiLogs from './controllers/auth-api/logs';
import apiWebHook from './controllers/public-api/webhook';

const Route = () => {
  const router = new Router();

  const authAPI = new Router();
  authAPI.post('/weather', apiWeather);
  authAPI.post('/add-device', apiAddDevice);
  authAPI.post('/devices', apiDevices);
  authAPI.post('/send', apiSend);
  authAPI.post('/logs', apiLogs);

  router.use('/auth-api', auth, authAPI.routes(), authAPI.allowedMethods());

  const API = new Router();
  API.post('/login', authLogin);
  API.post('/login-callback', authCallback);
  API.post('/webhook/:token', apiWebHook);

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

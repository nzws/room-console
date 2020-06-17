import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { logInfo } from './utils/logger';
import logger from './middlewares/logger';
import headers from './middlewares/headers';
import route from './routes';
import db from './db';
import worker from './worker';
import discord from './discord';

(async () => {
  if (process.env.NODE_ENV !== 'development') {
    const tables = Object.keys(db.tables).map(key =>
      db.tables[key].sync({ force: false, alter: true })
    );
    await Promise.all(tables);
    logInfo('Database sync completed ✔');
  }

  const app = new Koa();
  app.use(logger);
  app.use(headers);

  app.use(bodyParser());

  const router = route(app);
  app.use(router.routes());
  app.use(router.allowedMethods());

  app.listen(process.env.PORT || 5801);

  setInterval(worker, 1000 * 60 * 5); // 5分
  discord();

  logInfo('Server started >w<');
})();

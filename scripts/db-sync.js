import db from '../app/db';
import { logInfo } from '../app/utils/logger';

const run = async () => {
  const tables = Object.keys(db.tables).map(key =>
    db.tables[key].sync({ force: false, alter: true })
  );
  await Promise.all(tables);
  logInfo('Database sync completed ✔');
};

run();

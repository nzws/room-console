import Sequelize from 'sequelize';

import Auth from './auth';
import Device from './device';
import Hook from './hook';
import Log from './log';
import Mailwaiting from './mailwaiting';

const isDevelopment = process.env.NODE_ENV === 'development';
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_SERVER,
    port: process.env.DB_PORT,
    dialect: 'mariadb',
    benchmark: isDevelopment,
    logging: isDevelopment ? console.log : false,
    dialectOptions: {
      timezone: 'Asia/Tokyo'
    }
  }
);

const db = {
  tables: {
    Auth,
    Device,
    Hook,
    Log,
    Mailwaiting
  },
  Op: Sequelize.Op,
  sequelize
};

Object.keys(db.tables).forEach(key => {
  db.tables[key] = db.tables[key](sequelize);
});

export default db;

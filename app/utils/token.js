import crypto from 'crypto';
import { logError } from './logger';
import db from '../db';

export const authToken = async (tokenId = '') => {
  if (!tokenId) {
    return false;
  }

  const token = await db.tables.Auth.findOne({
    where: {
      token: tokenId
    }
  });

  return token || false;
};

export const createToken = async (email = '', IP = '') => {
  try {
    if (process.env.ACCOUNT_MAIL !== email) {
      throw new Error("you don't have a permission");
    }
    const token = crypto.randomBytes(32).toString('hex');

    await db.tables.Auth.create({
      token,
      IP
    });

    return token;
  } catch (e) {
    logError(e);
    throw e;
  }
};

/*
export const revokeToken = async (token = '') => {
  try {
    const auth = await db.tables.Auth.findOne({ where: { token } });
    await auth.update({ token: null });
  } catch (e) {
    logError(e);
    throw e;
  }

  return true;
};
*/

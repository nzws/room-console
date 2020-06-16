import { randomBytes } from 'crypto';
import db from '../../db';
import { errorController } from '../common';
import getIP from '../../utils/ip';
import Mailer from '../../utils/mailer';

const authLogin = async ctx => {
  const { request } = ctx;
  const { mail } = request.body;
  const email = mail?.toLowerCase();
  const IP = getIP(ctx);

  if (!email) {
    return errorController(ctx, 400, '値が不足しています');
  }
  if (email !== process.env.ACCOUNT_MAIL) {
    ctx.body = { status: 'success' };
    return;
  }

  const token = randomBytes(32).toString('hex');

  // メール送信
  await Mailer(email, 'login', {
    id: token,
    IP,
    UA: ctx.header['user-agent'] || ''
  });

  await db.tables.Mailwaiting.create({
    token,
    email,
    IP,
    type: 'login'
  });

  ctx.body = { status: 'success' };
};

export default authLogin;

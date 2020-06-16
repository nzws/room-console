import db from '../../db';
import { errorController } from '../common';
import { createToken } from '../../utils/token';
import getIP from '../../utils/ip';

const authCallback = async ctx => {
  const { request } = ctx;
  const { id } = request.body;
  if (!id) {
    return errorController(ctx, 400, '値が不足しています');
  }

  const data = await db.tables.Mailwaiting.findOne({
    where: {
      token: id,
      isApproved: false,
      type: 'login',
      createdAt: {
        [db.Op.gt]: new Date(new Date() - 10 * 60 * 1000) // 10分
      }
    }
  });
  if (!data) {
    return errorController(
      ctx,
      404,
      'このIDは存在しないか使用済みか期限切れです'
    );
  }
  data.update({
    isApproved: true
  });

  const token = await createToken(data.email, getIP(ctx));

  ctx.body = { status: 'success', token };
};

export default authCallback;

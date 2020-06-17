import db from '../../db';

const apiLogs = async ctx => {
  const { id } = ctx.request.body;

  const result = await db.tables.Log.findAll({
    where: {
      deviceId: id
    },
    order: [['createdAt', 'DESC']],
    limit: 30
  });

  ctx.body = { result };
};

export default apiLogs;

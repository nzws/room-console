import db from '../../db';

const apiHooks = async ctx => {
  const { id } = ctx.request.body;

  const where = {};
  if (id) {
    where.id = id;
  }

  const result = await db.tables.Hook.findAll({ where });

  ctx.body = { result };
};

export default apiHooks;

import db from '../../db';

const apiAdminItems = async ctx => {
  const { id } = ctx.request.body;

  const where = {};
  if (id) {
    where.id = id;
  }

  const result = await db.tables.Item.findAll({
    where,
    order: [['createdAt', 'DESC']]
  });

  ctx.body = { result };
};

export default apiAdminItems;

import db from '../../db';

const apiDevices = async ctx => {
  const { id } = ctx.request.body;

  const where = {};
  if (id) {
    where.id = id;
  }

  const result = await db.tables.Device.findAll({ where });

  ctx.body = { result };
};

export default apiDevices;

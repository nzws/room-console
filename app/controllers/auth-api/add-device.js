import db from '../../db';
import services from '../../services';
import { errorController } from '../common';

const apiAddDevice = async ctx => {
  const { type, id, name } = ctx.request.body;

  if (!id) {
    const client = new services[type]();
    await client.login();

    ctx.body = {
      result: await client.getList()
    };
    return;
  }

  const exist = await db.tables.Device.findOne({
    where: {
      type,
      deviceId: id
    }
  });
  if (exist) {
    return errorController(ctx, 400, 'already exist');
  }

  const data = await db.tables.Device.create({
    name,
    type,
    deviceId: id,
    isRunning: true,
    data: {}
  });

  const client = new services[type](data.dataValues);
  if (client.needUpdateData || client.needUpdateRunning) {
    await client.login();
    let updatedData = {};
    if (client.needUpdateData) {
      updatedData.data = await client.getData();
    }
    if (client.needUpdateRunning) {
      updatedData.isRunning = await client.getIsRunning();
    }
    await data.update(updatedData);
  }

  ctx.body = { status: 'success' };
};

export default apiAddDevice;

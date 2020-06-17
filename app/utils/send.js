import db from '../db';
import services from '../services';

const send = async (id, type, data = {}) => {
  const device = await db.tables.Device.findOne({
    where: {
      id
    }
  });
  if (!device) {
    throw new Error('not found device');
  }

  const client = new services[device.type](device);
  await client.login();

  if (type === 'toggle') {
    type = device.isRunning ? 'off' : 'on';
  }

  let updatedData = {
    isRunning: device.isRunning
  };
  if (type === 'on') {
    await client.powerOn();
    updatedData = {
      isRunning: true
    };
  } else if (type === 'off') {
    await client.powerOff();
    updatedData = {
      isRunning: false
    };
  } else {
    const result = await client.sendCustomSignal(type, data);
    await db.tables.Log.create({
      deviceId: device.id,
      createdBy: 'me',
      type: 'action',
      data: {
        ...data,
        type
      }
    });

    if (result) {
      updatedData = {
        ...updatedData,
        ...result
      };
    }
  }

  if (device.isRunning !== updatedData.isRunning) {
    await db.tables.Log.create({
      deviceId: device.id,
      createdBy: 'me',
      type: updatedData.isRunning ? 'on' : 'off'
    });
  }

  const newData = await client.getData();
  updatedData.data = {
    ...(device.data || {}),
    ...newData,
    ...(updatedData.data || {})
  };

  if (updatedData) {
    await device.update(updatedData);
  }
};

export default send;

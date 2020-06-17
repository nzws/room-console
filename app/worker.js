import { diff } from 'deep-object-diff';
import { logInfo, logError } from './utils/logger';
import db from './db';
import services from './services';

const worker = async () => {
  logInfo('worker started: ' + new Date());

  const devices = await db.tables.Device.findAll();

  for (const device of devices) {
    try {
      const client = new services[device.type](device);
      if (!client.needUpdateData && !client.needUpdateRunning) {
        // ワーカーは必要ない
        break;
      }
      await client.login();
      let updatedData = {};
      if (client.needUpdateData) {
        updatedData.data = await client.getData();
        const Diff = diff(device.data, updatedData.data);
        if (Object.keys(Diff)[0]) {
          await db.tables.Log.create({
            deviceId: device.id,
            createdBy: 'anonymous',
            type: 'update_data',
            data: Diff
          });
        }
      }
      if (client.needUpdateRunning) {
        updatedData.isRunning = await client.getIsRunning();
        if (device.isRunning !== updatedData.isRunning) {
          await db.tables.Log.create({
            deviceId: device.id,
            createdBy: 'anonymous',
            type: updatedData.isRunning ? 'on' : 'off'
          });
        }
      }
      await device.update(updatedData);
    } catch (e) {
      logError(e);
    }
  }

  logInfo('worker finished: ' + new Date());
};

export default worker;

import { Client } from 'discord.js';
import { logInfo } from './utils/logger';
import db from './db';
import services from './services';
import send from './utils/send';

const discord = () => {
  if (!process.env.DISCORD_AUTOMANAGE_PLUG_ID) {
    return;
  }

  const client = new Client();

  client.on('ready', async () => {
    logInfo(`Logged in as ${client.user.tag}!`);

    const device = await db.tables.Device.findOne({
      where: {
        id: process.env.DISCORD_AUTOMANAGE_PLUG_ID
      }
    });
    if (!device) {
      throw new Error('not found device');
    }

    client.on('presenceUpdate', async (_, newMember) => {
      if (newMember.userID !== process.env.DISCORD_ACCOUNT_ID) {
        return;
      }

      const resultToOff =
        !newMember.clientStatus.desktop ||
        ['idle', 'offline'].indexOf(newMember.clientStatus.desktop) !== -1;
      const resultToOn =
        ['online', 'dnd'].indexOf(newMember.clientStatus.desktop) !== -1;

      const tpClient = new services[device.type](device);
      await tpClient.login();

      const current = await tpClient.getIsRunning();
      if (resultToOff && current) {
        // turn off
        await send(device.id, 'off', {}, 'discord');
        return;
      }

      if (resultToOn && !current) {
        // turn on
        await send(device.id, 'on', {}, 'discord');
      }
    });
  });

  client.login(process.env.DISCORD_BOT_TOKEN);
};

export default discord;

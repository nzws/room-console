import * as NatureRemo from 'nature-remo';

export default class NatureAC {
  constructor(device) {
    this.device = device;

    this.needUpdateData = true;
    this.needUpdateRunning = true;
  }

  async login() {
    const natureClient = new NatureRemo.Cloud(process.env.NATURE_TOKEN);
    this.client = natureClient;

    if (this.device) {
      const device = (await this.client.getAppliances()).find(
        i => i.id === this.device.deviceId
      );
      this.deviceData = device;
    }
  }

  async getData() {
    const device = this.deviceData;

    return {
      mode: device.settings.mode,
      temp: device.settings.temp,
      vol: device.settings.vol,
      range: device.aircon.range.modes
    };
  }

  async getList() {
    const list = await this.client.getAppliances('AC');
    return list.map(i => ({
      id: i.id,
      name: i.nickname
    }));
  }

  async getIsRunning() {
    return this.deviceData.settings.button !== 'power-off';
  }

  async powerOn() {
    if (await this.getIsRunning()) {
      return;
    }

    await this.client.updateAirconSettings(this.deviceData.id, {
      operation_mode: this.deviceData.settings.mode
    });
  }

  async powerOff() {
    if (!(await this.getIsRunning())) {
      return;
    }

    await this.client.updateAirconSettings(this.deviceData.id, {
      button: 'power-off'
    });
  }

  async sendCustomSignal(type, data) {
    const config = await this.getData();
    const id = this.deviceData.id;
    let value = data.value;
    let result;

    if (type === 'temp-down') {
      type = 'temp';
      value = parseInt(config.temp) - 1;
    } else if (type === 'temp-up') {
      type = 'temp';
      value = parseInt(config.temp) + 1;
    }

    if (type === 'mode') {
      if (!value) {
        const modes = Object.keys(config.range);
        const index = modes.indexOf(config.mode);
        value = modes[index + 1] || modes[0];
      }
      if (!config.range[value]) {
        throw new Error('unknown mode');
      }
      result = await this.client.updateAirconSettings(id, {
        operation_mode: value
      });
    } else if (type === 'temp') {
      if (!value) {
        const temps = config.range[config.mode].temp;
        const index = temps.indexOf(`${config.temp}`);
        value = temps[index + 1] || temps[0];
      }
      if (config.range[config.mode].temp.indexOf(`${value}`) === -1) {
        throw new Error('unknown temp');
      }
      result = await this.client.updateAirconSettings(id, {
        temperature: parseInt(value)
      });
    } else if (type === 'vol') {
      if (!value) {
        const vols = config.range[config.mode].vol;
        const index = vols.indexOf(`${config.vol}`);
        value = vols[index + 1] || vols[0];
      }
      if (config.range[config.mode].vol.indexOf(value) === -1) {
        throw new Error('unknown vol');
      }
      result = await this.client.updateAirconSettings(id, {
        air_volume: value
      });
    } else {
      throw new Error('unknown type');
    }

    return {
      data: {
        ...this.getData(),
        temp: result.temp,
        mode: result.mode,
        vol: result.vol
      }
    };
  }
}

import * as NatureRemo from 'nature-remo';

export default class NatureLightMLRU1 {
  constructor(device) {
    this.device = device;
    this.needUpdateData = false;
    this.needUpdateRunning = false;
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
    return {};
  }

  async getList() {
    const list = await this.client.getAppliances();
    return list.map(i => ({
      id: i.id,
      name: i.nickname
    }));
  }

  async getIsRunning() {
    return this.device.isRunning;
  }

  async powerOn() {
    if (await this.getIsRunning()) {
      throw new Error('already on');
    }
    const signalId = this._getSignalId('ico_on');
    await this.client.sendSignal(signalId);
  }

  async powerOff() {
    if (!(await this.getIsRunning())) {
      throw new Error('already off');
    }

    const signalId = this._getSignalId('ico_on');
    await this.client.sendSignal(signalId);
    await this.client.sendSignal(signalId);
  }

  async sendCustomSignal(type) {
    if (!this.getIsRunning()) {
      return;
    }

    const signalUp = this._getSignalId('ico_arrow_top');
    const signalDown = this._getSignalId('ico_arrow_bottom');

    if (type === 'up') {
      await this.client.sendSignal(signalUp);
    } else if (type === 'down') {
      await this.client.sendSignal(signalDown);
    } else if (type === 'up-max') {
      for (let i = 0; i < 5; i++) {
        await this.client.sendSignal(signalUp);
      }
    } else if (type === 'down-max') {
      for (let i = 0; i < 5; i++) {
        await this.client.sendSignal(signalDown);
      }
    } else {
      throw new Error('unknown type');
    }
  }

  _getSignalId(image) {
    const signal = this.deviceData.signals.find(i => i.image === image);
    if (!signal) {
      throw new Error('not found button');
    }

    return signal.id;
  }
}

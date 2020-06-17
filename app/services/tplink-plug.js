import { login } from 'tplink-cloud-api';

export default class TPLinkPlug {
  constructor(device) {
    this.device = device;

    this.needUpdateData = false;
    this.needUpdateRunning = true;
  }

  async login() {
    const tplink = await login(
      process.env.TPLINK_USER,
      process.env.TPLINK_PASS
    );
    await tplink.getDeviceList();
    this.client = tplink;

    if (this.device) {
      const deviceClient = tplink.getHS100(this.device.deviceId);
      this.deviceClient = deviceClient;
    }
  }

  async getData() {
    return {};
  }

  async getList() {
    const list = await this.client.getDeviceList();
    return list.map(i => ({
      name: i.alias,
      id: i.alias
    }));
  }

  async getIsRunning() {
    return !!(await this.deviceClient.getRelayState());
  }

  async powerOn() {
    await this.deviceClient.powerOn();
  }

  async powerOff() {
    await this.deviceClient.powerOff();
  }

  async sendCustomSignal() {
    // カスタムシグナルはない
    throw new Error('unknown type');
  }
}

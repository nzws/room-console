import {
  DoubleLeftOutlined,
  LeftOutlined,
  RightOutlined,
  DoubleRightOutlined
} from '@ant-design/icons';

const services = {
  TPLinkPlug: {
    name: 'TPLink Kasa - スマートプラグ'
  },
  NatureLightMLRU1: {
    name: 'Nature Remo - IR 照明 (消灯→常夜灯→点灯のボタンと5段階の明るさ調節)',
    note: [
      'リモコン例: ML-RU1',
      'Nature側で消点灯ボタンを「ico_on」、明るさ調節を「ico_arrow_top」「ico_arrow_bottom」に設定してください。',
      'オンオフ状態をRoom Consoleが記憶するため、Room Consoleで電源を集中管理する必要があります。'
    ],
    buttons: [
      {
        id: 'Button',
        sendType: 'down-max',
        name: '超暗く',
        Icon: DoubleLeftOutlined
      },
      {
        id: 'Button',
        sendType: 'down',
        name: '暗く',
        Icon: LeftOutlined
      },
      {
        id: 'Button',
        sendType: 'up',
        name: '明るく',
        Icon: RightOutlined
      },
      {
        id: 'Button',
        sendType: 'up-max',
        name: '超明るく',
        Icon: DoubleRightOutlined
      }
    ]
  },
  NatureAC: {
    name: 'Nature Remo - エアコン',
    note: ['モード / 温度 / 風量 に対応しています。'],
    buttons: [
      {
        id: 'ACTemp',
        name: '温度',
        sendType: 'temp',
        value: device => device.data.temp,
        textInput: true
      },
      {
        id: 'Button',
        name: 'モード',
        sendType: 'mode',
        value: device => device.data.mode,
        selectInput: device => Object.keys(device.data.range)
      },
      {
        id: 'Button',
        name: '風量',
        sendType: 'vol',
        value: device => device.data.vol || '?',
        textInput: true
      }
    ]
  }
};

export default services;

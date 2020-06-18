import React, { useState, useEffect, Fragment } from 'react';
import { Button, Row, Card, Timeline } from 'antd';
import { useParams } from 'react-router-dom';
import { PoweroffOutlined } from '@ant-design/icons';
import api from '../utils/api';
import { green } from '@ant-design/colors';
import services from '../services';
import Container from '../components/container';
import buttons from '../components/buttons';

const logLocale = {
  on: `電源をオンにしました`,
  off: `電源をオフにしました`,
  update_data: `設定が変更されました`,
  action: `アクションを実行しました`,
  me: `あなた`,
  anonymous: `誰か (外部操作)`,
  discord: 'Discord エージェント'
};

const Device = () => {
  const {
    updateDevices,
    devices: [devices]
  } = Container.useContainer();
  const { id } = useParams();
  const [log, setLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const device = devices.find(i => i.id === id);

  useEffect(() => {
    updateData();
  }, [id]);

  const updateData = async () => {
    const logs = await api('/auth-api/logs', {
      id
    });
    setLog(logs.result);
    updateDevices();
  };

  if (!device) {
    return <></>;
  }

  const update = async (type, postData = {}) => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    try {
      await api('/auth-api/send', {
        id: device.id,
        type,
        data: postData
      });
    } catch (_) {
      return setIsLoading(false);
    }
    setIsLoading(false);
    updateDevices();
    updateData();
  };

  const service = services[device.type];

  return (
    <Fragment>
      <div>
        <div style={{ float: 'right' }}>
          <Button
            type="text"
            size="large"
            style={{ color: device.isRunning ? green.primary : undefined }}
            disabled={isLoading}
            onClick={() => update(device.isRunning ? 'off' : 'on')}
          >
            {device.isRunning ? '稼働' : '停止'}中 <PoweroffOutlined />
          </Button>
        </div>
        <h1>{device.name}</h1>
      </div>

      {service.buttons && (
        <Card title="操作" style={{ marginBottom: '10px' }}>
          <Row justify="space-around">
            {service.buttons.map(i => {
              const Component = buttons[i.id];
              if (!Component) return <Fragment key={i.name}></Fragment>;

              return (
                <Component
                  key={i.name}
                  data={i}
                  device={device}
                  update={update}
                  isLoading={isLoading}
                />
              );
            })}
          </Row>
        </Card>
      )}

      <h2>ログ</h2>
      <Timeline>
        {log.map(i => (
          <Timeline.Item
            key={i.id}
            color={
              i.type === 'on' ? 'green' : i.type === 'off' ? 'gray' : undefined
            }
          >
            <p>
              {['me', 'anonymous', 'discord'].indexOf(i.createdBy) !== -1
                ? logLocale[i.createdBy]
                : `Hook (${i.createdBy})`}
              : {logLocale[i.type]} -{' '}
              {new Date(i.createdAt).toLocaleString('ja-JP')}
            </p>
            {Object.keys(i.data)[0] && <>{JSON.stringify(i.data)}</>}
          </Timeline.Item>
        ))}
      </Timeline>
    </Fragment>
  );
};

export default Device;

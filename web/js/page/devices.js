import React, { Fragment, useState } from 'react';
import { Form, Input, Select, Button, notification } from 'antd';
import services from '../services';
import Container from '../components/container';
import api from '../utils/api';

const Devices = () => {
  const { updateDevices } = Container.useContainer();
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [id, setId] = useState('');
  const [devices, setDevices] = useState([]);

  const onFormLayoutChange = async ({ name, type, id }) => {
    if (name) {
      setName(name);
    }
    if (id) {
      setId(id);
    }
    if (type) {
      setType(type);
      const devices = await api('/auth-api/add-device', {
        type
      });
      setDevices(devices.result);
    }
  };

  const submit = async () => {
    await api('/auth-api/add-device', {
      id,
      type,
      name
    });
    notification.success({
      message: '登録しました。'
    });
    updateDevices();
  };

  return (
    <Fragment>
      <h1>デバイスを追加</h1>

      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onValuesChange={onFormLayoutChange}
        size="middle"
      >
        <Form.Item label="デバイス名" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="デバイスの種類" name="type">
          <Select>
            {Object.keys(services).map(key => (
              <Select.Option value={key} key={key}>
                {services[key].name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="デバイス" name="id">
          <Select disabled={!type}>
            {devices.map(i => (
              <Select.Option value={i.id} key={i.id}>
                {i.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
          <Button type="primary" block onClick={submit}>
            登録
          </Button>
        </Form.Item>
      </Form>

      <p>
        {type &&
          services[type].note &&
          services[type].note.map(i => <div key={i}>* {i}</div>)}
      </p>
    </Fragment>
  );
};

export default Devices;

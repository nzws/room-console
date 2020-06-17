import React, { useState, useEffect } from 'react';
import {
  Button,
  Row,
  Col,
  Input as AntInput,
  Typography,
  notification
} from 'antd';
import { MailOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import api from '../utils/api';

const Title = styled(Typography.Title)`
  text-align: center;
`;

const Input = styled(AntInput)`
  margin-bottom: 20px;
`;

const Login = () => {
  const [mail, setMail] = useState('');

  const onClick = async () => {
    await api('/public-api/login', {
      mail
    });
    notification.success({
      message: 'メールを送信しました。'
    });
  };

  useEffect(() => {
    (async () => {
      if (location.hash) {
        const callback = await api('/public-api/login-callback', {
          id: location.hash.slice(1)
        });
        localStorage.setItem('api_token', callback.token);
        location.hash = '';
        location.reload();
      }
    })();
  }, []);

  return (
    <Row justify="center">
      <Col xxl={6} lg={10} span={20}>
        <Title level={2}>Welcome to My Room Console 👋</Title>
        <Input
          type="email"
          size="large"
          placeholder="メールアドレス"
          prefix={<MailOutlined />}
          value={mail}
          onChange={e => setMail(e.target.value)}
        />

        <Button type="primary" size="large" block onClick={onClick}>
          認証メールを送信
        </Button>
      </Col>
    </Row>
  );
};

export default Login;

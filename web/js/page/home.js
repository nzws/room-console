import React from 'react';
import { Row, Col } from 'antd';
import styled from 'styled-components';
import Card from '../components/card';

const Box = styled.div`
  width: 100%;
  height: calc(100vh - 72px); // 良い方法募集中
  overflow-y: auto;
  padding: 10px;
`;

const Home = () => {
  return (
    <Row justify="center">
      <Col xs={22} md={8} xl={6} xxl={4}>
        <Box>
          <Card
            data={{
              name: 'エアコン',
              isRunning: true
            }}
          />
          <Card
            data={{
              name: 'デスクライト',
              isRunning: false
            }}
          />
          <Card
            data={{
              name: '照明',
              isRunning: true
            }}
          />
        </Box>
      </Col>
      <Col xs={0} md={14} xl={16} xxl={18}>
        <Box>a</Box>
      </Col>
    </Row>
  );
};

export default Home;

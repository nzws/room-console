import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { LeftOutlined, MoreOutlined } from '@ant-design/icons';
import { Button, Row, Col, Divider, Card as AntCard, Dropdown } from 'antd';
import styled from 'styled-components';
import Card from './card';
import MenuComponent from './menu';
import Container from './container';

const Box = styled.div`
  width: 100%;
  height: calc(100vh - 72px); // 良い方法募集中
  overflow-y: auto;
  padding: 10px;
`;

const HomeCard = styled(AntCard)`
  margin-bottom: 10px;
`;

const Drop = styled.div`
  float: right;
`;

const Layout = ({ children }) => {
  const {
    devices: [devices],
    updateDevices
  } = Container.useContainer();
  const history = useHistory();
  const location = useLocation();
  const isNotMenu = location.pathname !== '/';

  useEffect(() => {
    updateDevices();
  }, []);

  return (
    <Row justify="space-around">
      <Col xs={isNotMenu ? 0 : 22} md={8} xl={6} xxl={4}>
        <Box>
          <HomeCard size="small">
            <Drop>
              <Dropdown overlay={MenuComponent}>
                <Button type="text" size="large">
                  <MoreOutlined />
                </Button>
              </Dropdown>
            </Drop>
            <Button
              type="text"
              size="large"
              onClick={() => history.push('/home')}
            >
              <b>My Room</b>
            </Button>
          </HomeCard>

          {devices.map(i => (
            <Card data={i} key={i.id} />
          ))}
        </Box>
      </Col>
      <Col xs={isNotMenu ? 22 : 0} md={14} xl={16} xxl={18}>
        <Box>
          <Row>
            <Col xs={24} md={0}>
              <Link to="/">
                <LeftOutlined /> メニューに戻る
              </Link>
              <Divider />
            </Col>
          </Row>

          {children}
        </Box>
      </Col>
    </Row>
  );
};

Layout.propTypes = {
  children: PropTypes.node
};

export default Layout;

import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import styled, { css } from 'styled-components';
import ButtonComponent from './button';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import PopInput from '../pop-input';

const Box = styled(Col)`
  text-align: center;

  div {
    font-size: 1.2rem;
  }

  ${({ allowButton }) =>
    allowButton &&
    css`
      cursor: pointer;

      :hover {
        background: rgba(0, 0, 0, 0.2);
      }
    `};
`;

const ACTemp = ({ small = false, data, device, update, isLoading }) => {
  return (
    <Col xs={24} md={small ? 24 : 12}>
      <Row justify="space-around">
        <ButtonComponent
          small={true}
          data={{
            sendType: 'temp-down',
            name: '下げる',
            Icon: LeftOutlined
          }}
          device={device}
          update={update}
          isLoading={isLoading}
        />
        <Box allowButton={!isLoading} span={6}>
          <PopInput small={false} data={data} device={device} update={update}>
            <small>{data.name}</small>
            <div>
              <b>{data.value && data.value(device)}</b> <small>℃</small>
            </div>
          </PopInput>
        </Box>
        <ButtonComponent
          small={true}
          data={{
            sendType: 'temp-up',
            name: '上げる',
            Icon: RightOutlined
          }}
          device={device}
          update={update}
          isLoading={isLoading}
        />
      </Row>
    </Col>
  );
};

ACTemp.propTypes = {
  small: PropTypes.bool,
  data: PropTypes.object,
  device: PropTypes.object,
  update: PropTypes.func,
  isLoading: PropTypes.bool
};

export default ACTemp;

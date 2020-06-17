import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card, Switch, Row } from 'antd';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import Container from './container';
import services from '../services';
import buttons from './buttons';

const StyledCard = styled(Card)`
  margin-bottom: 10px;
`;

const CardComponent = ({ data }) => {
  const { updateDevices } = Container.useContainer();
  const [isLoading, setIsLoading] = useState(false);

  const service = services[data.type];

  const update = async (type, postData = {}) => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    try {
      await api('/auth-api/send', {
        id: data.id,
        type,
        data: postData
      });
    } catch (_) {
      return setIsLoading(false);
    }
    setIsLoading(false);
    updateDevices();
  };

  return (
    <StyledCard
      size="small"
      title={
        <Link to={`/device/${data.id}`} style={{ color: 'rgba(0,0,0,.65)' }}>
          {data.name}
        </Link>
      }
      extra={
        <Switch
          checked={data.isRunning}
          onChange={() => update(data.isRunning ? 'off' : 'on')}
          loading={isLoading}
        />
      }
    >
      <Row justify="space-around">
        {service.buttons &&
          service.buttons.map(i => {
            const Component = buttons[i.id];
            if (!Component) return <Fragment key={i.name}></Fragment>;

            return (
              <Component
                key={i.name}
                small
                data={i}
                device={data}
                update={update}
                isLoading={isLoading}
              />
            );
          })}
      </Row>
    </StyledCard>
  );
};

CardComponent.propTypes = {
  data: PropTypes.object
};

export default CardComponent;

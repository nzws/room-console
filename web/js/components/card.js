import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card, Switch } from 'antd';
import { Link } from 'react-router-dom';

const StyledCard = styled(Card)`
  margin-bottom: 10px;
`;

const CardComponent = ({ data }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const setRunning = status => {
    setIsLoading(true);
    setTimeout(() => {
      setIsRunning(status);
      setIsLoading(false);
    }, 1000);
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
        <Switch checked={isRunning} onChange={setRunning} loading={isLoading} />
      }
    ></StyledCard>
  );
};

CardComponent.propTypes = {
  data: PropTypes.object
};

export default CardComponent;

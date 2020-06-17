import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'antd';
import styled, { css } from 'styled-components';
import PopInput from '../pop-input';

const Button = styled.div`
  outline: none;
  cursor: ${({ isLoading }) => (isLoading ? `not-allowed` : `pointer`)};
  text-align: center;

  ${({ isLoading }) =>
    !isLoading &&
    css`
      :hover {
        background: rgba(0, 0, 0, 0.2);
      }
    `};
`;

const Main = styled.div`
  font-size: 1.2rem;
`;

const ButtonComponent = ({
  small = false,
  data,
  device,
  update,
  isLoading
}) => {
  return (
    <Col xs={6} md={small ? 6 : 3}>
      <PopInput small={small} data={data} device={device} update={update}>
        <Button
          isLoading={isLoading}
          onClick={() =>
            (small || (!data.textInput && !data.selectInput)) &&
            update(data.sendType)
          }
        >
          <small>{data.name}</small>
          <Main>
            {data.Icon && <data.Icon />}
            {data.value && data.value(device)}
          </Main>
        </Button>
      </PopInput>
    </Col>
  );
};

ButtonComponent.propTypes = {
  small: PropTypes.bool,
  data: PropTypes.object,
  device: PropTypes.object,
  update: PropTypes.func,
  isLoading: PropTypes.bool
};

export default ButtonComponent;

import React, { Fragment, useEffect, useState } from 'react';
import { Row, Col, Divider } from 'antd';
import styled from 'styled-components';
import api from '../utils/api';
import { red, blue } from '@ant-design/colors';

const Time = styled(Col)`
  letter-spacing: 1px;

  h4 {
    margin-bottom: 0;
    font-size: 1.1rem;
  }

  h1 {
    font-size: 3rem;
    line-height: 1.2;
  }
`;

const Weather = styled(Col)`
  @media screen and (min-width: 576px) {
    text-align: right;
  }

  h4 {
    font-size: 1.1rem;
    margin: 0 10px;
  }

  > span {
    display: inline-block;
    text-align: center;
    width: 80px;
  }
`;

const zero = num => (num < 10 ? `0${num}` : num);

const Home = () => {
  const [d, setDate] = useState(new Date());
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => setDate(new Date()), 1000);
    (async () => {
      const weather = await api('/auth-api/weather', {
        id: 230010
      });
      setWeather(weather);
    })();

    return () => clearInterval(interval);
  }, []);

  return (
    <Fragment>
      <Row>
        <Time xs={24} sm={12}>
          <h4>
            {d.toLocaleDateString('ja-JP', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </h4>
          <h1>
            {zero(d.getHours())}:{zero(d.getMinutes())}:{zero(d.getSeconds())}
          </h1>
        </Time>
        <Weather xs={24} sm={12}>
          <h4>{weather && weather.title}</h4>
          {weather &&
            weather.forecasts.map(i => (
              <span key={i.dateLabel}>
                <small>{i.dateLabel}</small>
                <br />
                <b>{i.telop}</b>
                <br />
                <span style={{ color: red.primary }}>
                  {i.temperature.max?.celsius || '?'}℃
                </span>
                {' / '}
                <span style={{ color: blue.primary }}>
                  {i.temperature.min?.celsius || '?'}℃
                </span>
              </span>
            ))}
        </Weather>

        <Divider />
      </Row>
    </Fragment>
  );
};

export default Home;

import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { blue } from '@ant-design/colors';
import NavComponent from './components/navbar';

import 'antd/dist/antd.css';

import Login from './page/login';
import Home from './page/home';
import Layout from './components/layout';
import Devices from './page/devices';
import Device from './page/device';

const GlobalStyle = createGlobalStyle({
  '*, *:after, *:before': {
    boxSizing: 'border-box',
    transition: '120ms ease',
    scrollbarWidth: 'thin'
  },
  '::-webkit-scrollbar': {
    width: '2px',
    height: '2px',
    background: 'transparent',
    '&-thumb': {
      background: blue.primary,
      border: 'none'
    }
  }
});

const App = () => {
  const isLoggedIn = localStorage.getItem('api_token');

  return (
    <Fragment>
      <GlobalStyle />
      <NavComponent />

      {isLoggedIn ? (
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/device/:id" component={Device} />
            <Route path="/settings/hooks" component={Login} />
            <Route path="/settings/devices" component={Devices} />
          </Switch>
        </Layout>
      ) : (
        <Login />
      )}
    </Fragment>
  );
};

export default App;

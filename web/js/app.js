import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import NavComponent from './components/navbar';

import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/antd.css';

import Login from './page/login';
import Home from './page/home';

const App = () => {
  const isLoggedIn = localStorage.getItem('api_token');

  return (
    <Fragment>
      <NavComponent />

      {isLoggedIn ? (
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/device/:id" component={Login} />
          <Route path="/today" component={Login} />
          <Route path="/settings/webhooks" component={Login} />
        </Switch>
      ) : (
        <Login />
      )}

      <ToastContainer />
    </Fragment>
  );
};

export default App;

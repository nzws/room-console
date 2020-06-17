import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app';
import Container from './components/container';

render(
  <BrowserRouter>
    <Container.Provider>
      <App />
    </Container.Provider>
  </BrowserRouter>,
  document.getElementById('app')
);

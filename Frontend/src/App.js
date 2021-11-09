import React from 'react';

import { Provider } from 'react-redux';
import store from './store';

import { ThemeProvider } from '@emotion/react'
import theme from '@rebass/preset'

import Router from './router';

import './stylesheets/App.scss';

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </Provider>
  );
}

export default App;

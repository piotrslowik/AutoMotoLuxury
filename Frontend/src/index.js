import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './stylesheets/index.css';
import App from './App';
import { LocalStorageGet } from './logic/helpers';

import * as serviceWorker from './serviceWorker';

axios.interceptors.request.use(config => {
  if (config.url.includes('localhost')) {
    const authHeaders = {
      ...config.headers,
      Authorization: `Bearer ${LocalStorageGet('token')}`,
    };
    return {
      ...config,
      headers: authHeaders,
    };
  }
  return config;
}, error => {
  return Promise.reject(error);
});

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();

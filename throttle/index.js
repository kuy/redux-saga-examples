import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './app';
import DevTools from './dev-tools';
import configureStore from './store';

ReactDOM.render(
  <Provider store={configureStore()}>
    <div>
      <App />
      <DevTools />
    </div>
  </Provider>,
document.getElementById('container'));

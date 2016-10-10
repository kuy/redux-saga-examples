import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Wizard from './containers/wizard';
import configureStore from './store';

ReactDOM.render(
  <Provider store={configureStore()}>
    <div>
      <h1>
        <a href="https://github.com/kuy/redux-saga-examples/tree/master/wizard">Wizard</a> from <a href="https://github.com/kuy/redux-saga-examples">redux-saga-examples</a> by <a href="https://twitter.com/kuy">@kuy</a>
      </h1>
      <Wizard />
    </div>
  </Provider>,
document.getElementById('container'));

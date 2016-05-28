import React, { Component } from 'react';
import { connect } from 'react-redux';
import { online, offline } from './actions';

class App extends Component {
  render() {
    const { app: { count, status }, stats: { history } } = this.props;
    return (
      <div>
        <h1>
          <a href="https://github.com/kuy/redux-saga-examples/tree/master/startstop">Start-Stop</a> from <a href="https://github.com/kuy/redux-saga-examples">redux-saga-examples</a> by <a href="https://twitter.com/kuy">@kuy</a>
        </h1>
        <h3>
          Count: {count}
          <span style={{ marginLeft: '16px' }}></span>
          Status: {status ? 'ONLINE' : 'OFFLINE'}
        </h3>
        <h4>
          This example is running only while you're seeing.
          When you switch the browser tab to others, it will be offline and stopped.<br />
          The reporter saga outputs the current count to Developer Console periodically.
        </h4>
        <ul>
          {history.slice(1).map((time, i) =>
            <li key={i}>[{i}] +{(time - history[i]) / 1000} seconds</li>
          )}
        </ul>
      </div>
    );
  }
}

function select({ app, stats }) {
  return { app, stats };
}

export default connect(select)(App);

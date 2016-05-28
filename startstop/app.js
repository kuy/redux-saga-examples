import React, { Component } from 'react';
import { connect } from 'react-redux';
import { online, offline } from './actions';

class App extends Component {
  handleToggle() {
    const { app: { status } } = this.props;
    this.props.dispatch(status ? offline() : online());
  }

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
          <span style={{ marginLeft: '4px' }}></span>
          <button onClick={this.handleToggle.bind(this)}>Toggle</button>
        </h3>
        <ul>
          {history.map((duration, i) =>
            <li key={i}>[{i}] +{duration / 1000}msec</li>
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

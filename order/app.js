import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestSomething } from './actions';

class App extends Component {
  handleClick() {
    this.props.dispatch(requestSomething(500));
    this.props.dispatch(requestSomething(1500));
    this.props.dispatch(requestSomething(1000));
  }

  render() {
    return <div>
      <h1>
        <a href="https://github.com/kuy/redux-saga-examples/tree/master/order">Order</a> from <a href="https://github.com/kuy/redux-saga-examples">redux-saga-examples</a> by <a href="https://twitter.com/kuy">@kuy</a>
      </h1>
      <h3>Please open <i>JavaScript Console</i> and click following buttons.</h3>
      <ul>
        <li><button onClick={e => this.handleClick()}>Batch Request</button></li>
      </ul>
    </div>;
  }
}

function select({ app }) {
  return { app };
}

export default connect(select)(App);

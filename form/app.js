import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from './form';
import { requestSubmit } from './actions';

class App extends Component {
  handleSubmit(values) {
    return new Promise((resolve, reject) => {
      this.props.dispatch(requestSubmit({ values, resolve, reject }));
    });
  }

  render() {
    return <div>
      <h1>
        <a href="https://github.com/kuy/redux-saga-examples/tree/master/form">Form</a> from <a href="https://github.com/kuy/redux-saga-examples">redux-saga-examples</a> by <a href="https://twitter.com/kuy">@kuy</a>
      </h1>
      <Form onSubmit={this.handleSubmit.bind(this)} />
    </div>;
  }
}

export default connect()(App);

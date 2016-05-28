import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SignIn, Timeline } from './pages';

class App extends Component {
  page() {
    const { app: { status } } = this.props;
    switch (status) {
    case 'init':
    case 'signin':
    case 'username':
      return <SignIn />;
    case 'ready':
      return <Timeline />;
    }
    return <div>404 Not Found :(</div>;
  }

  render() {
    const { app } = this.props;
    return (
      <div>
        <h1>
          <a href="https://github.com/kuy/redux-saga-examples/tree/master/microblog">Microblog</a> from <a href="https://github.com/kuy/redux-saga-examples">redux-saga-examples</a> by <a href="https://twitter.com/kuy">@kuy</a>
        </h1>
        {this.page()}
      </div>
    );
  }
}

function select({ app }) {
  return { app };
}

export default connect(select)(App);

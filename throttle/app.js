import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestSomething } from './actions';
import { toggleProducer, incrementLimit, decrementLimit } from './actions';

class App extends Component {
  componentDidMount() {
    setInterval(() => {
      const { dispatch, app: { producer } } = this.props;
      if (producer) {
        this.props.dispatch(requestSomething());
      }
    }, 500);
  }

  handleToggle() {
    this.props.dispatch(toggleProducer());
  }

  handleIncrementLimit() {
    this.props.dispatch(incrementLimit());
  }

  handleDecrementLimit() {
    this.props.dispatch(decrementLimit());
  }

  render() {
    const { app, throttle } = this.props;
    return (
      <div>
        <h1>
          <a href="https://github.com/kuy/redux-saga-examples/tree/master/throttle">Throttle</a> from <a href="https://github.com/kuy/redux-saga-examples">redux-saga-examples</a> by <a href="https://twitter.com/kuy">@kuy</a>
        </h1>
        <div>
          Task Producer: { app.producer ? 'On' : 'Off' }
          <span>&nbsp;</span>
          <input type="button" value="Toggle" onClick={this.handleToggle.bind(this)} />
        </div>
        <div>
          Limit: {throttle.limit}
          <span>&nbsp;</span>
          <input type="button" value="+" onClick={this.handleIncrementLimit.bind(this)} />
          <span>&nbsp;</span>
          <input type="button" value="-" onClick={this.handleDecrementLimit.bind(this)} />
        </div>
        <div>
          <ul className="tasks">
            {throttle.jobs.map(job => (
              <li key={job.id} className={job.status}>{job.id}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

function select({ app, throttle }) {
  return { app, throttle };
}

export default connect(select)(App);

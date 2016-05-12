import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestSomething } from './actions';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setInterval(() => {
      this.props.dispatch(requestSomething());
    }, 500);
  }

  render() {
    const { jobs } = this.props;
    return (
      <div>
        <h1>Throttle</h1>
        <div>
          Task Producer: Working
          <input type="button" value="Stop" />
        </div>
        <div>
          <ul className="tasks">
            {jobs.map(job => (
              <li className={job.status}>{job.id}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

function select({ jobs }) {
  return { jobs };
}

export default connect(select)(App);

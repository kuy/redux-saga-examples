import React, { Component } from 'react';
import { connect } from 'react-redux';
import Text from 'react-edit-inline';
import { changeSubject, changeBehavior } from './actions';

class App extends Component {
  handleSubject({ subject }) {
    this.props.dispatch(changeSubject(subject));
  }

  handleBehavior(e) {
    this.props.dispatch(changeBehavior(e.target.value));
  }

  render() {
    const { post: { subject, status } } = this.props;
    const isFlapping = status !== 'ready';
    const style = { color: isFlapping ? 'gray' : 'black' };
    return <div>
      <h1>
        <a href="https://github.com/kuy/redux-saga-examples/tree/master/reject">Reject</a> from <a href="https://github.com/kuy/redux-saga-examples">redux-saga-examples</a> by <a href="https://twitter.com/kuy">@kuy</a>
      </h1>
      <h2 style={style}>
        <Text
          text={subject}
          change={this.handleSubject.bind(this)}
          paramName='subject'
          isDisabled={isFlapping}
        />
      </h2>
      <h4>
        Result:&nbsp;
        <select onChange={this.handleBehavior.bind(this)}>
          <option value="random">Random</option>
          <option value="success">Always Success</option>
          <option value="failure">Always Failure</option>
        </select>
      </h4>
      <h3>Instructions</h3>
      <ol>
        <li>Click above text <b>"The Fabulous Subject"</b> to start in-place editing</li>
        <li>Change subject and submit (Press enter key to submit)</li>
        <li>(Fake) AJAX request is working in background</li>
        <li>
          <ul>
            <li>Succes: Nothing happens</li>
            <li>Failure: Restore old subject (Rollback)</li>
          </ul>
        </li>
      </ol>
    </div>;
  }
}

function select({ post }) {
  return { post };
}

export default connect(select)(App);

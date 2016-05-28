import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestSignIn } from '../actions';

class SignIn extends Component {
  handleSignIn() {
    this.props.dispatch(requestSignIn());
  }

  render() {
    return (
      <div>
        <button onClick={this.handleSignIn.bind(this)}>Anonymous Sign In</button>
      </div>
    );
  }
}

export default connect()(SignIn);

import React, { Component } from 'react';
import { connect } from 'react-redux';

class Verify extends Component {
  render() {
    return (
      <div>
        <h2>Verify</h2>
      </div>
    );
  }
}

export default connect()(Verify);

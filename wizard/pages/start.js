import React, { Component } from 'react';
import { connect } from 'react-redux';

class Start extends Component {
  render() {
    return (
      <div>
        <h2>Start</h2>
      </div>
    );
  }
}

export default connect()(Start);

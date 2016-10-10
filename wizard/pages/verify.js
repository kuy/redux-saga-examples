import React, { Component } from 'react';
import { connect } from 'react-redux';

class Verify extends Component {
  render() {
    return (
      <div>
        <h2>Verify</h2>
        <h3>Please wait. Now Processing...</h3>
        <p>
          The verification process takes 5 seconds.<br />
          If you want to change email address to another one, please click 'Back' button below.
        </p>
      </div>
    );
  }
}

export default connect()(Verify);

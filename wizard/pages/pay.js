import React, { Component } from 'react';
import { connect } from 'react-redux';

class Pay extends Component {
  render() {
    return (
      <div>
        <h2>Pay</h2>
        <h3>Verification has successfully completed.</h3>
        <p>
          Please choose payment method.
        </p>
        <ul>
          <li>PayPal</li>
          <li>Credit Card</li>
          <li>Bitcoin</li>
        </ul>
      </div>
    );
  }
}

export default connect()(Pay);

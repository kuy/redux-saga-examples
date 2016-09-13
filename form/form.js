import React, { Component, PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'

class Form extends Component {
  static get propTypes() {
    return {
      handleSubmit: PropTypes.func.isRequired,
      submitting: PropTypes.bool.isRequired
    };
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    return (<form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <div>
            <Field name="first" component="input" type="text" placeholder="First Name" />
          </div>
        </div>
        <div>
          <label>Last Name</label>
          <div>
            <Field name="last" component="input" type="text" placeholder="Last Name" />
          </div>
        </div>
        <div>
          <button type="submit" disabled={submitting}>
            {submitting ? <i/> : <i/>} Submit
          </button>
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: 'redux'
})(Form);

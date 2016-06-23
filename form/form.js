import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'

const fields = ['first', 'last'];

class Form extends Component {
  static get propTypes() {
    return {
      fields: PropTypes.object.isRequired,
      handleSubmit: PropTypes.func.isRequired,
      submitting: PropTypes.bool.isRequired
    };
  }

  render() {
    const {
      fields: { first, last },
      handleSubmit,
      submitting
    } = this.props;
    return (<form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <div>
            <input type="text" placeholder="First Name" {...first}/>
          </div>
        </div>
        <div>
          <label>Last Name</label>
          <div>
            <input type="text" placeholder="Last Name" {...last}/>
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
  form: 'redux',
  fields
})(Form);

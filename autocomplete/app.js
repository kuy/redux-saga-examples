import React, { Component } from 'react';
import { connect } from 'react-redux';
import Suggest from 'react-autosuggest';
import { setKeyword, requestSuggest } from './actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSuggest = this.handleSuggest.bind(this);
  }

  handleChange(e, { newValue }) {
    this.props.dispatch(setKeyword(newValue));
  }

  handleSuggest({ value }) {
    this.props.dispatch(requestSuggest(value));
  }

  render() {
    const { search: { suggests, keyword } } = this.props;
    const props = {
      value: keyword,
      onChange: this.handleChange
    };
    return (
      <div>
        <h1>Hello Sagas!</h1>
        <Suggest
          suggestions={suggests}
          onSuggestionsUpdateRequested={this.handleSuggest}
          renderSuggestion={s => <span>{s.name}</span>}
          getSuggestionValue={s => s.name}
          inputProps={props}
        />
      </div>
    );
  }
}

function select({ app, search }) {
  return { app, search };
}

export default connect(select)(App);

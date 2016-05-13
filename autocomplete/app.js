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
        <h1>
          <a href="https://github.com/kuy/redux-saga-examples/tree/master/autocomplete">Autocomplete</a> from <a href="https://github.com/kuy/redux-saga-examples">redux-saga-examples</a> by <a href="https://twitter.com/kuy">@kuy</a>
        </h1>
        <h3>Type "c" to start suggestions. It starts completion lazily.</h3>
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

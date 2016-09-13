import React, { Component } from 'react';
import { connect } from 'react-redux';
import Suggest from 'react-autosuggest';
import { setKeyword, requestSuggest, clearSuggests } from './actions';

class App extends Component {
  handleChange(e, { newValue }) {
    this.props.dispatch(setKeyword(newValue));
  }

  handleSuggest({ value }) {
    this.props.dispatch(requestSuggest(value));
  }

  handleClear() {
    this.props.dispatch(clearSuggests());
  }

  render() {
    const { search: { suggests, keyword } } = this.props;
    const props = {
      value: keyword,
      onChange: this.handleChange.bind(this)
    };
    return (
      <div>
        <h1>
          <a href="https://github.com/kuy/redux-saga-examples/tree/master/autocomplete">Autocomplete</a> from <a href="https://github.com/kuy/redux-saga-examples">redux-saga-examples</a> by <a href="https://twitter.com/kuy">@kuy</a>
        </h1>
        <h3>Type "c" to start suggestions. It starts completion lazily.</h3>
        <Suggest
          suggestions={suggests}
          onSuggestionsFetchRequested={this.handleSuggest.bind(this)}
          onSuggestionsClearRequested={this.handleClear.bind(this)}
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

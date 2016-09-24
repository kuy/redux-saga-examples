import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestSubmit } from './actions';

class App extends Component {
  handleSubmit(values) {
    return new Promise((resolve, reject) => {
      this.props.dispatch(requestSubmit({ values, resolve, reject }));
    });
  }

  render() {
    const handlers = {
      onDragOver: e => {
        console.log('dragOver');
        if (e.preventDefault) {
          e.preventDefault();
        }
        e.dataTransfer.dragEffect = 'move';
        return false;
      },
    };

    return <div>
      <h1>
        <a href="https://github.com/kuy/redux-saga-examples/tree/master/dnd">Drag &amp; Drop</a> from <a href="https://github.com/kuy/redux-saga-examples">redux-saga-examples</a> by <a href="https://twitter.com/kuy">@kuy</a>
      </h1>
      <div className="dnd-area" {...handlers}>
        <div className="dnd-box" draggable="true">Drag Me</div>
      </div>
    </div>;
  }
}

export default connect()(App);

import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

const initial = {
  app: {}
};

function app(state = initial.app, { type, payload }) {
  switch (type) {
  }
  return state;
}

export default combineReducers(
  { app, form }
);

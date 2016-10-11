import { combineReducers } from 'redux';

const initial = {
  app: {}
};

function app(state = initial.app, { type, payload }) {
  switch (type) {
  }
  return state;
}

export default combineReducers(
  { app }
);

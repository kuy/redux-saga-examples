import { combineReducers } from 'redux';

const initial = {
  app: {
    dragging: false,
    outside: false,
    x: null,
    y: null,
  }
};

function app(state = initial.app, { type, payload }) {
  switch (type) {
  }
  return state;
}

export default combineReducers(
  { app }
);

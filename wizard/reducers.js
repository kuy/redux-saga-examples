import { combineReducers } from 'redux';
import { UPDATE_PAGE, UPDATE_NAVIGATION } from './actions';

const initial = {
  app: {
    page: 'start',
    canForward: false,
    canBackward: false,
  },
  data: {}
};

function app(state = initial.app, { type, payload }) {
  switch (type) {
    case UPDATE_PAGE:
      return { ...state, page: payload };
    case UPDATE_NAVIGATION:
      return { ...state, canForward: payload.forward, canBackward: payload.backward };
  }
  return state;
}

function data(state = initial.data, { type, payload }) {
  switch (type) {
  }
  return state;
}

export default combineReducers(
  { app, data }
);

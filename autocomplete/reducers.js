import { combineReducers } from 'redux';
import {
  REQUEST_SUGGEST, SUCCESS_SUGGEST, FAILURE_SUGGEST,
  CLEAR_SUGGESTS, SET_KEYWORD, CLEAR_KEYWORD
} from './actions';

const initial = {
  app: {},
  search: {
    keyword: '',
    suggests: [],
    status: '',
    error: false
  }
};

const handlers = {
  app: {},
  search: {
    [REQUEST_SUGGEST]: (state, action) => {
      return { ...state, status: 'working', error: false };
    },
    [SUCCESS_SUGGEST]: (state, action) => {
      return { ...state, status: 'done', error: false, suggests: action.payload.data };
    },
    [FAILURE_SUGGEST]: (state, action) => {
      return { ...state, status: 'done', error: true };
    },
    [CLEAR_SUGGESTS]: (state, action) => {
      return { ...state, suggests: initial.search.suggests.slice() };
    },
    [SET_KEYWORD]: (state, action) => {
      return { ...state, keyword: action.payload };
    },
    [CLEAR_KEYWORD]: (state, action) => {
      return { ...state, keyword: initial.search.keyword };
    }
  }
};

function app(state = initial.app, action) {
  const handler = handlers.app[action.type];
  if (!handler) { return state; }
  return handler(state, action);
}

function search(state = initial.search, action) {
  const handler = handlers.search[action.type];
  if (!handler) { return state; }
  return handler(state, action);
}

export default combineReducers(
  { app, search }
);

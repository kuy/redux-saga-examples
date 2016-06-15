import { combineReducers } from 'redux';
import {
  CHANGE_BEHAVIOR, CHANGE_SUBJECT,
  REQUEST_UPDATE_SUBJECT, SUCCESS_UPDATE_SUBJECT, FAILURE_UPDATE_SUBJECT
} from './actions';

const initial = {
  app: {
    behavior: 'random'
  },
  post: {
    subject: 'The Fabulous Subject',
    status: 'ready',
    error: false
  }
};

function app(state = initial.app, { type, payload }) {
  switch (type) {
    case CHANGE_BEHAVIOR:
      return { ...state, behavior: payload };
  }
  return state;
}

function post(state = initial.post, { type, payload }) {
  switch (type) {
    case CHANGE_SUBJECT:
      return { ...state, subject: payload };
    case REQUEST_UPDATE_SUBJECT:
      return { ...state, status: 'updating', error: false };
    case SUCCESS_UPDATE_SUBJECT:
      return { ...state, status: 'ready', error: false };
    case FAILURE_UPDATE_SUBJECT:
      return { ...state, status: 'ready', error: true };
  }
  return state;
}

export default combineReducers(
  { app, post }
);

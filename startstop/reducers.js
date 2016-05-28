import { combineReducers } from 'redux';
import {
  INCREMENT, RECORD_STATS, ONLINE, OFFLINE
} from './actions';

const initial = {
  app: {
    count: 0,
    status: true
  },
  stats: {
    history: []
  }
};

function app(state = initial.app, { type, payload }) {
  switch (type) {
    case INCREMENT:
      return { ...state, count: state.count + 1 };
    case ONLINE:
      return { ...state, status: true };
    case OFFLINE:
      return { ...state, status: false };
  }
  return state;
}

function stats(state = initial.stats, { type, payload }) {
  switch (type) {
    case RECORD_STATS:
      return { ...state, history: [...state.history, payload] };
  }
  return state;
}

export default combineReducers(
  { app, stats }
);

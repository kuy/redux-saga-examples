import { combineReducers } from 'redux';
import {
  NEW_JOB, RUN_JOB, SUCCESS_JOB, FAILURE_JOB,
  TOGGLE_PRODUCER, INCREMENT_LIMIT, DECREMENT_LIMIT
} from './actions';
import * as throttleSelector from './selectors/throttle';

const initial = {
  app: {
    producer: true
  },
  throttle: {
    jobs: [],
    limit: 3
  },
};

function swapJob(list, newJob) {
  let pos = list.findIndex(job => job.id === newJob.id);
  return [ ...list.slice(0, pos), newJob, ...list.slice(pos + 1) ];
}

const handlers = {
  app: {
    [TOGGLE_PRODUCER]: state => {
      return { ...state, producer: !state.producer };
    },
  },
  throttle: {
    [NEW_JOB]: (state, action) => {
      return { ...state, jobs: [ ...state.jobs, action.payload ] };
    },
    [RUN_JOB]: (state, action) => {
      const job = throttleSelector.job(action.payload.id)({ throttle: state });
      const newJob = { ...job, status: 'running' };
      return { ...state, jobs: swapJob(state.jobs, newJob) };
    },
    [SUCCESS_JOB]: (state, action) => {
      const job = throttleSelector.job(action.payload.id)({ throttle: state });
      const newJob = { ...job, status: 'success' };
      return { ...state, jobs: swapJob(state.jobs, newJob) };
    },
    [FAILURE_JOB]: (state, action) => {
      const job = throttleSelector.job(action.payload.id)({ throttle: state });
      const newJob = { ...job, status: 'failure' };
      return { ...state, jobs: swapJob(state.jobs, newJob) };
    },
    [INCREMENT_LIMIT]: state => {
      return { ...state, limit: state.limit + 1 };
    },
    [DECREMENT_LIMIT]: state => {
      if (0 < state.limit) {
        return { ...state, limit: state.limit - 1 };
      } else {
        return state;
      }
    }
  }
};

function throttle(state = initial.throttle, action) {
  const handler = handlers.throttle[action.type];
  if (!handler) { return state; }
  return handler(state, action);
}

function app(state = initial.app, action) {
  const handler = handlers.app[action.type];
  if (!handler) { return state; }
  return handler(state, action);
}

export default combineReducers(
  { app, throttle }
);

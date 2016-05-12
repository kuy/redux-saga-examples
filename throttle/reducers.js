import { combineReducers } from 'redux';
import {
  NEW_JOB, RUN_JOB, SUCCESS_JOB, FAILURE_JOB
} from './actions';

const initial = {
  jobs: []
};

function getJob(list, id) {
  const jobs = list.filter(job => job.id === id);
  if (jobs.length !== 1) {
    throw `ERROR: JOB #${id} not found`
  }
  return jobs[0];
}

function swapJob(list, newJob) {
  let pos = list.findIndex(job => job.id === newJob.id);
  return [ ...list.slice(0, pos), newJob, ...list.slice(pos + 1) ];
}

const handlers = {
  jobs: {
    [NEW_JOB]: (state, action) => {
      return [ ...state, action.payload ];
    },
    [RUN_JOB]: (state, action) => {
      const job = getJob(state, action.payload.id);
      const newJob = { ...job, status: 'running' };
      return swapJob(state, newJob);
    },
    [SUCCESS_JOB]: (state, action) => {
      const job = getJob(state, action.payload.id);
      const newJob = { ...job, status: 'success' };
      return swapJob(state, newJob);
    },
    [FAILURE_JOB]: (state, action) => {
      const job = getJob(state, action.payload.id);
      const newJob = { ...job, status: 'failure' };
      return swapJob(state, newJob);
    },
  }
};

function jobs(state = initial.jobs, action) {
  const handler = handlers.jobs[action.type];
  if (!handler) { return state; }
  return handler(state, action);
}

export default combineReducers(
  { jobs }
);

import { delay } from 'redux-saga';
import { call, put, fork, take, select } from 'redux-saga/effects';
import {
  REQUEST_SOMETHING, SUCCESS_SOMETHING, FAILURE_SOMETHING,
  NEW_JOB, SUCCESS_JOB, FAILURE_JOB,
  newJob, runJob, successJob, failureJob,
  successSomething, failureSomething
} from './actions';

const newId = (() => {
  let n = 0;
  return () => n++;
})();

function something() {
  return new Promise(resolve => {
    const duration = 1000 + Math.floor(Math.random() * 1500);
    setTimeout(() => {
      resolve({ data: duration });
    }, duration);
  });
}

function* runSomething(text) {
  const { data, error } = yield call(something);
  if (data && !error) {
    yield put(successSomething({ data }));
  } else {
    yield put(failureSomething({ error }));
  }
}

function* withThrottle(job, ...args) {
  const id = newId();
  yield put(newJob({ id, status: 'pending', job, args }));
}

const numOfRunning = state => state.jobs.filter(j => j.status === 'running').length;
const pending = state => state.jobs.filter(j => j.status === 'pending');

function* handleThrottle() {
  const LIMIT = 3;
  while (true) {
    yield take([NEW_JOB, SUCCESS_JOB, FAILURE_JOB]);

    const jobs = yield select(pending);
    if (jobs.length === 0) {
      continue; // No pending jobs
    }

    const num = yield select(numOfRunning);
    if (LIMIT <= num) {
      continue; // No rooms to run job
    }

    const job = jobs[0];
    const task = yield fork(function* () {
      yield call(job.job, ...job.args);
      yield put(successJob({ id: job.id }));
    });
    yield put(runJob({ id: job.id, task }));
  }
}

function* handleRequestSomething() {
  while (true) {
    yield take(REQUEST_SOMETHING);
    yield fork(withThrottle, runSomething);
  }
}

export default function* rootSaga() {
  yield fork(handleRequestSomething);
  yield fork(handleThrottle);
}

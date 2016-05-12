import { call, put, fork, take, select } from 'redux-saga/effects';
import {
  REQUEST_SOMETHING, INCREMENT_LIMIT,
  NEW_JOB, RUN_JOB, SUCCESS_JOB, FAILURE_JOB,
  newJob, runJob, successJob, successSomething, failureSomething
} from './actions';
import * as throttleSelector from './selectors/throttle';

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

function* handleThrottle() {
  while (true) {
    yield take([NEW_JOB, RUN_JOB, SUCCESS_JOB, FAILURE_JOB, INCREMENT_LIMIT]);
    while (true) {
      const jobs = yield select(throttleSelector.pending);
      if (jobs.length === 0) {
        break; // No pending jobs
      }

      const limit = yield select(throttleSelector.limit);
      const num = yield select(throttleSelector.numOfRunning);
      if (limit <= num) {
        break; // No rooms to run job
      }

      const job = jobs[0];
      const task = yield fork(function* () {
        yield call(job.job, ...job.args);
        yield put(successJob({ id: job.id }));
      });
      yield put(runJob({ id: job.id, task }));
    }
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

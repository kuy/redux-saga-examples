import { delay } from 'redux-saga';
import { call, put, fork, take, select } from 'redux-saga/effects';
import {
  OFFLINE, ONLINE, INCREMENT, recordStats, increment
} from './actions';

function* workerCounter() {
  while (true) {
    yield call(delay, 1000 + Math.random() * 2000);
    yield put(increment());
  }
}

function* workerMonitor() {
  let prev = (new Date).getTime();
  while (true) {
    yield take(INCREMENT);
    const now = (new Date).getTime()
    yield put(recordStats(now - prev));
    prev = now;
  }
}

function report(count) {
  // NOTE: Dummy. Please replace this with real API call.
  console.log(`Reporter: count=${count}`);
}

function* workerReporter() {
  while (true) {
    yield call(delay, 2000);
    yield call(report, yield select(state => state.app.count));
  }
}

function* launch(workers) {
  for (let worker of workers) {
    yield fork(worker);
  }
}

function* manager() {
  const workers = [workerCounter, workerMonitor, workerReporter];
  while (true) {
    const task = yield fork(launch, workers);
    yield take(OFFLINE);
    task.cancel();
    yield take(ONLINE);
  }
}

export default function* rootSaga() {
  yield fork(manager);
}

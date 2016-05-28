import { delay, eventChannel } from 'redux-saga';
import { call, put, fork, take, select } from 'redux-saga/effects';
import {
  OFFLINE, ONLINE, INCREMENT, recordStats, increment, online, offline
} from './actions';

function* workerCounter() {
  while (true) {
    yield call(delay, 1000 + Math.random() * 2000);
    yield put(increment());
  }
}

function* workerMonitor() {
  while (true) {
    yield take(INCREMENT);
    yield put(recordStats((new Date).getTime()));
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

function createVisibilityChannel() {
  return eventChannel(emit => {
    const change = () => {
      emit(document.hidden);
    };
    document.addEventListener('visibilitychange', change);
    return () => {
      document.removeEventListener('visibilitychange', change);
    };
  });
}

function* watcher() {
  const channel = createVisibilityChannel();
  while (true) {
    const action = (yield take(channel)) ? offline() : online();
    yield put(action);
  }
}

export default function* rootSaga() {
  yield fork(watcher);
  yield fork(manager);
}

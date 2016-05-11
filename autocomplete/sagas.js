import { delay } from 'redux-saga';
import { call, put, fork, take } from 'redux-saga/effects';
import {
  REQUEST_SUGGEST, successSuggest, failureSuggest
} from './actions';
import API from './api';

function* runRequestSuggest(text) {
  const { data, error } = yield call(API.suggest, text);
  if (data && !error) {
    yield put(successSuggest({ data }));
  } else {
    yield put(failureSuggest({ error }));
  }
}

function forkLater(task, ...args) {
  return fork(function* () {
    yield call(delay, 1000);
    yield fork(task, ...args);
  });
}

function* handleRequestSuggest() {
  let task;
  while (true) {
    const { payload } = yield take(REQUEST_SUGGEST);
    if (task && task.isRunning()) {
      task.cancel();
    }
    task = yield forkLater(runRequestSuggest, payload);
  }
}

export default function* rootSaga() {
  yield fork(handleRequestSuggest);
}

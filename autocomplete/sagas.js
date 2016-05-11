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

function* handleRequestSuggest() {
  while (true) {
    const { payload } = yield take(REQUEST_SUGGEST);
    yield fork(runRequestSuggest, payload);
  }
}

export default function* rootSaga() {
  yield fork(handleRequestSuggest);
}

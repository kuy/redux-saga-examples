import { takeEvery } from 'redux-saga';
import { call, put, fork, take } from 'redux-saga/effects';
import {
  REQUEST_SUGGEST, successSuggest, failureSuggest
} from './actions';
import API from './api';

function* runRequestSuggest(action) {
  const { data, error } = yield call(API.suggest, action.payload);
  if (data && !error) {
    yield put(successSuggest({ data }));
  } else {
    yield put(failureSuggest({ error }));
  }
}

function* handleRequestSuggest() {
  yield* takeEvery(REQUEST_SUGGEST, runRequestSuggest);
}

export default function* rootSaga() {
  yield fork(handleRequestSuggest);
}

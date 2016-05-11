import { call, put, fork, take } from 'redux-saga/effects';
import {
  REQUEST_SUGGEST, successSuggest, failureSuggest
} from './actions';
import API from './api';

function* handleRequestSuggests() {
  while (true) {
    const { payload } = yield take(REQUEST_SUGGEST);
    const { data, error } = yield call(API.suggest, payload);
    if (data && !error) {
      yield put(successSuggest({ data }));
    } else {
      yield put(failureSuggest({ error }));
    }
  }
}

export default function* rootSaga() {
  yield fork(handleRequestSuggests);
}

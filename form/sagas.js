import { call, fork, take, put } from 'redux-saga/effects';
import { REQUEST_SUBMIT, successSubmit, failureSubmit } from './actions';

function submit(data) {
  // Dummy API calling
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ data: 'done' });
    }, 2000);
  })
    .then(data => ({ data }))
    .catch(error => ({ error }));
}

function* handleSubmit() {
  const { payload: { values, resolve, reject } } = yield take(REQUEST_SUBMIT);
  const { data, error } = yield call(submit, values);
  if (data && !error) {
    resolve();
    yield put(successSubmit({ data }));
  } else {
    reject();
    yield put(failureSubmit({ error }));
  }
}

export default function* rootSaga() {
  yield fork(handleSubmit);
}

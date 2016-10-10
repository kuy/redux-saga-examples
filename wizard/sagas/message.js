import { put, call } from 'redux-saga/effects';
import { takeEvery, delay } from 'redux-saga';
import { MESSAGE, messageAdd, messageRemove } from '../actions';

const next = (() => {
  let n = 0;
  return () => n++;
})();

function* handleMessage({ payload }) {
  const id = next();
  yield put(messageAdd({ id, body: payload }));
  yield call(delay, 5000);
  yield put(messageRemove(id));
}

export default function* rootSaga() {
  yield* takeEvery(MESSAGE, handleMessage);
}

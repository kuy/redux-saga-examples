import { call, fork, take, put } from 'redux-saga/effects';

function* check() {
  while (true) {
    yield take(DND_START);

    yield take(DND_HOVER);

    yield take(DND_END);
  }
}

export default function* rootSaga() {
  yield fork(check);
}

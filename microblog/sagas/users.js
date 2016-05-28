import { takeEvery } from 'redux-saga';
import { call, put, fork, take } from 'redux-saga/effects';
import {
  SET_USERNAME, SYNC_ADDED_POST,
  REQUEST_UPSERT_USER, requestUpsertUser, successUpsertUser, failureUpsertUser,
  REQUEST_GET_USER, requestGetUser, successGetUser, failureGetUser
} from '../actions';
import * as db from '../firebase';

function* runUpsert({ payload: { id, username } }) {
  const error = yield call(db.update, 'users', id, { username });
  if (!error) {
    yield put(successUpsertUser());
  } else {
    yield put(failureUpsertUser());
  }
}

function* upsert() {
  yield* takeEvery(REQUEST_UPSERT_USER, runUpsert);
}

function* runGet({ payload: { id } }) {
  const user = yield call(db.get, 'users', id);
  if (user) {
    yield put(successGetUser({ id, data: user }));
  } else {
    yield put(failureGetUser());
  }
}

function* get() {
  yield* takeEvery(REQUEST_GET_USER, runGet);
}

function* triggerUpsertUser() {
  while (true) {
    let { payload: { id, username } } = yield take(SET_USERNAME);
    if (!username || username.length === 0) {
      id = '@@anonymous';
      username = 'Anonymous';
    }
    yield put(requestUpsertUser({ id, username }));
  }
}

function* triggerGetUser() {
  while (true) {
    const { payload: { data } } = yield take(SYNC_ADDED_POST);
    const post = data.val();
    yield put(requestGetUser({ id: post.userId }));
  }
}

export default function* rootSaga() {
  yield fork(upsert);
  yield fork(get);

  yield fork(triggerUpsertUser);
  yield fork(triggerGetUser);
}

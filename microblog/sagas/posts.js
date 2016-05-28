import { takeEvery } from 'redux-saga';
import { take, call, put, fork, select } from 'redux-saga/effects';
import {
  SUCCESS_SIGN_IN,
  REQUEST_CREATE_POST, successCreatePost, failureCreatePost,
  syncAddedPost, syncRemovedPost
} from '../actions';
import * as db from '../firebase';

function* runPostsCreate({ payload: { text } }) {
  const userId = yield select(state => state.app.user);
  const error = yield call(db.create, 'posts', id => {
    return {
      [`/posts/${id}`]: {
        userId,
        body: text,
        likes: {},
        created: (new Date).getTime()
      },
      [`/timeline/${id}`]: true,
    };
  });

  if (!error) {
    yield put(successCreatePost());
  } else {
    yield put(failureCreatePost());
  }
}

function* create() {
  yield* takeEvery(REQUEST_CREATE_POST, runPostsCreate);
}

function* sync() {
  yield fork(db.sync, 'posts', {
    child_added: syncAddedPost,
    child_removed: syncRemovedPost,
  });
}

export default function* rootSaga() {
  // Wait for sign-in
  yield take(SUCCESS_SIGN_IN);

  yield fork(create);
  yield fork(sync);
}

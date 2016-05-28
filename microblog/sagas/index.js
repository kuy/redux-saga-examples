import { fork } from 'redux-saga/effects';
import auth from './auth';
import users from './users';
import posts from './posts';

export default function* rootSaga() {
  yield fork(auth);
  yield fork(users);
  yield fork(posts);
}

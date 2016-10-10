import { fork } from 'redux-saga/effects';
import message from './message';
import wizard from './wizard';

export default function* rootSaga() {
  yield fork(message);
  yield fork(wizard);
}

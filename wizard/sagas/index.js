import { fork } from 'redux-saga/effects';
import wizard from './wizard';

export default function* rootSaga() {
  yield fork(wizard);
}

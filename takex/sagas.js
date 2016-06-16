import { call, put, fork, select, take } from 'redux-saga/effects';

function* takex(pattern) {
  let action;
  while (true) {
    action = yield take('*');
    console.log('takex', action.type);
    if (pattern.test(action.type)) {
      console.log('takex:match', action.type);
      break;
    }
    console.log('takex:ignore', action.type);
  }
  return action;
}

function* handleActions() {
  while (true) {
    const action = yield call(takex, /^FETCH_/);
    console.log('handle', action.type);
  }
}

export default function* rootSaga() {
  yield fork(handleActions);
}

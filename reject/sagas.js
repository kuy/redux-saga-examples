import { takeEvery } from 'redux-saga';
import { call, put, fork, select, take } from 'redux-saga/effects';
import {
  CHANGE_SUBJECT, SUCCESS_UPDATE_SUBJECT, FAILURE_UPDATE_SUBJECT,
  changeSubject, successUpdateSubject, failureUpdateSubject, requestUpdateSubject
} from './actions';

function result(behavior) {
  switch (behavior) {
  case 'success':
    return true;
  case 'failure':
    return false;
  case 'random':
    return 0.5 < Math.random();
  }
}

function updateSubject(subject, behavior) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (result(behavior)) {
        resolve(subject);
      } else {
        reject('Error: Something wrong');
      }
    }, 1000);
  })
    .then(data => ({ data }))
    .catch(error => ({ error }));
}

function* runUpdateSubject({ payload: newSubject, meta }) {
  // Ignore changes from Sagas
  if (meta && meta.source === 'saga') {
    return;
  }

  // Notify we're about to start a request
  yield put(requestUpdateSubject());

  const { behavior } = yield select(state => state.app);
  const { data, error } = yield call(updateSubject, newSubject, behavior);
  if (data && !error) {
    yield put(successUpdateSubject({ data }));
  } else {
    yield put(failureUpdateSubject({ error }));
  }
}

function* handleUpdateSubject() {
  yield* takeEvery(CHANGE_SUBJECT, runUpdateSubject);
}

function* restoreSubject() {
  // Backup initial subject
  let prevSubject = yield select(state => state.post.subject);

  while (true) {
    // Detect success or failure
    const { type, payload } = yield take([SUCCESS_UPDATE_SUBJECT, FAILURE_UPDATE_SUBJECT]);
    if (type === SUCCESS_UPDATE_SUBJECT) {
      // Store new subject for next rollback
      prevSubject = yield select(state => state.post.subject);
    } else {
      // Rollback!
      yield put(changeSubject.fromSaga(prevSubject));
    }
  }
}

export default function* rootSaga() {
  yield fork(restoreSubject);
  yield fork(handleUpdateSubject);
}

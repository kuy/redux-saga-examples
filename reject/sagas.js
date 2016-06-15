import { takeEvery } from 'redux-saga';
import { call, put, fork, select } from 'redux-saga/effects';
import {
  REQUEST_UPDATE_SUBJECT, changeSubject, successUpdateSubject, failureUpdateSubject
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

function* runUpdateSubject({ payload }) {
  // Backup current subject as prev subject for restoring later if needed
  const { subject: prevSubject } = yield select(state => state.post);

  // Change to new subject immediately for UX
  const newSubject = payload.subject;
  yield put(changeSubject(newSubject));

  const { behavior } = yield select(state => state.app);
  const { data, error } = yield call(updateSubject, newSubject, behavior);
  if (data && !error) {
    yield put(successUpdateSubject({ data }));

    // Nothing to do here, because new subject is already set
  } else {
    yield put(failureUpdateSubject({ error }));

    // Rollback to previous subject
    console.log('rollback', prevSubject);
    yield put(changeSubject(prevSubject));
  }
}

function* handleUpdateSubject() {
  yield* takeEvery(REQUEST_UPDATE_SUBJECT, runUpdateSubject);
}

export default function* rootSaga() {
  yield fork(handleUpdateSubject);
}

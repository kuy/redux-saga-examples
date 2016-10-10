import { call, fork, take, select, put, cancel } from 'redux-saga/effects';
import {
  WIZARD_FORWARD, WIZARD_BACKWARD, WIZARD_ERROR, UPDATE_PAGE,
  wizardForward, wizardError, updatePage, updateNavigation, changeToken, message
} from '../actions';
import * as API from '../api';

const EMAIL_PATTERN = /^\w+@\w+\.\w+$/;

// Determine status of Next/Back buttons
export function* handleNavigation() {
  while (true) {
    // Detect chages of something
    yield take('*');

    // Do validation based on current page and update navigation buttons
    const { page } = yield select(state => state.app);
    const buttons = { forward: false, backward: false };
    switch (page) {
      case 'start':
        const { email } = yield select(state => state.data);
        if (typeof email === 'string' && EMAIL_PATTERN.test(email)) {
          buttons.forward = true;
        }
        break;
      case 'verify':
        buttons.backward = true;
        break;
      case 'pay':
        buttons.backward = true;
        break;
      default:
        continue;
    }

    // Update button states
    yield put(updateNavigation(buttons));
  }
}

// Describe workflow between pages
export function* handleTransition() {
  while (true) {
    const { type, payload } = yield take([WIZARD_FORWARD, WIZARD_BACKWARD, WIZARD_ERROR]);
    const { page } = yield select(state => state.app);
    switch (page) {
      case 'start':
        if (type === WIZARD_FORWARD) {
          yield put(updatePage('verify'));
        } else {
          // No previous page
        }
        break;
      case 'verify':
        if (type === WIZARD_FORWARD) {
          yield put(updatePage('pay'));
        } else {
          yield put(updatePage('start'));
        }
        break;
      case 'pay':
        if (type === WIZARD_FORWARD) {
          // NOT IMPLEMENTED
        } else {
          yield put(updatePage('start'));
        }
        break;
    }
  }
}

function* processVerification() {
  const { email } = yield select(state => state.data);
  const { data: token, error } = yield call(API.verify, email);
  if (token && !error) {
    yield put(message('Success Verification'));
    yield put(changeToken(token));

    // Forward automatically (same effect as clicking 'Next' button)
    yield put(wizardForward());
  } else {
    yield put(message('Error Verification'));
    yield put(wizardError(error));
  }
}

// Describe reactions on change pages
export function* handleReaction() {
  let task;
  while (true) {
    const { payload: page } = yield take(UPDATE_PAGE);

    // Cancel ongoing process if exists
    if (task && task.isRunning()) {
      yield cancel(task);
      yield put(message('Cancelled'));
    }

    switch (page) {
      case 'verify':
        // Store return value of yield for task cancellation
        task = yield fork(processVerification);
        break;
    }
  }
}

export function* triggerWizard() {
  yield put({ type: '__WIZARD__' });
}

export default function* rootSaga() {
  yield fork(handleNavigation);
  yield fork(handleTransition);
  yield fork(handleReaction);

  // Just trigger 'handleNavigation' saga
  yield fork(triggerWizard);
}

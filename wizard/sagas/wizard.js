import { call, fork, take, select, put } from 'redux-saga/effects';
import { WIZARD_FORWARD, WIZARD_BACKWARD, updatePage, updateNavigation } from '../actions';

export function* handleValidation() {
  while (true) {
    // Detect chages of something
    yield take('*');

    // Do validation based on current page and update navigation buttons
    const { page } = yield select(state => state.app);
    switch (page) {
      case 'start':
        yield put(updateNavigation({ forward: true, backward: false }));
        break;
      case 'verify':
        yield put(updateNavigation({ forward: false, backward: true }));
        break;
    }
  }
}

export function* handleNavigation() {
  while (true) {
    const { type, payload } = yield take([WIZARD_FORWARD, WIZARD_BACKWARD]);
    const { page } = yield select(state => state.app);
    switch (page) {
      case 'start':
        if (type === WIZARD_FORWARD) {
          yield put(updatePage('verify'));
        }
        break;
      case 'verify':
        if (type === WIZARD_FORWARD) {
          // NOP
        } else {
          yield put(updatePage('start'));
        }
        break;
    }
  }
}

export function* triggerWizard() {
  // Just trigger 'handleValidation' saga
  yield put({ type: 'WIZARD_INIT' });
}

export default function* rootSaga() {
  yield fork(handleValidation);
  yield fork(handleNavigation);
  yield fork(triggerWizard);
}

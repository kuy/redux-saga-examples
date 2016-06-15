import { createAction } from 'redux-actions';

export const CHANGE_BEHAVIOR = 'CHANGE_BEHAVIOR';
export const changeBehavior = createAction(CHANGE_BEHAVIOR);

export const CHANGE_SUBJECT = 'CHANGE_SUBJECT';
const changeSubject = createAction(CHANGE_SUBJECT);
changeSubject.fromSaga = createAction(CHANGE_SUBJECT, a => a, () => ({ source: 'saga' }));
export { changeSubject };

export const REQUEST_UPDATE_SUBJECT = 'REQUEST_UPDATE_SUBJECT';
export const SUCCESS_UPDATE_SUBJECT = 'SUCCESS_UPDATE_SUBJECT';
export const FAILURE_UPDATE_SUBJECT = 'FAILURE_UPDATE_SUBJECT';
export const requestUpdateSubject = createAction(REQUEST_UPDATE_SUBJECT);
export const successUpdateSubject = createAction(SUCCESS_UPDATE_SUBJECT);
export const failureUpdateSubject = createAction(FAILURE_UPDATE_SUBJECT);

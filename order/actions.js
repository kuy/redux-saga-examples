import { createAction } from 'redux-actions';

export const REQUEST_SOMETHING = 'REQUEST_SOMETHING';
export const SUCCESS_SOMETHING = 'SUCCESS_SOMETHING';
export const FAILURE_SOMETHING = 'FAILURE_SOMETHING';
export const requestSomething = createAction(REQUEST_SOMETHING);
export const successSomething = createAction(SUCCESS_SOMETHING);
export const failureSomething = createAction(FAILURE_SOMETHING);

import { createAction } from 'redux-actions';

export const REQUEST_SUBMIT = 'REQUEST_SUBMIT';
export const SUCCESS_SUBMIT = 'SUCCESS_SUBMIT';
export const FAILURE_SUBMIT = 'FAILURE_SUBMIT';
export const requestSubmit = createAction(REQUEST_SUBMIT);
export const successSubmit = createAction(SUCCESS_SUBMIT);
export const failureSubmit = createAction(FAILURE_SUBMIT);

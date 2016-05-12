import { createAction } from 'redux-actions';

export const REQUEST_SOMETHING = 'REQUEST_SOMETHING';
export const SUCCESS_SOMETHING = 'SUCCESS_SOMETHING';
export const FAILURE_SOMETHING = 'FAILURE_SOMETHING';
export const requestSomething = createAction(REQUEST_SOMETHING);
export const successSomething = createAction(SUCCESS_SOMETHING);
export const failureSomething = createAction(FAILURE_SOMETHING);

export const NEW_JOB = 'NEW_JOB';
export const RUN_JOB = 'RUN_JOB';
export const SUCCESS_JOB = 'SUCCESS_JOB';
export const FAILURE_JOB = 'FAILURE_JOB';
export const newJob = createAction(NEW_JOB);
export const runJob = createAction(RUN_JOB);
export const successJob = createAction(SUCCESS_JOB);
export const failureJob = createAction(FAILURE_JOB);

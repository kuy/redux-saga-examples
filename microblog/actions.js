import { createAction } from 'redux-actions';

export const REQUEST_SIGN_IN = 'REQUEST_SIGN_IN';
export const SUCCESS_SIGN_IN = 'SUCCESS_SIGN_IN';
export const FAILURE_SIGN_IN = 'FAILURE_SIGN_IN';
export const requestSignIn = createAction(REQUEST_SIGN_IN);
export const successSignIn = createAction(SUCCESS_SIGN_IN);
export const failureSignIn = createAction(FAILURE_SIGN_IN);

export const REQUEST_USERNAME = 'REQUEST_USERNAME';
export const SET_USERNAME = 'SET_USERNAME';
export const requestUsername = createAction(REQUEST_USERNAME);
export const setUsername = createAction(SET_USERNAME);

export const REQUEST_UPSERT_USER = 'REQUEST_UPSERT_USER';
export const SUCCESS_UPSERT_USER = 'SUCCESS_UPSERT_USER';
export const FAILURE_UPSERT_USER = 'FAILURE_UPSERT_USER';
export const requestUpsertUser = createAction(REQUEST_UPSERT_USER);
export const successUpsertUser = createAction(SUCCESS_UPSERT_USER);
export const failureUpsertUser = createAction(FAILURE_UPSERT_USER);

export const REQUEST_GET_USER = 'REQUEST_GET_USER';
export const SUCCESS_GET_USER = 'SUCCESS_GET_USER';
export const FAILURE_GET_USER = 'FAILURE_GET_USER';
export const requestGetUser = createAction(REQUEST_GET_USER);
export const successGetUser = createAction(SUCCESS_GET_USER);
export const failureGetUser = createAction(FAILURE_GET_USER);

export const REQUEST_CREATE_POST = 'REQUEST_CREATE_POST';
export const SUCCESS_CREATE_POST = 'SUCCESS_CREATE_POST';
export const FAILURE_CREATE_PORT = 'FAILURE_CREATE_PORT';
export const requestCreatePost = createAction(REQUEST_CREATE_POST);
export const successCreatePost = createAction(SUCCESS_CREATE_POST);
export const failureCreatePost = createAction(FAILURE_CREATE_PORT);

export const SYNC_ADDED_POST = 'SYNC_ADDED_POST';
export const SYNC_REMOVED_POST = 'SYNC_REMOVED_POST';
export const syncAddedPost = createAction(SYNC_ADDED_POST);
export const syncRemovedPost = createAction(SYNC_REMOVED_POST);

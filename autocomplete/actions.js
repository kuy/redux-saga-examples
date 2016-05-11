import { createAction } from 'redux-actions';

export const REQUEST_SUGGEST = 'REQUEST_SUGGEST';
export const SUCCESS_SUGGEST = 'SUCCESS_SUGGEST';
export const FAILURE_SUGGEST = 'FAILURE_SUGGEST';
export const requestSuggest = createAction(REQUEST_SUGGEST);
export const successSuggest = createAction(SUCCESS_SUGGEST);
export const failureSuggest = createAction(FAILURE_SUGGEST);

export const CLEAR_SUGGESTS = 'CLEAR_SUGGESTS';
export const clearSuggests = createAction(CLEAR_SUGGESTS);

export const SET_KEYWORD = 'SET_KEYWORD';
export const CLEAR_KEYWORD = 'CLEAR_KEYWORD';
export const setKeyword = createAction(SET_KEYWORD);
export const clearKeyword = createAction(CLEAR_KEYWORD);

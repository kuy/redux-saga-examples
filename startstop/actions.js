import { createAction } from 'redux-actions';

export const ONLINE = 'ONLINE';
export const OFFLINE = 'OFFLINE';
export const online = createAction(ONLINE);
export const offline = createAction(OFFLINE);

export const INCREMENT = 'INCREMENT';
export const increment = createAction(INCREMENT);

export const RECORD_STATS = 'RECORD_STATS';
export const recordStats = createAction(RECORD_STATS);

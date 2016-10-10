import { createAction } from 'redux-actions';

export const WIZARD_FORWARD = 'WIZARD_FORWARD';
export const WIZARD_BACKWARD = 'WIZARD_BACKWARD';
export const WIZARD_ERROR = 'WIZARD_ERROR';
export const wizardForward = createAction(WIZARD_FORWARD);
export const wizardBackward = createAction(WIZARD_BACKWARD);
export const wizardError = createAction(WIZARD_ERROR);

export const UPDATE_PAGE = 'UPDATE_PAGE';
export const UPDATE_NAVIGATION = 'UPDATE_NAVIGATION';
export const updatePage = createAction(UPDATE_PAGE);
export const updateNavigation = createAction(UPDATE_NAVIGATION);

export const CHANGE_EMAIL = 'CHANGE_EMAIL';
export const CHANGE_TOKEN = 'CHANGE_TOKEN';
export const changeEmail = createAction(CHANGE_EMAIL);
export const changeToken = createAction(CHANGE_TOKEN);

export const MESSAGE = 'MESSAGE';
export const message = createAction(MESSAGE);

export const MESSAGE_ADD = 'MESSAGE_ADD';
export const MESSAGE_REMOVE = 'MESSAGE_REMOVE';
export const messageAdd = createAction(MESSAGE_ADD);
export const messageRemove = createAction(MESSAGE_REMOVE);

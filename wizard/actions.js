import { createAction } from 'redux-actions';

export const WIZARD_FORWARD = 'WIZARD_FORWARD';
export const WIZARD_BACKWARD = 'WIZARD_BACKWARD';
export const wizardForward = createAction(WIZARD_FORWARD);
export const wizardBackward = createAction(WIZARD_BACKWARD);

export const UPDATE_PAGE = 'UPDATE_PAGE';
export const UPDATE_NAVIGATION = 'UPDATE_NAVIGATION';
export const updatePage = createAction(UPDATE_PAGE);
export const updateNavigation = createAction(UPDATE_NAVIGATION);

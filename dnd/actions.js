import { createAction } from 'redux-actions';

export const DND_START = 'DND_START';
export const DND_HOVER = 'DND_HOVER';
export const DND_LEAVE = 'DND_LEAVE';
export const DND_END = 'DND_END';
export const dndStart = createAction(DND_START);
export const dndHover = createAction(DND_HOVER);
export const dndLeave = createAction(DND_LEAVE);
export const dndEnd = createAction(DND_END);

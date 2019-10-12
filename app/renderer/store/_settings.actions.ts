/** TYPES */
import {
    IUpdateStatus,
    Theme,
} from '../types';
import {
    Actions,
    ActionTypes,
} from './_settings.reducer';

/************************** ACTIONS ************************/
export const setTheme = (theme: Theme): ActionTypes => ({
    payload: { theme },
    type: Actions.SET_THEME,
});

export const attemptedUpdate = (): ActionTypes => ({
    type: Actions.ATTEMPTED_UPDATE,
});

export const setUpdateStatus = (status: IUpdateStatus): ActionTypes => ({
    payload: { status },
    type: Actions.SET_UPDATE_STATUS,
});

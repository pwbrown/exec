/** TYPES */
import {
    IUpdateStatus,
    Theme,
    View,
    WindowMode,
} from 'types';
import {
    Actions,
    ActionTypes,
} from './settings.types';

/************************** ACTIONS ************************/
export const setTheme = (theme: Theme): ActionTypes => ({
    payload: { theme },
    type: Actions.SET_THEME,
});

export const setView = (view: View): ActionTypes => ({
    payload: { view },
    type: Actions.SET_VIEW,
});

export const attemptedUpdate = (): ActionTypes => ({
    type: Actions.ATTEMPTED_UPDATE,
});

export const setUpdateStatus = (status: IUpdateStatus): ActionTypes => ({
    payload: { status },
    type: Actions.SET_UPDATE_STATUS,
});

export const setWindowMode = (windowMode: WindowMode): ActionTypes => ({
    payload: { windowMode },
    type: Actions.SET_WINDOW_MODE,
});

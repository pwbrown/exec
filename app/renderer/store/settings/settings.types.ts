/** TYPES */
import {
    IAction,
    IPayload,
    IUpdateStatus,
    Theme,
    View,
    WindowMode,
} from 'types';

/** State */
export interface IState {
    theme: Theme;
    windowMode: WindowMode;
    view: View;
    attemptedUpdate: boolean;
    updateStatus: IUpdateStatus;
}

/** Actions */
export enum Actions {
    SET_THEME = 'SET_THEME',
    SET_VIEW = 'SET_VIEW',
    ATTEMPTED_UPDATE = 'ATTEMPTED_UPDATE',
    SET_UPDATE_STATUS = 'SET_UPDATE_STATUS',
    SET_WINDOW_MODE = 'SET_WINDOW_MODE',
}

/** Combined Action Types */
export type ActionTypes =
    IPayload<Actions.SET_THEME, { theme: Theme}> |
    IPayload<Actions.SET_VIEW, { view: View }> |
    IAction<Actions.ATTEMPTED_UPDATE> |
    IPayload<Actions.SET_UPDATE_STATUS, { status: IUpdateStatus }> |
    IPayload<Actions.SET_WINDOW_MODE, { windowMode: WindowMode }>;

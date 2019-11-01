/** ELECTRON */
import { ipcRenderer as ipc } from 'electron';

/** TYPES */
import {
    IAction,
    IPayload,
    IUpdateStatus,
    Theme,
    View,
} from '../types';

/** State */
interface IState {
    theme: Theme;
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
}

/** Combined Action Types */
export type ActionTypes =
    IPayload<Actions.SET_THEME, { theme: Theme}> |
    IPayload<Actions.SET_VIEW, { view: View }> |
    IAction<Actions.ATTEMPTED_UPDATE> |
    IPayload<Actions.SET_UPDATE_STATUS, { status: IUpdateStatus }>;

/** Initial State */
const initialState: IState = {
    attemptedUpdate: false,
    theme: ipc.sendSync('settingsSync:get', 'theme') || Theme.LIGHT,
    updateStatus: {
        available: false,
        checking: false,
        next: null,
        progress: null,
    },
    view: View.COMMAND_LIST,
};

/** Reducer */
export const reducer = (
    state: IState = initialState,
    action: ActionTypes,
): IState => {
    switch (action.type) {
        case Actions.SET_THEME:
            ipc.sendSync('settingsSync:set', 'theme', action.payload.theme);
            return { ...state, theme: action.payload.theme };
        case Actions.SET_VIEW:
            return { ...state, view: action.payload.view };
        case Actions.ATTEMPTED_UPDATE:
            return { ...state, attemptedUpdate: true };
        case Actions.SET_UPDATE_STATUS:
            return { ...state, updateStatus: action.payload.status };
        default:
            return state;
    }
};

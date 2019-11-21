/** TYPES */
import {
    Theme,
    View,
    WindowMode,
} from '../../types';
import {
    Actions,
    ActionTypes,
    IState,
} from './settings.types';

/** ELECTRON */
import { ipcRenderer as ipc } from 'electron';

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
    windowMode: ipc.sendSync('windowSync:getMode') || WindowMode.DEFAULT,
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
        case Actions.SET_WINDOW_MODE:
            return { ...state, windowMode: action.payload.windowMode };
        default:
            return state;
    }
};

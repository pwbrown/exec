/** ELECTRON */
import { ipcRenderer as ipc } from 'electron';

/** TYPES */
import {
    AppActions,
    AppActionTypes,
    IAppState,
} from '../types';

/** THE INITIAL STATE OF THE APPLICATION */
const initialAppState: IAppState = {
    commands: ipc.sendSync('commandsSync:get') || [],
    help: false,
    theme: ipc.sendSync('themeSync:get') || 'light',
};

export const AppReducer = (
    state: IAppState = initialAppState,
    action: AppActionTypes,
): IAppState => {
    switch (action.type) {
        case AppActions.TOGGLE_HELP:
            return { ...state, help: !state.help };
        case AppActions.SET_THEME:
            return { ...state, theme: action.payload.theme };
        case AppActions.ADD_COMMAND:
            return {
                ...state,
                commands: [
                    ...state.commands,
                    action.payload.command,
                ],
            };
        case AppActions.UPDATE_COMMAND:
            return {
                ...state,
                commands: [
                    ...state.commands.slice(0, action.payload.index),
                    action.payload.command,
                    ...state.commands.slice(action.payload.index + 1),
                ],
            };
        case AppActions.REMOVE_COMMAND:
            return {
                ...state,
                commands: [
                    ...state.commands.slice(0, action.payload.index),
                    ...state.commands.slice(action.payload.index + 1),
                ],
            };
        default:
            return state;
    }
};

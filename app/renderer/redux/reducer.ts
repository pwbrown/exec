/** ELECTRON */
import { ipcRenderer as ipc } from 'electron';

/** TYPES */
import { ICommand } from '../utils/types';
import { Actions, ActionTypes, IAppState } from './types';

/** HELPERS */
const EMPTY_COMMAND: ICommand = {
    command: '',
    label: '',
};

/** DEFAULT/INITIAL STATE OF THE APPLICATION */
const initialState: IAppState = {
    command: { ...EMPTY_COMMAND },
    commands: ipc.sendSync('commandsSync:get') || [],
    creating: false,
    editor: false,
    help: false,
    index: 0,
    theme: ipc.sendSync('themeSync:get') || 'light',
    update: {
        attempted: false,
        available: false,
        checking: false,
        next: null,
        progress: null,
    },
    updater: false,
};

export const reducer = (
    state: IAppState = initialState,
    action: ActionTypes,
): IAppState => {
    switch (action.type) {
        case Actions.CREATE_COMMAND:
            return {
                ...state,
                command: { ...EMPTY_COMMAND },
                creating: true,
                editor: true,
            };
        case Actions.CANCEL_EDIT:
            return {
                ...state,
                editor: false,
            };
        case Actions.TOGGLE_HELP:
            return { ...state, help: !state.help };
        case Actions.TOGGLE_UPDATE:
            return { ...state, updater: !state.updater };
        case Actions.SAVE_COMMAND:
            let newState: IAppState;
            if (state.creating) {
                newState = {
                    ...state,
                    commands: [ ...state.commands, state.command ],
                    editor: false,
                };
            } else {
                newState = {
                    ...state,
                    commands: [
                        ...state.commands.slice(0, state.index),
                        state.command,
                        ...state.commands.slice(state.index + 1),
                    ],
                    editor: false,
                };
            }
            ipc.sendSync('commandsSync:set', newState.commands);
            return newState;
        case Actions.EDIT_COMMAND:
            const command = action.payload.index < state.commands.length ?
                state.commands[action.payload.index] : { ...EMPTY_COMMAND };
            return {
                ...state,
                command,
                creating: false,
                editor: true,
                index: action.payload.index,
            };
        case Actions.REMOVE_COMMAND:
            const removeState: IAppState = {
                ...state,
                commands: [
                    ...state.commands.slice(0, action.payload.index),
                    ...state.commands.slice(action.payload.index + 1),
                ],
            };
            ipc.sendSync('commandsSync:set', removeState.commands);
            return removeState;
        case Actions.UPDATE_CURRENT_LABEL:
            return {
                ...state,
                command: {
                    ...state.command,
                    label: action.payload.label,
                },
            };
        case Actions.UPDATE_CURRENT_COMMAND:
            return {
                ...state,
                command: {
                    ...state.command,
                    command: action.payload.command,
                },
            };
        case Actions.UPDATE_STATUS:
            return { ...state, update: { ...state.update, ...action.payload.update }};
        case Actions.UPDATE_THEME:
            return { ...state, theme: action.payload.theme };
        default:
            return state;
    }
};

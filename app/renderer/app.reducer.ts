/**
 * APP REDUX REDUCER
 */

/** DEPENDENCIES */
import { ipcRenderer as ipc } from "electron";
import {
    IAction,
    ICommand,
    IPayload,
} from "./types";

/** SHAPE OF THE APPLICATION STATE */
export interface IAppState {
    /** All of the commands saved */
    commands: ICommand[];
    /** The state of the command displayed in the editor */
    command: ICommand;
    /** The index of the command loaded into the editor */
    index: number;
    /** Whether the editor is handling creating or editing */
    creating: boolean;
    /** Whether the editor is displayed */
    editor: boolean;
    /** Whether the help dialog is displayed */
    help: boolean;
}

/** HELPERS */
const EMPTY_COMMAND: ICommand = {
    command: "",
    label: "",
};

/** DEFAULT/INITIAL STATE OF THE APPLICATION */
const initialState: IAppState = {
    command: { ...EMPTY_COMMAND },
    commands: ipc.sendSync("commandsSync:get") || [],
    creating: false,
    editor: false,
    help: false,
    index: 0,
};

/** ALL ACTIONS TO INTERACT WITH STATE */
enum Actions {
    CANCEL_EDIT = "CANCEL_EDIT",
    CREATE_COMMAND = "CREATE_COMMAND",
    EDIT_COMMAND = "EDIT_COMMAND",
    SAVE_COMMAND = "SAVE_COMMAND",
    TOGGLE_HELP = "TOGGLE_HELP",
    UPDATE_CURRENT_LABEL = "UPDATE_CURRENT_LABEL",
    UPDATE_CURRENT_COMMAND = "UPDATE_CURRENT_COMMAND",
    REMOVE_COMMAND = "REMOVE_COMMAND",
}

type ActionTypes =
    IAction<Actions.CANCEL_EDIT> |
    IAction<Actions.CREATE_COMMAND> |
    IAction<Actions.SAVE_COMMAND> |
    IAction<Actions.TOGGLE_HELP> |
    IPayload<Actions.EDIT_COMMAND, { index: number }> |
    IPayload<Actions.REMOVE_COMMAND, { index: number}> |
    IPayload<Actions.UPDATE_CURRENT_LABEL, { label: string }> |
    IPayload<Actions.UPDATE_CURRENT_COMMAND, { command: string }>;

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
            ipc.sendSync("commandsSync:set", newState.commands);
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
            ipc.sendSync("commandsSync:set", removeState.commands);
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
        default:
            return state;
    }
};

/** ACTIONS */

export const createCommand = (): ActionTypes => ({ type: Actions.CREATE_COMMAND });

export const cancelEdit = (): ActionTypes => ({ type: Actions.CANCEL_EDIT });

export const saveCommand = (): ActionTypes => ({ type: Actions.SAVE_COMMAND });

export const toggleHelp = (): ActionTypes => ({ type: Actions.TOGGLE_HELP });

export const editCommand = (index: number): ActionTypes => ({
    payload: { index },
    type: Actions.EDIT_COMMAND,
});

export const removeCommand = (index: number): ActionTypes => ({
    payload: { index },
    type: Actions.REMOVE_COMMAND,
});

export const updateCurrentLabel = (label: string): ActionTypes => ({
    payload: { label },
    type: Actions.UPDATE_CURRENT_LABEL,
});

export const updateCurrentCommand = (command: string): ActionTypes => ({
    payload: { command },
    type: Actions.UPDATE_CURRENT_COMMAND,
});

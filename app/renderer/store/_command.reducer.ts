/** TYPES */
import {
    IAction,
    ICommand,
    IPayload,
} from '../types';

/** ELECTRON */
import { ipcRenderer as ipc } from 'electron';

/** State */
interface IState {
    /** Map of commands where the key is the command's id */
    commands: { [id: string]: ICommand };
    /** A resting place for archived commands prior to deleting permanently */
    archive: string[];
    /** The order of appearance for commands in the command list */
    order: string[];
    /** Command Editor State */
    editor: {
        /** Whether to show the command editor */
        show: boolean;
        /** The id of the command being edited or null if creating a new command */
        id: string | null;
    };
}

/** Actions */
export enum Actions {
    CREATE_COMMAND = 'CREATE_COMMAND',
    EDIT_COMMAND = 'EDIT_COMMAND',
    SAVE_COMMAND = 'SAVE_COMMAND',
    ARCHIVE_COMMAND = 'ARCHIVE_COMMAND',
    DELETE_COMMAND = 'DELETE_COMMAND',
    RESTORE_COMMAND = 'RESTORE_COMMAND',
    EXECUTE_COMMAND = 'EXECUTE_COMMAND',
    WIPE_COMMAND_ARCHIVE = 'WIPE_COMMAND_ARCHIVE',
    MOVE_COMMAND = 'MOVE_COMMAND',
    CLOSE_COMMAND_EDITOR = 'CLOSE_COMMAND_EDITOR',
}

/** Combined Action Types */
export type ActionTypes =
    IAction<Actions.CREATE_COMMAND> |
    IPayload<Actions.EDIT_COMMAND, { id: string }> |
    IPayload<Actions.SAVE_COMMAND, { command: ICommand }> |
    IPayload<Actions.ARCHIVE_COMMAND, { id: string }> |
    IPayload<Actions.DELETE_COMMAND, { id: string }> |
    IPayload<Actions.RESTORE_COMMAND, { id: string }> |
    IPayload<Actions.EXECUTE_COMMAND, { id: string }> |
    IAction<Actions.WIPE_COMMAND_ARCHIVE> |
    IPayload<Actions.MOVE_COMMAND, { id: string, to: number }> |
    IAction<Actions.CLOSE_COMMAND_EDITOR>;

/** Initial State */
const initialState: IState = {
    archive: ipc.sendSync('commandsSync:get', 'archive') || [],
    commands: ipc.sendSync('commandsSync:get', 'commands') || {},
    editor: {
        id: null,
        show: false,
    },
    order: ipc.sendSync('commandsSync:get', 'order') || [],
};

/** Reducer */
export const reducer = (
    state: IState = initialState,
    action: ActionTypes,
): IState => {
    /** Reusable vars */
    let id: string; // Command Id
    let ai: number; // Archive index
    let oi: number; // Order index
    let next: IState; // Next State
    let commands: { [id: string]: ICommand }; // Command map
    switch (action.type) {
        case Actions.CREATE_COMMAND:
            return {
                ...state,
                editor: { id: null, show: true },
            };
        case Actions.EDIT_COMMAND:
            return {
                ...state,
                editor: { id: action.payload.id, show: true },
            };
        case Actions.SAVE_COMMAND:
            id = action.payload.command.id;
            const isNew = !state.commands[id];
            next = {
                ...state,
                commands: {
                    ...state.commands,
                    [id]: action.payload.command,
                },
                editor: { id: null, show: false },
                order: isNew ? [ ...state.order, id ] : state.order,
            };
            if (isNew) {
                ipc.sendSync('commandsSync:set', 'order', next.order);
            }
            ipc.sendSync('commandsSync:set', 'commands', next.commands);
            return next;
        case Actions.ARCHIVE_COMMAND:
            oi = state.order.indexOf(action.payload.id);
            next = {
                ...state,
                archive: [ ...state.archive, action.payload.id ],
                order: [ ...state.order.slice(0, oi), ...state.order.slice(oi + 1) ],
            };
            ipc.sendSync('commandsSync:set', 'order', next.order);
            ipc.sendSync('commandsSync:set', 'archive', next.archive);
            return next;
        case Actions.DELETE_COMMAND:
            ai = state.archive.indexOf(action.payload.id);
            commands = state.commands;
            delete commands[action.payload.id];
            next = {
                ...state,
                archive: [ ...state.archive.slice(0, ai), ...state.archive.slice(ai + 1) ],
                commands,
            };
            ipc.sendSync('commandsSync:set', 'archive', next.archive);
            ipc.sendSync('commandsSync:set', 'commands', next.commands);
            return next;
        case Actions.RESTORE_COMMAND:
            ai = state.archive.indexOf(action.payload.id);
            next = {
                ...state,
                archive: [ ...state.archive.slice(0, ai), ...state.archive.slice(ai + 1) ],
                order: [ ...state.order, action.payload.id ],
            };
            ipc.sendSync('commandsSync:set', 'order', next.order);
            ipc.sendSync('commandsSync:set', 'archive', next.archive);
            return next;
        case Actions.EXECUTE_COMMAND:
            id = action.payload.id;
            if ( state.commands[id].script ) {
                ipc.send('commands:execute', state.commands[id].script);
            }
            return state;
        case Actions.WIPE_COMMAND_ARCHIVE:
            commands = state.commands;
            state.archive.forEach((cmdId) => delete commands[cmdId]);
            next = {
                ...state,
                archive: [],
                commands,
            };
            ipc.sendSync('commandsSync:set', 'archive', next.archive);
            ipc.sendSync('commandsSync:set', 'commands', next.commands);
            return next;
        case Actions.CLOSE_COMMAND_EDITOR:
            return { ...state, editor: { ...state.editor, id: null, show: false } };
        case Actions.MOVE_COMMAND:
        default:
            return state;
    }
};

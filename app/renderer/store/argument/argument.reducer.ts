/** TYPES */
import { IArgument } from '../../types';
import {
    Actions,
    ActionTypes,
    IState,
} from './argument.types';

/** ELECTRON */
import { ipcRenderer as ipc } from 'electron';

/** Initial State */
const initialState: IState = {
    archive: ipc.sendSync('argumentsSync:get', 'archive') || [],
    arguments: ipc.sendSync('argumentsSync:get', 'arguments') || {},
    editor: {
        id: null,
        newId: null,
        show: false,
    },
    order: ipc.sendSync('argumentsSync:get', 'order') || [],
};

/** Reducer */
export const reducer = (
    state: IState = initialState,
    action: ActionTypes,
): IState => {
    /** Reusable vars */
    let id: string; // Argument id
    let ai: number; // Archive index
    let oi: number; // Order index
    let next: IState; // Next state
    let args: { [id: string]: IArgument }; // Argument map
    switch (action.type) {
        case Actions.CREATE_ARGUMENT:
            return {
                ...state,
                editor: {
                    ...state.editor,
                    id: null,
                    newId: action.payload.id || null,
                    show: true,
                },
            };
        case Actions.EDIT_ARGUMENT:
            return {
                ...state,
                editor: {
                    ...state.editor,
                    id: action.payload.id,
                    show: true,
                },
            };
        case Actions.SAVE_ARGUMENT:
            id = action.payload.argument.id;
            const isNew = !state.arguments[id];
            next = {
                ...state,
                arguments: {
                    ...state.arguments,
                    [id]: action.payload.argument,
                },
                editor: { ...state.editor, id: null, show: false },
                order: isNew ? [ ...state.order, id ] : state.order,
            };
            if (isNew) {
                ipc.sendSync('argumentsSync:set', 'order', next.order);
            }
            ipc.sendSync('argumentsSync:set', 'arguments', next.arguments);
            return next;
        case Actions.ARCHIVE_ARGUMENT:
            id = action.payload.id;
            oi = state.order.indexOf(id);
            next = {
                ...state,
                archive: [ ...state.archive, id ],
                order: [ ...state.order.slice(0, oi), ...state.order.slice(oi + 1) ],
            };
            ipc.sendSync('argumentsSync:set', 'order', next.order);
            ipc.sendSync('argumentsSync:set', 'archive', next.archive);
            return next;
        case Actions.DELETE_ARGUMENT:
            id = action.payload.id;
            ai = state.archive.indexOf(id);
            args = state.arguments;
            delete args[id];
            next = {
                ...state,
                archive: [ ...state.archive.slice(0, ai), ...state.archive.slice(ai + 1) ],
                arguments: args,
            };
            ipc.sendSync('argumentsSync:set', 'archive', next.archive);
            ipc.sendSync('argumentsSync:set', 'arguments', next.arguments);
            return next;
        case Actions.RESTORE_ARGUMENT:
            id = action.payload.id;
            ai = state.archive.indexOf(id);
            next = {
                ...state,
                archive: [ ...state.archive.slice(0, ai), ...state.archive.slice(ai + 1) ],
                order: [ ...state.order, id ],
            };
            ipc.sendSync('argumentsSync:set', 'order', next.order);
            ipc.sendSync('argumentsSync:set', 'archive', next.archive);
            return next;
        case Actions.WIPE_ARGUMENT_ARCHIVE:
            args = state.arguments;
            state.archive.forEach((argId) => delete args[argId]);
            next = {
                ...state,
                archive: [],
                arguments: args,
            };
            ipc.sendSync('argumentsSync:set', 'archive', next.archive);
            ipc.sendSync('argumentsSync:set', 'arguments', next.arguments);
            return next;
        case Actions.CLOSE_ARGUMENT_EDITOR:
            return {
                ...state,
                editor: {
                    ...state.editor,
                    id: null,
                    show: false,
                },
            };
        case Actions.MOVE_ARGUMENT:
        default:
            return state;
    }
};

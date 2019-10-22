/** TYPES */
import {
    IAction,
    IArgument,
    IPayload,
} from '../types';

/** State */
interface IState {
    /** Map of arguments where the key is the argument's id */
    arguments: { [id: string]: IArgument };
    /** resting place for archived arguments prior to deleting permanently */
    archive: string[];
    /** The order of appearance for arguments in the argument list */
    order: string[];
    /** Argument Editor State */
    editor: {
        /** Whether to show the argument editor */
        show: boolean;
        /** The id of the argument being edited or null if creating a new argument */
        id: string | null;
    };
}

/** Actions */
export enum Actions {
    CREATE_ARGUMENT = 'CREATE_ARGUMENT',
    EDIT_ARGUMENT = 'EDIT_ARGUMENT',
    SAVE_ARGUMENT = 'SAVE_ARGUMENT',
    ARCHIVE_ARGUMENT = 'ARCHIVE_ARGUMENT',
    DELETE_ARGUMENT = 'DELETE_ARGUMENT',
    RESTORE_ARGUMENT = 'RESTORE_ARGUMENT',
    WIPE_ARGUMENT_ARCHIVE = 'WIPE_ARGUMENT_ARCHIVE',
    MOVE_ARGUMENT = 'MOVE_ARGUMENT',
    CLOSE_ARGUMENT_EDITOR = 'CLOSE_ARGUMENT_EDITOR',
}

/** Combined Action Types */
export type ActionTypes =
    IAction<Actions.CREATE_ARGUMENT> |
    IPayload<Actions.EDIT_ARGUMENT, { id: string }> |
    IPayload<Actions.SAVE_ARGUMENT, { argument: IArgument }> |
    IPayload<Actions.ARCHIVE_ARGUMENT, { id: string }> |
    IPayload<Actions.DELETE_ARGUMENT, { id: string }> |
    IPayload<Actions.RESTORE_ARGUMENT, { id: string }> |
    IAction<Actions.WIPE_ARGUMENT_ARCHIVE> |
    IPayload<Actions.MOVE_ARGUMENT, { id: string, to: number }> |
    IAction<Actions.CLOSE_ARGUMENT_EDITOR>;

/** Initial State */
const initialState: IState = {
    archive: [],
    arguments: {},
    editor: {
        id: null,
        show: false,
    },
    order: [],
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
            return next;
        case Actions.ARCHIVE_ARGUMENT:
            id = action.payload.id;
            oi = state.order.indexOf(id);
            next = {
                ...state,
                archive: [ ...state.archive, id ],
                order: [ ...state.order.slice(0, oi), ...state.order.slice(oi + 1) ],
            };
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
            return next;
        case Actions.RESTORE_ARGUMENT:
            id = action.payload.id;
            ai = state.archive.indexOf(id);
            next = {
                ...state,
                archive: [ ...state.archive.slice(0, ai), ...state.archive.slice(ai + 1) ],
                order: [ ...state.order, id ],
            };
            return next;
        case Actions.WIPE_ARGUMENT_ARCHIVE:
            args = state.arguments;
            state.archive.forEach((argId) => delete args[argId]);
            next = {
                ...state,
                archive: [],
                arguments: args,
            };
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

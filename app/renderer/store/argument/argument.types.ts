/** TYPES */
import {
    IAction,
    IArgument,
    IPayload,
} from 'types';

/** State */
export interface IState {
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
        /** The suggested id for the new argument being created */
        newId: string | null;
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
    IPayload<Actions.CREATE_ARGUMENT, { id?: string }> |
    IPayload<Actions.EDIT_ARGUMENT, { id: string }> |
    IPayload<Actions.SAVE_ARGUMENT, { argument: IArgument }> |
    IPayload<Actions.ARCHIVE_ARGUMENT, { id: string }> |
    IPayload<Actions.DELETE_ARGUMENT, { id: string }> |
    IPayload<Actions.RESTORE_ARGUMENT, { id: string }> |
    IAction<Actions.WIPE_ARGUMENT_ARCHIVE> |
    IPayload<Actions.MOVE_ARGUMENT, { id: string, to: number }> |
    IAction<Actions.CLOSE_ARGUMENT_EDITOR>;

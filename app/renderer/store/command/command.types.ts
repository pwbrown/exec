/** TYPES */
import {
    IAction,
    ICommand,
    IPayload,
} from 'types';

/** State */
export interface IState {
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
    IAction<Actions.WIPE_COMMAND_ARCHIVE> |
    IPayload<Actions.MOVE_COMMAND, { id: string, to: number }> |
    IAction<Actions.CLOSE_COMMAND_EDITOR>;

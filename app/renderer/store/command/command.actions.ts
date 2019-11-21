/** TYPES */
import { ICommand } from '../../types';
import {
    Actions,
    ActionTypes,
} from './command.types';

/************************** ACTIONS ************************/
export const archiveCommand = (id: string): ActionTypes => ({
    payload: { id },
    type: Actions.ARCHIVE_COMMAND,
});

export const createCommand = (): ActionTypes => ({
    type: Actions.CREATE_COMMAND,
});

export const deleteCommand = (id: string): ActionTypes => ({
    payload: { id },
    type: Actions.DELETE_COMMAND,
});

export const editCommand = (id: string): ActionTypes => ({
    payload: { id },
    type: Actions.EDIT_COMMAND,
});

export const moveCommand = (id: string, to: number): ActionTypes => ({
    payload: { id, to },
    type: Actions.MOVE_COMMAND,
});

export const restoreCommand = (id: string): ActionTypes => ({
    payload: { id },
    type: Actions.RESTORE_COMMAND,
});

export const saveCommand = (command: ICommand): ActionTypes => ({
    payload: { command },
    type: Actions.SAVE_COMMAND,
});

export const wipeCommandArchive = (): ActionTypes => ({
    type: Actions.WIPE_COMMAND_ARCHIVE,
});

export const closeCommandEditor = (): ActionTypes => ({
    type: Actions.CLOSE_COMMAND_EDITOR,
});

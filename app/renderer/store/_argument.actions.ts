/** TYPES */
import { IArgument } from '../types';
import {
    Actions,
    ActionTypes,
} from './_argument.reducer';

/************************** ACTIONS ************************/
export const createArgument = (): ActionTypes => ({
    type: Actions.CREATE_ARGUMENT,
});

export const editArgument = (id: string): ActionTypes => ({
    payload: { id },
    type: Actions.EDIT_ARGUMENT,
});

export const saveArgument = (argument: IArgument): ActionTypes => ({
    payload: { argument },
    type: Actions.SAVE_ARGUMENT,
});

export const archiveArgument = (id: string): ActionTypes => ({
    payload: { id },
    type: Actions.ARCHIVE_ARGUMENT,
});

export const deleteArgument = (id: string): ActionTypes => ({
    payload: { id },
    type: Actions.DELETE_ARGUMENT,
});

export const restoreArgument = (id: string): ActionTypes => ({
    payload: { id },
    type: Actions.RESTORE_ARGUMENT,
});

export const wipeArgumentArchive = (): ActionTypes => ({
    type: Actions.WIPE_ARGUMENT_ARCHIVE,
});

export const moveArgument = (id: string, to: number): ActionTypes => ({
    payload: { id, to },
    type: Actions.MOVE_ARGUMENT,
});

export const closeArgumentEditor = (): ActionTypes => ({
    type: Actions.CLOSE_ARGUMENT_EDITOR,
});

/** TYPES */
import {
    CommandEditorActions,
    CommandEditorActionTypes,
    ICommand,
} from '../types';

export const cancelCommandEdit = (): CommandEditorActionTypes => ({
    type: CommandEditorActions.CANCEL_COMMAND_EDIT,
});

export const createCommand = (): CommandEditorActionTypes => ({
    type: CommandEditorActions.CREATE_COMMAND,
});

export const editCommand = (index: number, command: ICommand): CommandEditorActionTypes => ({
    payload: { index, command },
    type: CommandEditorActions.EDIT_COMMAND,
});

export const updateCommandCommand = (command: string): CommandEditorActionTypes => ({
    payload: { command },
    type: CommandEditorActions.UPDATE_COMMAND_COMMAND,
});

export const updateCommandLabel = (label: string): CommandEditorActionTypes => ({
    payload: { label },
    type: CommandEditorActions.UPDATE_COMMAND_LABEL,
});

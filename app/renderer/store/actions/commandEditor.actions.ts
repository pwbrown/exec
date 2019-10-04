/** TYPES */
import {
    Argument,
    CommandEditorActions,
    CommandEditorActionTypes,
    ICommand,
} from '../types';

export const closeCommandEditor = (): CommandEditorActionTypes => ({
    type: CommandEditorActions.CLOSE_COMMAND_EDITOR,
});

export const createCommand = (): CommandEditorActionTypes => ({
    type: CommandEditorActions.CREATE_COMMAND,
});

export const editCommand = (index: number, command: ICommand): CommandEditorActionTypes => ({
    payload: { index, command },
    type: CommandEditorActions.EDIT_COMMAND,
});

export const addArgument = (argument: Argument): CommandEditorActionTypes => ({
    payload: { argument },
    type: CommandEditorActions.ADD_ARGUMENT,
});

export const updateArgument = (index: number, argument: Argument): CommandEditorActionTypes => ({
    payload: { index, argument },
    type: CommandEditorActions.UPDATE_ARGUMENT,
});

export const removeArgument = (index: number): CommandEditorActionTypes => ({
    payload: { index },
    type: CommandEditorActions.REMOVE_ARGUMENT,
});

export const updateCommandCommand = (command: string): CommandEditorActionTypes => ({
    payload: { command },
    type: CommandEditorActions.UPDATE_COMMAND_COMMAND,
});

export const updateCommandLabel = (label: string): CommandEditorActionTypes => ({
    payload: { label },
    type: CommandEditorActions.UPDATE_COMMAND_LABEL,
});

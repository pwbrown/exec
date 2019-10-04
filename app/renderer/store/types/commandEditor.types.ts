/** OTHER TYPES */
import { Argument, ICommand } from './command.types';
import { IAction, IPayload } from './redux.types';

/** Shape of the Command Editor State */
export interface ICommandEditorState {
    command: ICommand;
    editing: boolean;
    index: number;
    show: boolean;
}

/** All possible Command Editor Actions */
export enum CommandEditorActions {
    CREATE_COMMAND = 'CREATE_COMMAND',
    EDIT_COMMAND = 'EDIT_COMMAND',
    ADD_ARGUMENT = 'ADD_ARGUMENT',
    UPDATE_ARGUMENT = 'UPDATE_ARGUMENT',
    REMOVE_ARGUMENT = 'REMOVE_ARGUMENT',
    CLOSE_COMMAND_EDITOR = 'CLOSE_COMMAND_EDITOR',
    UPDATE_COMMAND_LABEL = 'UPDATE_COMMAND_LABEL',
    UPDATE_COMMAND_COMMAND = 'UPDATE_COMMAND_COMMAND',
}

/** Combined Command Editor Actions */
export type CommandEditorActionTypes =
    IAction<CommandEditorActions.CREATE_COMMAND> |
    IPayload<CommandEditorActions.EDIT_COMMAND, { index: number, command: ICommand }> |
    IPayload<CommandEditorActions.ADD_ARGUMENT, { argument: Argument }> |
    IPayload<CommandEditorActions.UPDATE_ARGUMENT, { index: number, argument: Argument }> |
    IPayload<CommandEditorActions.REMOVE_ARGUMENT, { index: number }> |
    IAction<CommandEditorActions.CLOSE_COMMAND_EDITOR> |
    IPayload<CommandEditorActions.UPDATE_COMMAND_LABEL, { label: string }> |
    IPayload<CommandEditorActions.UPDATE_COMMAND_COMMAND, { command: string }>;

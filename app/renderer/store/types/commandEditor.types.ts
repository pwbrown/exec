/** OTHER TYPES */
import { ICommand } from './command.types';
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
    CANCEL_COMMAND_EDIT = 'CANCEL_COMMAND_EDIT',
    UPDATE_COMMAND_LABEL = 'UPDATE_COMMAND_LABEL',
    UPDATE_COMMAND_COMMAND = 'UPDATE_COMMAND_COMMAND',
}

/** Combined Command Editor Actions */
export type CommandEditorActionTypes =
    IAction<CommandEditorActions.CREATE_COMMAND> |
    IPayload<CommandEditorActions.EDIT_COMMAND, { index: number, command: ICommand }> |
    IAction<CommandEditorActions.CANCEL_COMMAND_EDIT> |
    IPayload<CommandEditorActions.UPDATE_COMMAND_LABEL, { label: string }> |
    IPayload<CommandEditorActions.UPDATE_COMMAND_COMMAND, { command: string }>;

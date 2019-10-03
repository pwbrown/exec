/** OTHER TYPES */
import { Argument, ArgumentType } from './command.types';
import { IAction, IPayload } from './redux.types';

export interface IArgumentEditorState {
    argument: Argument;
    editing: boolean;
    index: number;
    show: boolean;
}

export enum ArgumentEditorActions {
    CREATE_ARGUMENT = 'CREATE_ARGUMENT',
    EDIT_ARGUMENT = 'EDIT_ARGUMENT',
    CANCEL_ARGUMENT_EDIT = 'CANCEL_ARGUMENT_EDIT',
    UPDATE_ARGUMENT_ID = 'UPDATE_ARGUMENT_ID',
    UPDATE_ARGUMENT_TYPE = 'UPDATE_ARGUMENT_TYPE',
    UPDATE_ARGUMENT_VALUE = 'UPDATE_ARGUMENT_VALUE',
    UPDATE_ARGUMENT_REQUIREMENT = 'UPDATE_ARGUMENT_REQUIREMENT',
}

export type ArgumentEditorActionTypes =
    IPayload<ArgumentEditorActions.CREATE_ARGUMENT, { id?: string }> |
    IPayload<ArgumentEditorActions.EDIT_ARGUMENT, { index: number, argument: Argument }> |
    IAction<ArgumentEditorActions.CANCEL_ARGUMENT_EDIT> |
    IPayload<ArgumentEditorActions.UPDATE_ARGUMENT_ID, { id: string }> |
    IPayload<ArgumentEditorActions.UPDATE_ARGUMENT_TYPE, { type: ArgumentType }> |
    IPayload<ArgumentEditorActions.UPDATE_ARGUMENT_VALUE, { value: string }> |
    IPayload<ArgumentEditorActions.UPDATE_ARGUMENT_REQUIREMENT, { required: boolean }>;

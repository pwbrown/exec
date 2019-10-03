/** TYPES */
import {
    Argument,
    ArgumentEditorActions,
    ArgumentEditorActionTypes,
    ArgumentType,
} from '../types';

export const cancelArgumentEdit = (): ArgumentEditorActionTypes => ({
    type: ArgumentEditorActions.CANCEL_ARGUMENT_EDIT,
});

export const createArgument = (id?: string): ArgumentEditorActionTypes => ({
    payload: { id },
    type: ArgumentEditorActions.CREATE_ARGUMENT,
});

export const editArgument = (index: number, argument: Argument): ArgumentEditorActionTypes => ({
    payload: { index, argument },
    type: ArgumentEditorActions.EDIT_ARGUMENT,
});

export const updateArgumentId = (id: string): ArgumentEditorActionTypes => ({
    payload: { id },
    type: ArgumentEditorActions.UPDATE_ARGUMENT_ID,
});

export const updateArgumentRequirement = (required: boolean): ArgumentEditorActionTypes => ({
    payload: { required },
    type: ArgumentEditorActions.UPDATE_ARGUMENT_REQUIREMENT,
});

export const updateArgumentType = (type: ArgumentType): ArgumentEditorActionTypes => ({
    payload: { type },
    type: ArgumentEditorActions.UPDATE_ARGUMENT_TYPE,
});

export const updateArgumentValue = (value: string): ArgumentEditorActionTypes => ({
    payload: { value },
    type: ArgumentEditorActions.UPDATE_ARGUMENT_VALUE,
});

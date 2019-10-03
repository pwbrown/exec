/** TYPES */
import {
    Argument,
    ArgumentEditorActions,
    ArgumentEditorActionTypes,
    ArgumentType,
    IArgumentEditorState,
} from '../types';

/** Empty Argument */
const EMPTY_ARGUMENT: Argument = {
    id: '',
    type: ArgumentType.FREE_FORM,
    value: '{{VALUE}}',
};

/** Initial Argument Editor State */
const initialArgumentEditorState: IArgumentEditorState = {
    argument: { ...EMPTY_ARGUMENT },
    editing: false,
    index: 0,
    show: false,
};

export const ArgumentEditorReducer = (
    state: IArgumentEditorState = initialArgumentEditorState,
    action: ArgumentEditorActionTypes,
): IArgumentEditorState => {
    switch (action.type) {
        case ArgumentEditorActions.CANCEL_ARGUMENT_EDIT:
            return { ...state, show: false };
        case ArgumentEditorActions.CREATE_ARGUMENT:
            return {
                ...state,
                argument: {
                    ...EMPTY_ARGUMENT,
                    id: action.payload.id || '',
                },
                editing: false,
                show: true,
            };
        case ArgumentEditorActions.EDIT_ARGUMENT:
            return {
                ...state,
                argument: action.payload.argument,
                editing: true,
                index: action.payload.index,
                show: true,
            };
        case ArgumentEditorActions.UPDATE_ARGUMENT_ID:
            return {
                ...state,
                argument: {
                    ...state.argument,
                    id: action.payload.id,
                },
            };
        case ArgumentEditorActions.UPDATE_ARGUMENT_REQUIREMENT:
            return {
                ...state,
                argument: {
                    ...state.argument,
                    required: action.payload.required,
                },
            };
        case ArgumentEditorActions.UPDATE_ARGUMENT_TYPE:
            return {
                ...state,
                argument: {
                    ...state.argument,
                    type: action.payload.type,
                },
            };
        case ArgumentEditorActions.UPDATE_ARGUMENT_VALUE:
            return {
                ...state,
                argument: {
                    ...state.argument,
                    value: action.payload.value,
                },
            };
        default:
            return state;
    }
};

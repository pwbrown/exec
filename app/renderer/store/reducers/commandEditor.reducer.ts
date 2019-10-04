/** TYPES */
import {
    CommandEditorActions,
    CommandEditorActionTypes,
    ICommand,
    ICommandEditorState,
} from '../types';

/** Empty Command */
const EMPTY_COMMAND: ICommand = {
    command: '',
    label: '',
};

/** Initial Command Editor State */
const initialCommandEditorState: ICommandEditorState = {
    command: { ...EMPTY_COMMAND },
    editing: false,
    index: 0,
    show: false,
};

export const CommandEditorReducer = (
    state: ICommandEditorState = initialCommandEditorState,
    action: CommandEditorActionTypes,
): ICommandEditorState => {
    switch (action.type) {
        case CommandEditorActions.CLOSE_COMMAND_EDITOR:
            return { ...state, show: false };
        case CommandEditorActions.CREATE_COMMAND:
            return {
                ...state,
                command: { ...EMPTY_COMMAND },
                editing: false,
                show: true,
            };
        case CommandEditorActions.EDIT_COMMAND:
            return {
                ...state,
                command: action.payload.command,
                editing: true,
                index: action.payload.index,
                show: true,
            };
        case CommandEditorActions.ADD_ARGUMENT:
            const addExistArgs = state.command.args || [];
            return {
                ...state,
                command: {
                    ...state.command,
                    args: [
                        ...addExistArgs,
                        action.payload.argument,
                    ],
                },
            };
        case CommandEditorActions.UPDATE_ARGUMENT:
            const updateExistArgs = state.command.args || [];
            return {
                ...state,
                command: {
                    ...state.command,
                    args: [
                        ...updateExistArgs.slice(0, action.payload.index),
                        action.payload.argument,
                        ...updateExistArgs.slice(action.payload.index + 1),
                    ],
                },
            };
        case CommandEditorActions.REMOVE_ARGUMENT:
            const removeExistArgs = state.command.args || [];
            return {
                ...state,
                command: {
                    ...state.command,
                    args: [
                        ...removeExistArgs.slice(0, action.payload.index),
                        ...removeExistArgs.slice(action.payload.index + 1),
                    ],
                },
            };
        case CommandEditorActions.UPDATE_COMMAND_COMMAND:
            return {
                ...state,
                command: {
                    ...state.command,
                    command: action.payload.command,
                },
            };
        case CommandEditorActions.UPDATE_COMMAND_LABEL:
            return {
                ...state,
                command: {
                    ...state.command,
                    label: action.payload.label,
                },
            };
        default:
            return state;
    }
};

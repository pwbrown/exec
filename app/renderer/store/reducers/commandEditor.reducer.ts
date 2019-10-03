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

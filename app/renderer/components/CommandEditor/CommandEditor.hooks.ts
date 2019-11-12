/** DRAFT */
import { ContentState, EditorState } from 'draft-js';

/** TYPES */
import { ICommand } from '../../types';

/** FIELD HOOKS */
import {
    useEditorState,
    useLinkedArgumentsState,
    useTextFieldState,
} from '../Fields/hooks';

/* tslint:disable:object-literal-sort-keys */
export const useCommandEditorFieldStates = (command: ICommand) => ({
    label: useTextFieldState(command.label),
    description: useTextFieldState(command.description || ''),
    script: useEditorState(
        EditorState.createWithContent(
            ContentState.createFromText(command.script))),
    using: useLinkedArgumentsState(command.using || []),
});

/** DRAFT */
import { ContentState, EditorState } from 'draft-js';

/** EDITOR UTILS */
import { editorStateFromText } from '../Fields/Editor/Editor.utils';

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
    script: useEditorState(editorStateFromText(command.script, command.using || [])),
    using: useLinkedArgumentsState(command.using || []),
});

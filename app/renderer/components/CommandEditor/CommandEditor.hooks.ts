/** TYPES */
import { ICommand } from '../../types';

/** FIELD HOOKS */
import {
    useEditorState,
    useFilePathState,
    useLinkedArgumentsState,
    useTextFieldState,
} from '../Fields/hooks';

/* tslint:disable:object-literal-sort-keys */
export const useCommandEditorFieldStates = (command: ICommand) => ({
    label: useTextFieldState(command.label),
    description: useTextFieldState(command.description || ''),
    script: useEditorState(command.script || ''),
    cwd: useFilePathState(command.cwd || ''),
    using: useLinkedArgumentsState(command.using || []),
});

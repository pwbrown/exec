/** DRAFT */
import { ContentState, EditorState } from 'draft-js';

/** TYPES */
import {
    ArgumentType,
    IArgument,
    IArgumentOption,
    IFileSystemArgument,
    IOptionsArgument,
} from '../../types';

/** FIELD HOOKS */
import {
    useEditorState,
    useFilePathState,
    useOptionsState,
    useSelectState,
    useSwitchState,
    useTextFieldState,
} from '../Fields/hooks';

/* tslint:disable:object-literal-sort-keys */
export const useArgumentEditorFieldStates = (argument: IArgument) => ({
    /** CONFIGURATION Fields */
    id: useTextFieldState(argument.id),
    type: useSelectState<ArgumentType>(argument.type),
    /** APPEARANCE Fields */
    label: useTextFieldState(argument.label || ''),
    description: useTextFieldState(argument.description || ''),
    /** CONTEXT Fields */
    before: useEditorState(
        EditorState.createWithContent(
            ContentState.createFromText(argument.context.split('<:VALUE:>')[0]))),
    after: useEditorState(
        EditorState.createWithContent(
            ContentState.createFromText(argument.context.split('<:VALUE:>')[1]))),
    /** TYPES COMMON */
    default: useTextFieldState(argument.default || ''),
    /** FREEFORM TYPE OPTIONS - N/A */
    /** OPTIONS TYPE OPTIONS */
    options: useOptionsState<IArgumentOption[]>((argument as IOptionsArgument).options || []),
    /** FILE SYSTEM TYPE OPTIONS */
    start: useFilePathState((argument as IFileSystemArgument).start || ''),
    allowFile: useSwitchState((argument as IFileSystemArgument).allowFile || true),
    allowDir: useSwitchState((argument as IFileSystemArgument).allowDir || true),
    showHidden: useSwitchState((argument as IFileSystemArgument).showHidden || false),
    extensions: 'temp',
});

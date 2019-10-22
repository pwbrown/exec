/** REACT */
import { useEffect } from 'react';

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

/** UTILS */
import { defaultBool } from '../../utils';

/* tslint:disable:object-literal-sort-keys */
export const useArgumentEditorFieldStates = (argument: IArgument) => ({
    /** CONFIGURATION Fields */
    id: useTextFieldState(argument.id),
    type: useSelectState<ArgumentType>(argument.type),
    required: useSwitchState(defaultBool(false, argument.required)),
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
    /** FREEFORM TYPE OPTIONS - N/A */
    ffDefault: useTextFieldState(argument.default || ''),
    /** OPTIONS TYPE OPTIONS */
    oDefault: useSelectState(argument.default || ''),
    oOptions: useOptionsState((argument as IOptionsArgument).options || []),
    /** FILE SYSTEM TYPE OPTIONS */
    fsDefault: useFilePathState(argument.default || ''),
    fsStart: useFilePathState((argument as IFileSystemArgument).start || ''),
    fsAllowFile: useSwitchState(defaultBool(true, (argument as IFileSystemArgument).allowFile)),
    fsAllowDir: useSwitchState(defaultBool(true, (argument as IFileSystemArgument).allowDir)),
    fsShowHidden: useSwitchState(defaultBool(false, (argument as IFileSystemArgument).showHidden)),
    fsExtensions: 'temp',
});

export const useOptionValidationEffect = (
    fields: ReturnType<typeof useArgumentEditorFieldStates>,
) => {
    useEffect(() => {
        /** Ensure that the oDefault field is cleared
         * if the option containing the value is removed
         */
        if (fields.oDefault.value) {
            const def = fields.oDefault.value;
            const opts = fields.oOptions.value;
            if (!opts.filter((opt) => opt.value === def).length) {
                fields.oDefault.onChange(({ target: { value: '' }}) as any);
            }
        }
    }, [fields.oOptions.value.length]);
};

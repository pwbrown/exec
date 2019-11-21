/** REACT */
import React from 'react';

/** TYPES */
import { ArgumentType, ICommand } from 'types';

/** REDUX */
import { useSelector } from 'react-redux';
import { AppState } from 'store';

/** FIELD HOOKS */
import {
    useFilePathState,
    useSelectState,
    useTextFieldState,
} from '../Fields/hooks';

/** FIELDS */
import FilePath from '../Fields/FilePath/FilePath';
import Select from '../Fields/Select/Select';
import TextField from '../Fields/TextField/TextField';

/** Takes in the commandId and builds argument fields to display */
/* tslint:disable:react-hooks-nesting */
export const useExecutorFields = (command: ICommand) => {
    const args = useSelector((state: AppState) => state.argument.arguments);

    const fields: any[] = [];
    const states: any = {};

    (command.using as string[]).forEach((argId) => {
        /** Ignore if the argument does not exist or was already handled */
        if (states[argId] || !args[argId]) { return; }
        const arg = args[argId];
        switch (arg.type) {
            case ArgumentType.FREEFORM:
                states[arg.id] = useTextFieldState(arg.default || '');
                fields.push((
                    <TextField
                        label={arg.label || arg.id || undefined}
                        help={arg.description || undefined}
                        required={arg.required || false}
                        {...states[arg.id]}
                    />
                ));
                break;
            case ArgumentType.OPTIONS:
                states[arg.id] = useSelectState(arg.default || '');
                fields.push((
                    <Select
                        label={arg.label || arg.id || undefined}
                        help={arg.description || undefined}
                        required={arg.required || false}
                        options={arg.options}
                        emptyOption='None'
                        {...states[arg.id]}
                    />
                ));
                break;
            case ArgumentType.FILE_SYSTEM:
                states[arg.id] = useFilePathState(arg.default || '');
                fields.push((
                    <FilePath
                        label={arg.label || arg.id || undefined}
                        help={arg.description || undefined}
                        required={arg.required || false}
                        allowDirectorySelection={arg.allowDir}
                        allowFileSelection={arg.allowFile}
                        showHiddenFiles={arg.showHidden}
                        startingLocation={arg.start || undefined}
                        {...states[arg.id]}
                    />
                ));
                break;
        }
    });

    const validate = () => {
        let valid = true;
        const values: any = {};
        for (const argId of Object.keys(states)) {
            values[argId] = states[argId].value;
            if (args[argId].required && !states[argId].value) {
                states[argId].setHasError(true);
                valid = false;
            }
        }
        return { valid, values };
    };

    return { fields, validate };
};

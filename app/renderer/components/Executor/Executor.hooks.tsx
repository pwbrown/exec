/** REACT */
import React from 'react';

/** TYPES */
import { ArgumentType, IArgument, ICommand } from '../../types';

/** REDUX */
import { useSelector } from 'react-redux';
import { State } from '../../store';

/** FIELD HOOKS */
import {
    useFilePathState,
    useSwitchState,
    useTextFieldState,
} from '../Fields/hooks';

/** FIELDS */
import FilePath from '../Fields/FilePath/FilePath';
import Select from '../Fields/Select/Select';
import TextField from '../Fields/TextField/TextField';

/** Takes in the commandId and builds argument fields to display */
/* tslint:disable:react-hooks-nesting */
export const useExecutorFields = (command: ICommand) => {
    const args = useSelector((state: State) => state.argument.arguments);

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

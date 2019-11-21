/** REACT */
import React, { FC, Fragment } from 'react';

/** MATERIAL */
import MenuItem from '@material-ui/core/MenuItem';

/** EDITOR BASE */
import Floating from '../Floating/Floating';
import Form from '../Form/Form';

/** FIELDS */
import FilePath from '../Fields/FilePath/FilePath';
import Options from '../Fields/Options/Options';
import Preview from '../Fields/Preview/Preview';
import Section from '../Fields/Section/Section';
import Select from '../Fields/Select/Select';
import Switch from '../Fields/Switch/Switch';
import TextField from '../Fields/TextField/TextField';

/** REDUX */
import { useDispatch, useSelector } from 'react-redux';
import { AppState, closeArgumentEditor, saveArgument } from '../../store';
import { ArgumentType, IArgument } from '../../types';

/** STYLES */
import { useStyles } from './ArgumentEditor.styles';

/** HOOKS AND UTILS */
import {
    useArgumentEditorFieldStates,
    useOptionValidationEffect,
} from './ArgumentEditor.hooks';
import { validate } from './ArgumentEditor.validator';

/** EMPTY ARGUMENT */
const EMPTY: IArgument = {
    context: '<:VALUE:>',
    default: '',
    description: '',
    id: '',
    label: '',
    required: false,
    type: ArgumentType.FREEFORM,
    using: [],
};

const ArgumentEditor: FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    /** REDUX STATE */
    const show = useSelector((state: AppState) => state.argument.editor.show);
    const argument = useSelector((state: AppState) =>
        state.argument.editor.id ? state.argument.arguments[state.argument.editor.id] : { ...EMPTY });
    const newId = useSelector((state: AppState) => state.argument.editor.newId);
    const ids = useSelector((state: AppState) => Object.keys(state.argument.arguments));

    /** FIELD STATES */
    const fields = useArgumentEditorFieldStates({ ...argument, id: newId || argument.id });
    useOptionValidationEffect(fields);

    /** EDITOR EVENTS */
    const cancel = () => dispatch(closeArgumentEditor());
    const save = () => {
        const result = validate(fields, !!argument.id, ids);
        if (result.valid) {
            dispatch(saveArgument(result.argument));
        }
    };

    const renderTypeConfiguration = () => {
        switch (fields.type.value) {
            case ArgumentType.OPTIONS:
                return (
                    <Fragment>
                        <Options
                            label='Options'
                            required={true}
                            help='The list of options displayed in the select field during command execution'
                            {...fields.oOptions}
                        />
                    </Fragment>
                );
            default:
                return '';
        }
    };

    const renderTypeAdditionalOptions = () => {
        switch (fields.type.value) {
            case ArgumentType.FREEFORM:
                return (
                    <Fragment>
                        <TextField
                            label='Default'
                            help='A default value to fill the argument with during command execution'
                            {...fields.ffDefault}
                        />
                    </Fragment>
                );
            case ArgumentType.OPTIONS:
                return (
                    <Fragment>
                        <Select
                            label='Default Option'
                            help='An option to select by default during command execution'
                            emptyOption='None'
                            options={fields.oOptions.value}
                            {...fields.oDefault}
                        />
                    </Fragment>
                );
            case ArgumentType.FILE_SYSTEM:
                return (
                    <Fragment>
                        <FilePath
                            label='Default Location'
                            help='The file location to fill in by default during command execution'
                            {...fields.fsDefault}
                        />
                        <FilePath
                            label='Starting Location'
                            help='The location in the file system dialog to open to when selecting a file/directory during command execution'
                            allowDirectorySelection={true}
                            showHiddenFiles={true}
                            {...fields.fsStart}
                        />
                        <Switch
                            label='File Selection'
                            help='If enabled, this allows files to be selected in the file system dialog'
                            {...fields.fsAllowFile}
                        />
                        <Switch
                            label='Directory Selection'
                            help='If enabled, this allows directories to be selected in the file system dialog'
                            {...fields.fsAllowDir}
                        />
                        <Switch
                            label='Show Hidden Items'
                            help='If enabled, this will show all hidden files and directories in the file system dialog'
                            {...fields.fsShowHidden}
                        />
                    </Fragment>
                );
            default:
                return '';
        }
    };

    const hasConfigurationError = () => {
        return (
            fields.id.hasError ||
            (fields.type.value === ArgumentType.OPTIONS && fields.oOptions.hasError)
        );
    };

    return (
        <Floating show={show} z={2}>
            <Form
                title={`${argument.id ? 'Edit' : 'New'} Argument`}
                onCancel={cancel}
                onConfirm={save}
            >
                <Section
                    label='Configuration'
                    required={true}
                    hasError={hasConfigurationError()}
                    startExpanded={!argument.id}
                >
                    <TextField
                        label='Identifier'
                        required={true}
                        placeholder='Enter an identifer'
                        disabled={!!argument.id}
                        errorText={ids.indexOf(fields.id.value.trim()) !== -1 ? 'This id is already being used.' : 'Invalid id formatting. Hover over the help icon to check requirments'}
                        helperText={!!argument.id ? 'The id cannot be changed after an argument has been created' : ''}
                        help={`The identifier used in scripts or another argument's context for inserting this argument - Can only be set once during argument creation - Formatting: 1. Can only use capital letters or underscore characters. 2. Must begin and end with a letter`}
                        {...fields.id}
                    />
                    <Select
                        label='Type'
                        required={true}
                        disabled={!!argument.id}
                        help={`The argument type defines how a user interacts with an argument during command execution. FREEFORM arguments appear as a text field, OPTIONS arguments appear as a select field with pre-defined options, and FILE arguments appear as a file selector field`}
                        helperText={`${!!argument.id ? 'The argument type cannot be changed after an argument has been created' : ''}`}
                        {...fields.type}
                    >
                        <MenuItem value={ArgumentType.FREEFORM}>Freeform</MenuItem>
                        <MenuItem value={ArgumentType.OPTIONS}>Options</MenuItem>
                        <MenuItem value={ArgumentType.FILE_SYSTEM}>File</MenuItem>
                    </Select>
                    <Switch
                        label='Required'
                        help={`If enabled, the command utilizing this argument cannot be executed until either a default is provided below in "Additional Options" or a value is given during execution`}
                        {...fields.required}
                    />
                    {renderTypeConfiguration()}
                </Section>

                <Section label='Appearance' startExpanded={!!argument.id}>
                    <TextField
                        label='Label'
                        help={`Label to help better identify an argument throughout the app`}
                        {...fields.label}
                    />
                    <TextField
                        label='Description'
                        help={`Longer description to help describe the purpose of an argument thoughout the app`}
                        {...fields.description}
                    />
                </Section>

                <Section label='Context'>
                    <Preview label='Value Context Preview'>
                        {fields.before.value}
                        <span className={classes.value}>{fields.id.value || 'VALUE'}</span>
                        {fields.after.value}
                    </Preview>
                    <TextField
                        label='Static Text Before Value'
                        help={`Static text that is prepended to the value of the argument during execution. Will not be included if a value was not provided.`}
                        {...fields.before}
                    />
                    <TextField
                        label='Static Text After Value'
                        help={`Static text that is appended to the value of the argument during execution. Will not be included if a value was not provided.`}
                        {...fields.after}
                    />
                </Section>

                <Section label='Additional Options'>
                    {renderTypeAdditionalOptions()}
                </Section>
            </Form>
        </Floating>
    );
};

export default ArgumentEditor;

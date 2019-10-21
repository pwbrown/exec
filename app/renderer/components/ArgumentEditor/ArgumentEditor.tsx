/** REACT */
import React, { FC, Fragment } from 'react';

/** MATERIAL */
import MenuItem from '@material-ui/core/MenuItem';

/** EDITOR BASE */
import EditorBase from '../EditorBase/EditorBase';

/** FIELDS */
import Editor from '../Fields/Editor/Editor';
import FilePath from '../Fields/FilePath/FilePath';
import Preview from '../Fields/Preview/Preview';
import Section from '../Fields/Section/Section';
import Select from '../Fields/Select/Select';
import Switch from '../Fields/Switch/Switch';
import TextField from '../Fields/TextField/TextField';

/** REDUX */
import { useDispatch, useSelector } from 'react-redux';
import { closeArgumentEditor, saveArgument, State } from '../../store';
import { ArgumentType, IArgument } from '../../types';

/** STYLES */
import { useStyles } from './ArgumentEditor.styles';

/** STATE HOOK */
import { useArgumentEditorFieldStates } from './ArgumentEditor.hooks';

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
    const show = useSelector((state: State) => state.argument.editor.show);
    const argument = useSelector((state: State) =>
        state.argument.editor.id ? state.argument.arguments[state.argument.editor.id] : { ...EMPTY });

    /** FIELD STATES */
    const fields = useArgumentEditorFieldStates(argument);

    /** RAW OUTPUT */
    const beforeTxt = fields.before.editorState.getCurrentContent().getPlainText();
    const afterTxt = fields.after.editorState.getCurrentContent().getPlainText();

    /** EDITOR EVENTS */
    const cancel = () => dispatch(closeArgumentEditor());
    const save = () => {
        dispatch(saveArgument({
            context: `${beforeTxt}<:VALUE:>${afterTxt}`,
            default: fields.default.value,
            description: fields.description.value,
            id: fields.id.value,
            label: fields.label.value,
            type: ArgumentType.FREEFORM,
        }));
    };

    const renderTypeOptions = () => {
        switch (fields.type.value) {
            case ArgumentType.OPTIONS:
                return (
                    <Fragment/>
                );
            case ArgumentType.FILE_SYSTEM:
                return (
                    <Fragment>
                        <FilePath
                            uid='arg-editor-start'
                            label='Starting Location'
                            {...fields.start}
                        />
                        <Switch
                            label='File Selection'
                            {...fields.allowFile}
                        />
                        <Switch
                            label='Directory Selection'
                            {...fields.allowDir}
                        />
                        <Switch
                            label='Show Hidden Items'
                            {...fields.showHidden}
                        />
                    </Fragment>
                );
            case ArgumentType.FREEFORM:
            default:
                return '';
        }
    };

    return (
        <EditorBase
            show={show}
            title={`${argument.id ? 'Edit' : 'New'} Argument`}
            onCancel={cancel}
            onSave={save}
            z={2}
        >
            <Section label='Configuration' required={true} startExpanded={true}>
                <TextField
                    label='Identifier'
                    required={true}
                    placeholder='Enter an identifer'
                    help={`The identifier used in scripts or another argument's context for inserting this argument - Can only be set once during argument creation`}
                    {...fields.id}
                />
                <Select
                    label='Type'
                    required={true}
                    {...fields.type}
                >
                    <MenuItem value={ArgumentType.FREEFORM}>Freeform</MenuItem>
                    <MenuItem value={ArgumentType.OPTIONS}>Options</MenuItem>
                    <MenuItem value={ArgumentType.FILE_SYSTEM}>File</MenuItem>
                </Select>
            </Section>

            <Section label='Appearance'>
                <TextField
                    label='Label'
                    {...fields.label}
                />
                <TextField
                    label='Description'
                    {...fields.description}
                />
            </Section>

            <Section label='Context'>
                <Preview label='Value Context Preview'>
                    {beforeTxt}<span className={classes.value}>{fields.id.value || 'VALUE'}</span>{afterTxt}
                </Preview>
                <Editor
                    label='Static Text Before Value'
                    {...fields.before}
                />
                <Editor
                    label='Static Text After Value'
                    {...fields.after}
                />
            </Section>

            <Section label='Additional Options'>
                <TextField
                    label='Default'
                    {...fields.default}
                />
                {renderTypeOptions()}
            </Section>
        </EditorBase>
    );
};

export default ArgumentEditor;

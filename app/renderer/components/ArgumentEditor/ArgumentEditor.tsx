/** REACT */
import React, { FC } from 'react';

/** MATERIAL */
import MenuItem from '@material-ui/core/MenuItem';

/** EDITOR BASE */
import EditorBase from '../EditorBase/EditorBase';

/** FIELDS */
import Editor from '../Fields/Editor/Editor';
import FilePath from '../Fields/FilePath/FilePath';
import Preview from '../Fields/Preview/Preview';
import SectionTitle from '../Fields/SectionTitle/SectionTitle';
import Select from '../Fields/Select/Select';
import TextField from '../Fields/TextField/TextField';

/** DRAFT */
import { ContentState, EditorState } from 'draft-js';

/** REDUX */
import { useDispatch, useSelector } from 'react-redux';
import { closeArgumentEditor, saveArgument, State } from '../../store';
import { ArgumentType, IArgument } from '../../types';

/** STYLES */
import { useStyles } from './ArgumentEditor.styles';

/** STATE HOOKS */
import {
    useEditorState,
    useFilePathState,
    useSelectState,
    useTextFieldState,
} from '../../utils';

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

    /** CONTEXT PARTS */
    const [ bef, aft ] = argument.context.split('<:VALUE:>');

    /** FIELD STATES */
    const id = useTextFieldState(argument.id);
    const type = useSelectState<ArgumentType>(argument.type);
    const label = useTextFieldState(argument.label);
    const description = useTextFieldState(argument.description || '');
    const before = useEditorState(
        EditorState.createWithContent(ContentState.createFromText(bef)));
    const after = useEditorState(
        EditorState.createWithContent(ContentState.createFromText(aft)));
    const defalt = useTextFieldState(argument.default || ''); // purposely mispelled (default is a reserved keyword)
    const file = useFilePathState('');

    /** RAW OUTPUT */
    const beforeTxt = before.editorState.getCurrentContent().getPlainText();
    const afterTxt = after.editorState.getCurrentContent().getPlainText();

    /** EDITOR EVENTS */
    const cancel = () => dispatch(closeArgumentEditor());
    const save = () => {
        dispatch(saveArgument({
            context: `${beforeTxt}<:VALUE:>${afterTxt}`,
            default: defalt.value,
            description: description.value,
            id: id.value,
            label: label.value,
            type: ArgumentType.FREEFORM,
        }));
    };

    return (
        <EditorBase
            show={show}
            title={`${argument.id ? 'Edit' : 'New'} Argument`}
            onCancel={cancel}
            onSave={save}
            z={2}
        >
            <SectionTitle>One-Time</SectionTitle>
            <TextField
                label='Trigger'
                required={true}
                {...id}
            />
            <Select
                label='Type'
                required={true}
                {...type}
            >
                <MenuItem value={ArgumentType.FREEFORM}>Freeform</MenuItem>
                <MenuItem value={ArgumentType.OPTIONS}>Options</MenuItem>
                <MenuItem value={ArgumentType.FILE_SYSTEM}>File System</MenuItem>
            </Select>

            <SectionTitle>Appearance</SectionTitle>
            <TextField
                label='Label'
                required={true}
                {...label}
            />
            <TextField
                label='Description'
                {...description}
            />

            <SectionTitle>Context</SectionTitle>
            <Preview label='Value Context Preview'>
                {beforeTxt}<span className={classes.value}>{id.value || 'VALUE'}</span>{afterTxt}
            </Preview>
            <Editor
                label='Static Text Before Value'
                {...before}
            />
            <Editor
                label='Static Text After Value'
                {...after}
            />

            <SectionTitle>Options</SectionTitle>
            <TextField
                label='Default Value'
                {...defalt}
            />
            <FilePath
                uid='arg-edit-file'
                label='File'
                required={true}
                {...file}
            />
        </EditorBase>
    );
};

export default ArgumentEditor;

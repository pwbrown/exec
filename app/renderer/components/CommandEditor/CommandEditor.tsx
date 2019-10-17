/** REACT */
import React, { FC } from 'react';

/** EDITOR BASE */
import EditorBase from '../EditorBase/EditorBase';

/** FIELDS */
import Editor from '../Fields/Editor';
import { LinePrompt } from '../Fields/EditorDecorator';
import TextField from '../Fields/TextField';

/** DRAFT */
import { ContentState, EditorState } from 'draft-js';

/** REDUX */
import { useDispatch, useSelector } from 'react-redux';
import { closeCommandEditor, saveCommand, State } from '../../store';
import { ICommand } from '../../types';

/** UTILS */
import {
    uniqueId,
    useEditorState,
    useTextFieldState,
} from '../../utils';

/** EMPTY COMMAND */
const EMPTY: ICommand = { description: '', id: '', label: '', script: '', using: [] };

const CommandEditor: FC = () => {
    const dispatch = useDispatch();

    /** REDUX STATE */
    const show = useSelector((state: State) => state.command.editor.show);
    const ids = useSelector((state: State) => Object.keys(state.command.commands));
    const command = useSelector((state: State) =>
        state.command.editor.id ? state.command.commands[state.command.editor.id] : { ...EMPTY });

    /** FIELD STATES */
    const label = useTextFieldState(command.label);
    const description = useTextFieldState(command.description || '');
    const script = useEditorState(
        EditorState.createWithContent(ContentState.createFromText(command.script)));

    /** EDITOR EVENTS */
    const cancel = () => dispatch(closeCommandEditor());
    const save = () => {
        if (label.value !== '') {
            dispatch(saveCommand({
                description: description.value,
                id: command.id || uniqueId(label.value, ids),
                label: label.value,
                script: script.editorState.getCurrentContent().getPlainText(),
            }));
        }
    };

    /** Editor Field Decorators */
    const decorators = () => ({ component: LinePrompt });

    return (
        <EditorBase
            show={show}
            title={`${command.id ? 'Edit' : 'New'} Command`}
            onCancel={cancel}
            onSave={save}
            z={1}
        >
            <TextField label='Label' {...label}/>
            <TextField label='Description' {...description}/>
            <Editor label='Script' blockRendererFn={decorators} {...script}/>
        </EditorBase>
    );
};

export default CommandEditor;

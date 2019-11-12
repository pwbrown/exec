/** REACT */
import React, { FC } from 'react';

/** EDITOR BASE */
import EditorBase from '../EditorBase/EditorBase';

/** FIELDS */
import Editor from '../Fields/Editor/Editor';
import TextField from '../Fields/TextField/TextField';

/** REDUX */
import { useDispatch, useSelector } from 'react-redux';
import { closeCommandEditor, saveCommand, State } from '../../store';
import { ICommand } from '../../types';

/** HOOKS AND UTILS */
import { useCommandEditorFieldStates } from './CommandEditor.hooks';
import { validate } from './CommandEditor.validator';

/** EMPTY COMMAND */
const EMPTY: ICommand = {
    description: '',
    id: '',
    label: '',
    script: '',
    using: [],
};

const CommandEditor: FC = () => {
    const dispatch = useDispatch();

    /** REDUX STATE */
    const show = useSelector((state: State) => state.command.editor.show);
    const command = useSelector((state: State) =>
        state.command.editor.id ? state.command.commands[state.command.editor.id] : { ...EMPTY });
    const ids = useSelector((state: State) => Object.keys(state.command.commands));
    const argIds = useSelector((state: State) => state.argument.order);

    /** FIELD STATES */
    const fields = useCommandEditorFieldStates(command);

    /** EDITOR EVENTS */
    const cancel = () => dispatch(closeCommandEditor());
    const save = () => {
        const result = validate(fields, command.id, ids);
        if (result.valid) {
            dispatch(saveCommand(result.command));
        }
    };

    return (
        <EditorBase
            show={show}
            title={`${command.id ? 'Edit' : 'New'} Command`}
            onCancel={cancel}
            onSave={save}
            z={1}
        >
            <TextField
                label='Label'
                required={true}
                help='A label to help identify a command throughout the app'
                {...fields.label}
            />
            <TextField
                label='Description'
                help='A description to help understand the purpose of the command'
                {...fields.description}
            />
            <Editor
                label='Script'
                prompts={true}
                required={true}
                help='The script that is run when executing the command'
                argumentIds={argIds}
                {...fields.using}
                {...fields.script}
            />
        </EditorBase>
    );
};

export default CommandEditor;

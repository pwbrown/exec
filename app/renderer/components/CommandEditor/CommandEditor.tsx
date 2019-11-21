/** REACT */
import React, { FC, useState } from 'react';

/** Form */
import Floating from '../Floating/Floating';
import Form from '../Form/Form';

/** MATERIAL */
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';

/** FIELDS */
import Editor from '../Fields/Editor/Editor';
import FilePath from '../Fields/FilePath/FilePath';
import ScriptPreview from '../Fields/ScriptPreview/ScriptPreview';
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
    cwd: '',
    description: '',
    id: '',
    label: '',
    script: '',
    using: [],
};

const CommandEditor: FC = () => {
    const dispatch = useDispatch();
    const [showPreview, setShowPreview] = useState<boolean>(false);

    const toggleScriptPreview = () => setShowPreview(!showPreview);

    /** REDUX STATE */
    const show = useSelector((state: State) => state.command.editor.show);
    const command = useSelector((state: State) =>
        state.command.editor.id ? state.command.commands[state.command.editor.id] : { ...EMPTY });
    const ids = useSelector((state: State) => Object.keys(state.command.commands));

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
        <Floating show={show} z={1}>
            <Form
                title={`${command.id ? 'Edit' : 'New'} Command`}
                onCancel={cancel}
                onConfirm={save}
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
                <FilePath
                    label='CWD'
                    help='The current working directory that the script should run in when executed.'
                    allowDirectorySelection={true}
                    allowFileSelection={false}
                    showHiddenFiles={true}
                    {...fields.cwd}
                />
                <Editor
                    label='Script'
                    prompts={true}
                    required={true}
                    help='The script that is run when executing the command'
                    {...fields.using}
                    {...fields.script}
                />
                <Button size='small' onClick={toggleScriptPreview} color='primary'>
                    {showPreview ? 'Hide' : 'Show'} Preview
                </Button>
                <Collapse in={showPreview}>
                    <ScriptPreview
                        label='Script Preview'
                        help='A preview of the full script including the full context of all arguments'
                        script={fields.script.value}
                        linkedArgs={fields.using.linkedArgs}
                    />
                </Collapse>
            </Form>
        </Floating>
    );
};

export default CommandEditor;

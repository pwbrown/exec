/** REACT */
import React, { FC } from 'react';

/** MATERIAL */
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Fade from '@material-ui/core/Fade';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

/** DRAFT */
import { ContentState, EditorState } from 'draft-js';
import ScriptEditorField from './ScriptEditorField'; // Draft Editor modified to appear material

/** REDUX */
import { useDispatch, useSelector } from 'react-redux';
import { closeCommandEditor, saveCommand, State } from '../../store';
import { ICommand } from '../../types';

/** UTILS */
import {
    uniqueId,
    useScriptEditorFieldState,
    useTextFieldState,
} from '../../utils';

/** STYLES */
import { useStyles } from './CommandEditor.styles';

/** EMPTY COMMAND */
const EMPTY: ICommand = { description: '', id: '', label: '', script: '', using: [] };

const CommandEditor: FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const show = useSelector((state: State) => state.command.editor.show);
    const ids = useSelector((state: State) => Object.keys(state.command.commands));
    const command = useSelector((state: State) =>
        state.command.editor.id ?
            state.command.commands[state.command.editor.id] : { ...EMPTY });
    const cancel = () => dispatch(closeCommandEditor());

    /** FIELD STATES */
    const label = useTextFieldState(command.label);
    const description = useTextFieldState(command.description || '');
    const script = useScriptEditorFieldState(
        EditorState.createWithContent(ContentState.createFromText(command.script)));

    const validate = () => {
        return label.value !== '';
    };

    const save = () => {
        if (validate()) {
            dispatch(saveCommand({
                description: description.value,
                id: command.id || uniqueId(label.value, ids),
                label: label.value,
                script: script.editorState.getCurrentContent().getPlainText(),
            }));
        }
    };

    return (
        <div
            className={classes.container}
            style={{pointerEvents: show ? 'all' : 'none'}}
        >
            <Fade in={show}>
                <div className={classes.editor}>
                    <div className={classes.header}>
                        <Typography
                            variant='h5'
                            className={classes.title}
                        >
                            {command.id ? 'Edit' : 'New'} Command
                        </Typography>
                    </div>
                    <Divider/>
                    <div className={classes.fieldsOuter}>
                        <div className={classes.fieldsInner}>
                            <FormGroup>
                                <Typography>Label</Typography>
                                <TextField {...label} variant='outlined' margin='dense'/>
                            </FormGroup>
                            <FormGroup>
                                <Typography>Description</Typography>
                                <TextField {...description} variant='outlined' margin='dense'/>
                            </FormGroup>
                            <FormGroup>
                                <Typography>Script</Typography>
                                <ScriptEditorField {...script}/>
                            </FormGroup>
                        </div>
                    </div>
                    <Divider/>
                    <div className={classes.actionsContainer}>
                        <Button
                            variant='outlined'
                            color='secondary'
                            className={classes.actionButton}
                            onClick={cancel}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant='outlined'
                            className={classes.actionButton}
                            onClick={save}
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </Fade>
        </div>
    );
};

export default CommandEditor;

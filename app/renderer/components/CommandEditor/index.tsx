/** REACT */
import React, { ChangeEvent, FC } from 'react';

/** MATERIAL */
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

/** PROPS */
import { Connected, Props } from './commandEditor.props';

/** COMPONENTS */
import ArgumentEditor from './ArgumentEditor';
import ArgumentList from './ArgumentList';
import SuggestedArgumentList from './SuggestedArgumentList';

/** TYPES */
type TextEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

const CommandEditor: FC<Props> = (props) => {
    const close = () => props.close();
    const save = () => {
        if (props.editing) {
            props.updateCommand(props.index, props.command);
        } else {
            props.addCommand(props.command);
        }
        close();
    };
    const updateLabel = (e: TextEvent) => props.updateLabelValue(e.currentTarget.value);
    const updateCommand = (e: TextEvent) => props.updateCommandValue(e.currentTarget.value);
    return (
        <Dialog open={props.show} fullScreen={true}>
            <DialogTitle
                style={{ paddingBottom: 0, paddingTop: 40 }}
            >
                {props.editing ? 'Edit' : 'Create a'} Commmand
            </DialogTitle>
            <DialogContent>
                <TextField
                    label='Display Name'
                    fullWidth={true}
                    margin='normal'
                    variant='filled'
                    value={props.command.label}
                    onChange={updateLabel}
                />
                <TextField
                    label='Command'
                    fullWidth={true}
                    multiline={true}
                    margin='normal'
                    variant='filled'
                    value={props.command.command}
                    onChange={updateCommand}
                />
                <ArgumentEditor/>
                <SuggestedArgumentList/>
                <ArgumentList/>
            </DialogContent>
            <DialogActions>
                <Button
                    color='secondary'
                    variant='outlined'
                    onClick={close}
                >
                    Cancel
                </Button>
                <Button
                    color='default'
                    variant='outlined'
                    onClick={save}
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default Connected(CommandEditor);

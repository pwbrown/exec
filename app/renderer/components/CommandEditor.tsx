/** REACT */
import React, { ChangeEvent, FC } from 'react';

/** MATERIAL */
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

/** REDUX */
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {
    cancelEdit,
    IAppState,
    saveCommand,
    updateCurrentCommand,
    updateCurrentLabel,
} from '../utils/app.reducer';

/** TYPES */
type TextEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

/** REDUX PROPS */
interface IStateProps {
    open: boolean;
    creating: boolean;
    label: string;
    command: string;
}

interface IDispatchProps {
    cancel: () => void;
    updateLabel: (label: string) => void;
    updateCommand: (command: string) => void;
    save: () => void;
}

const CommandEditor: FC<IStateProps & IDispatchProps> = (props) => {
    const cancel = () => props.cancel();
    const save = () => props.save();
    const updateLabel = (e: TextEvent) => props.updateLabel(e.currentTarget.value);
    const updateCommand = (e: TextEvent) => props.updateCommand(e.currentTarget.value);
    return (
        <Dialog open={props.open} fullWidth={true}>
            <DialogTitle
                style={{ paddingBottom: 0 }}
            >
                {props.creating ? 'Create a' : 'Edit'} Commmand
            </DialogTitle>
            <DialogContent>
                <TextField
                    label='Display Name'
                    fullWidth={true}
                    margin='normal'
                    variant='outlined'
                    value={props.label}
                    onChange={updateLabel}
                />
                <TextField
                    label='Command'
                    fullWidth={true}
                    multiline={true}
                    margin='normal'
                    variant='outlined'
                    value={props.command}
                    onChange={updateCommand}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    color='secondary'
                    variant='outlined'
                    onClick={cancel}
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

/** REDUX MAPS */
const mapStateToProps = ({ creating, editor, command }: IAppState): IStateProps => ({
    command: command.command,
    creating,
    label: command.label,
    open: editor,
});
const mapDispatchToProps = (d: Dispatch): IDispatchProps => ({
    cancel: () => d(cancelEdit()),
    save: () => d(saveCommand()),
    updateCommand: (command: string) => d(updateCurrentCommand(command)),
    updateLabel: (label: string) => d(updateCurrentLabel(label)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CommandEditor);

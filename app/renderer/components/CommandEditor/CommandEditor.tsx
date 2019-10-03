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
    cancelCommandEdit,
    IAppState,
    saveCommand,
    updateCommandCommand,
    updateCommandLabel,
} from '../../redux';
import { ICommand } from '../../utils/types';

/** COMPONENTS */
import ArgumentEditor from './ArgumentEditor';
import ArgumentList from './ArgumentList';
import SuggestedArgumentList from './SuggestedArgumentList';

/** TYPES */
type TextEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

/** REDUX PROPS */
interface IStateProps {
    show: boolean;
    editing: boolean;
    command: ICommand;
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
                    variant='outlined'
                    value={props.command.label}
                    onChange={updateLabel}
                />
                <TextField
                    label='Command'
                    fullWidth={true}
                    multiline={true}
                    margin='normal'
                    variant='outlined'
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
const mapStateToProps = (state: IAppState): IStateProps => ({
    command: state.commandEditorState.command,
    editing: state.commandEditorState.editing,
    show: state.commandEditorState.show,
});
const mapDispatchToProps = (d: Dispatch): IDispatchProps => ({
    cancel: () => d(cancelCommandEdit()),
    save: () => d(saveCommand()),
    updateCommand: (command: string) => d(updateCommandCommand(command)),
    updateLabel: (label: string) => d(updateCommandLabel(label)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CommandEditor);

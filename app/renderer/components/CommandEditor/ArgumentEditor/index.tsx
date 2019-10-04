/** REACT */
import React, { ChangeEvent, FC } from 'react';

/** MATERIAL */
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

/** PROPS */
import { Connected, Props } from './argumentEditor.props';

/** TYPES */
import { ArgumentType } from '../../../store/types';
type TextEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
type SelectEvent = ChangeEvent<{ name?: string | undefined, value: unknown }>;

const ArgumentEditor: FC<Props> = (props) => {
    const close = () => props.close();
    const save = () => {
        if (props.editing) {
            props.updateArgument(props.index, props.argument);
        } else {
            props.addArgument(props.argument);
        }
        close();
    };
    const updateId = (e: TextEvent) => props.updateId(e.currentTarget.value);
    const updateValue = (e: TextEvent) => props.updateValue(e.currentTarget.value);
    const updateType = (e: SelectEvent) => props.updateType(e.currentTarget.value as ArgumentType);
    const updateLabel = (e: TextEvent) => props.updateLabel(e.currentTarget.value);
    return (
        <Dialog
            open={props.show}
            fullScreen={true}
            PaperProps={{ elevation: 2 }}
        >
            <DialogTitle style={{ paddingBottom: '0px', paddingTop: '40px' }}>
                {props.editing ? 'Edit' : 'Create an'} Argument
            </DialogTitle>
            <DialogContent>
                <TextField
                    label='Argument ID'
                    fullWidth={true}
                    margin='normal'
                    variant='filled'
                    value={props.argument.id}
                    onChange={updateId}
                />
                <TextField
                    label='Argument Label'
                    fullWidth={true}
                    margin='normal'
                    variant='filled'
                    value={props.argument.label || ''}
                    onChange={updateLabel}
                />
                <TextField
                    label='Value'
                    fullWidth={true}
                    margin='normal'
                    variant='filled'
                    value={props.argument.value}
                    onChange={updateValue}
                />
                <FormControl
                    variant='filled'
                    fullWidth={true}
                    margin='normal'
                >
                    <InputLabel htmlFor='arg-type'>Argument Type</InputLabel>
                    <Select
                        inputProps={{ id: 'arg-type' }}
                        value={props.argument.type}
                        onChange={updateType}
                    >
                        <MenuItem value={ArgumentType.FREE_FORM}>Freeform</MenuItem>
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button
                    variant='outlined'
                    color='secondary'
                    onClick={close}
                >
                    Cancel
                </Button>
                <Button
                    variant='outlined'
                    onClick={save}
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default Connected(ArgumentEditor);

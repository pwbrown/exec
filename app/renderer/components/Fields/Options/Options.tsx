/** REACT */
import React, { FC, useState } from 'react';

/** MATERIAL */
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Add from '@material-ui/icons/Add';
import Check from '@material-ui/icons/Check';
import Close from '@material-ui/icons/Close';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';

/** COMPONENTS */
import Label, { ILabelProps } from '../Label/Label';

/** STYLES */
import { useStyles } from './Options.styles';

/** TYPES */
import { IOption } from '../hooks';

/** HOOKS */
import { useOptionsReducer } from './Options.hooks';

/** PROPS */
interface IProps extends ILabelProps {
    label?: string;
    hasError?: boolean;
    errorText?: string;
    helperText?: string;
    value?: IOption[];
    onChange?: (newValue: IOption[]) => void;
}

const Options: FC<IProps> = (props) => {
    const classes = useStyles();
    const { state, ...actions } = useOptionsReducer();

    const save = () => {
        if (!state.value.trim()) {
            return actions.setError();
        }
        actions.close();
        if (typeof props.onChange !== 'function') {
            return;
        }
        const option = { value: state.value, label: state.label };
        const next = props.value ? [ ...props.value ] : [];
        if (state.index === -1) {
            next.push(option);
        } else {
            next[state.index] = option;
        }
        props.onChange(next);
    };

    const remove = (index: number) => () => {
        if (typeof props.onChange !== 'function') {
            return;
        }
        const next = props.value ? [ ...props.value ] : [];
        next.splice(index, 1);
        props.onChange(next);
    };

    const renderOptions = () => {
        const options = props.value || [];
        return options.map((opt, index) => state.index === index && state.show ?
            renderEditor() : (
                <TableRow key={`${opt.value}-option`}>
                    <TableCell>{opt.value}</TableCell>
                    <TableCell>{opt.label || ''}</TableCell>
                    <TableCell align='right'>
                        <Tooltip title='Edit'>
                            <IconButton
                                onClick={actions.edit(index, opt.value, opt.label || '')}
                                size='small'
                            >
                                <Edit/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Remove'>
                            <IconButton size='small' onClick={remove(index)}>
                                <Delete/>
                            </IconButton>
                        </Tooltip>
                    </TableCell>
                </TableRow>
            ));
    };

    const renderEditor = () => {
        return (
            <TableRow>
                <TableCell>
                    <TextField
                        variant='outlined'
                        placeholder='Enter a value'
                        value={state.value}
                        margin='dense'
                        fullWidth={true}
                        error={state.error}
                        onChange={actions.updateValue}
                    />
                </TableCell>
                <TableCell>
                    <TextField
                        variant='outlined'
                        placeholder='Enter a label'
                        value={state.label}
                        margin='dense'
                        fullWidth={true}
                        onChange={actions.updateLabel}
                    />
                </TableCell>
                <TableCell align='right'>
                    <Tooltip title='Save'>
                        <IconButton size='small' onClick={save}>
                            <Check/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Cancel'>
                        <IconButton size='small' onClick={actions.close}>
                            <Close/>
                        </IconButton>
                    </Tooltip>
                </TableCell>
            </TableRow>
        );
    };

    let helperText = props.helperText || '';
    if (props.hasError) {
        helperText = 'This field requires at least 1 option.';
        if (props.value && props.value.length && props.errorText) {
            helperText = props.errorText || '';
        }
    }
    const renderHelperText = () => !helperText ? '' : (
        <FormHelperText
            variant='outlined'
            error={props.hasError}
            margin='dense'
        >
            {helperText}
        </FormHelperText>
    );

    return (
        <FormGroup>
            <Label help={props.help} required={props.required}>
                {props.label}
            </Label>
            <Table size='small' className={classes.container}>
                <TableHead>
                    <TableRow>
                        <TableCell>Value *</TableCell>
                        <TableCell>Label</TableCell>
                        <TableCell align='right'>
                            <Tooltip title='New Option'>
                                <IconButton size='small' onClick={actions.create}>
                                    <Add/>
                                </IconButton>
                            </Tooltip>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {renderOptions()}
                    {state.show && state.index === -1 ? renderEditor() : ''}
                </TableBody>
            </Table>
            {renderHelperText()}
        </FormGroup>
    );
};

export default Options;

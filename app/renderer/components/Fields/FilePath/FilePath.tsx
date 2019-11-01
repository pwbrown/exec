/** REACT */
import React, { FC, useEffect } from 'react';

/** ELECTRON */
import { ipcRenderer as ipc } from 'electron';

/** MATERIAL */
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';

/** FIELDS */
import Label, { ILabelProps } from '../Label/Label';

/** STYLES */
import { useStyles } from './FilePath.styles';

/** PROPS */
export interface IFilePathProps extends ILabelProps {
    label?: string;
    placeholder?: string;
    value?: string;
    onChange?: (file: string) => void;
    helperText?: string;
    hasError?: boolean;
    errorText?: string;
    allowFileSelection?: boolean;
    allowDirectorySelection?: boolean;
    showHiddenFiles?: boolean;
    startingLocation?: string;
    allowedExtensions?: string[];
}

const FilePath: FC<IFilePathProps> = (props) => {
    const classes = useStyles();

    const selectFile = () => {
        const file: string = ipc.sendSync('fileSync:selectPath', {
            allowDir: props.allowDirectorySelection,
            allowFile: props.allowFileSelection,
            extensions: props.allowedExtensions,
            showHidden: props.showHiddenFiles,
        });
        if (typeof props.onChange === 'function') {
            props.onChange(file);
        }
    };

    let helperText = props.helperText || '';
    if (props.hasError) {
        helperText = 'This field is required.';
        if (props.value && props.errorText) {
            helperText = props.errorText;
        }
    }
    const renderHelperText = () => !helperText ? '' : (
        <FormHelperText
            variant='outlined'
            margin='dense'
            error={props.hasError}
        >
            {helperText}
        </FormHelperText>
    );

    return (
        <FormGroup>
            <Label help={props.help} required={props.required}>{props.label}</Label>
            <div className={classes.container}>
                <TextField
                    value={props.value || ''}
                    placeholder={props.placeholder || ''}
                    variant='outlined'
                    disabled={true}
                    margin='dense'
                    error={props.hasError}
                    className={classes.text}
                />
                <Button
                    variant='outlined'
                    color='secondary'
                    onClick={selectFile}
                >
                    {props.value ? 'Change' : 'Select File'}
                </Button>
            </div>
            {renderHelperText()}
        </FormGroup>
    );
};

export default FilePath;

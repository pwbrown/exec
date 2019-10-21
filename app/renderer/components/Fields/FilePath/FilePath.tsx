/** REACT */
import React, { FC, useEffect } from 'react';

/** ELECTRON */
import { ipcRenderer as ipc } from 'electron';

/** MATERIAL */
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';

/** FIELDS */
import Label, { ILabelProps } from '../Label/Label';

/** STYLES */
import { useStyles } from './FilePath.styles';

/** PROPS */
export interface IFilePathProps extends ILabelProps {
    /** Unique id used for requesting and receiving file paths */
    uid: string;
    /** Optional Label above field */
    label?: string;
    /** Optional placeholder for the file field */
    placeholder?: string;
    /** The current file selected */
    value?: string;
    /** Event that is called when the file changes */
    onChange?: (file: string) => void;
}

const FilePath: FC<IFilePathProps> = (props) => {
    const classes = useStyles();

    const selectFile = () => ipc.send('file:selectPath', props.uid);

    const fileSelected = (_: any, filePath: string) => {
        if (typeof props.onChange === 'function') {
            props.onChange(filePath);
        }
    };

    useEffect(() => {
        /** Listen for File Selected Event */
        const event = `file:selected:${props.uid}`;
        ipc.addListener(event, fileSelected);

        /** Event cleanup on Unmount */
        return () => {
            ipc.removeListener(event, fileSelected);
        };
    }, [props.uid]);

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
        </FormGroup>
    );
};

export default FilePath;

/** REACT */
import React, { FC, useEffect } from 'react';

/** ELECTRON */
import { ipcRenderer as ipc } from 'electron';

/** MATERIAL */
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

/** STYLES */
import { useStyles } from './FilePath.styles';

/** PROPS */
interface IProps {
    /** Unique id used for requesting and receiving file paths */
    uid: string;
    /** Optional Label above field */
    label?: string;
    /** Optional placeholder for the file field */
    placeholder?: string;
    /** Whether the field is required */
    required?: boolean;
    /** The current file selected */
    value?: string;
    /** Event that is called when the file changes */
    onChange?: (file: string) => void;
}

const FilePath: FC<IProps> = (props) => {
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
            <Typography>{props.label || ''}{props.required ? ' *' : ''}</Typography>
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

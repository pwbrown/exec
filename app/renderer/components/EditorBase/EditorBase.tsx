/** REACT */
import React, { CSSProperties, FC } from 'react';

/** MATERIAL */
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';

/** STYLES */
import { useStyles } from './EditorBase.styles';

/** PROPS */
interface IProps {
    /** Whether to show editor */
    show: boolean;
    /** Z-index of the editor */
    z?: number;
    /** Header title */
    title: string;
    /** Fired when save button is clicked */
    onSave?: () => void;
    /** Fired when the cancel button is clicked */
    onCancel?: () => void;
}

const EditorBase: FC<IProps> = (props) => {
    const classes = useStyles();
    const cancel = () => {
        if (typeof props.onCancel === 'function') {
            props.onCancel();
        }
    };
    const save = () => {
        if (typeof props.onSave === 'function') {
            props.onSave();
        }
    };
    const containerStyles: CSSProperties = {
        pointerEvents: props.show ? 'all' : 'none',
        zIndex: props.z || 0,
    };
    return (
        <div className={classes.container} style={containerStyles}>
            <Fade in={props.show}>
                <div className={classes.editor}>
                    <div className={classes.header}>
                        <Typography variant='h5' className={classes.title}>
                            {props.title}
                        </Typography>
                    </div>
                    <Divider/>
                    <div className={classes.fieldsOuter}>
                        <div className={classes.fieldsInner}>
                            {props.children}
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

export default EditorBase;

/** REACT */
import React, { FC } from 'react';

/** MATERIAL */
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

/** STYLES */
import { useStyles } from './Form.styles';

/** PROPS */
interface IProps {
    title: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
}

const Form: FC<IProps> = (props) => {
    const classes = useStyles();

    /** Button Handlers */
    const cancel = () => props.onCancel ? props.onCancel() : undefined;
    const confirm = () => props.onConfirm ? props.onConfirm() : undefined;

    return (
        <div className={classes.container}>
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
                    {props.cancelText || 'Cancel'}
                </Button>
                <Button
                    variant='outlined'
                    className={classes.actionButton}
                    onClick={confirm}
                >
                    {props.confirmText || 'Save'}
                </Button>
            </div>
        </div>
    );
};

export default Form;

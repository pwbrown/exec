/** REACT */
import React, { FC, MouseEvent } from 'react';

/** MATERIAL */
import ButtonBase from '@material-ui/core/ButtonBase';
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Archive from '@material-ui/icons/Archive';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import Unarchive from '@material-ui/icons/Unarchive';

/** STYLES */
import { useStyles } from './CommandListItem.styles';

/** TYPES */
import { ICommand } from '../../types';

/** ACTIONS */
import { useDispatch } from 'react-redux';
import {
    archiveCommand,
    deleteCommand,
    editCommand,
    executeCommand,
    restoreCommand,
} from '../../store';

/** PROPS */
interface IProps {
    archived: boolean;
    command: ICommand;
}

const CommandListItem: FC<IProps> = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const actionProps: IconButtonProps = {
        onMouseDown: (e: MouseEvent<HTMLButtonElement>) => e.stopPropagation(),
        size: 'small',
    };

    const toggleArchive = () => {
        if (props.archived) {
            dispatch(restoreCommand(props.command.id));
        } else {
            dispatch(archiveCommand(props.command.id));
        }
    };
    /** onClick wrapper to prevent click events underneath buttons */
    const stopProp = (func: () => void) => (e: MouseEvent<HTMLButtonElement>) => {
        func();
        e.stopPropagation();
    };
    const remove = () => dispatch(deleteCommand(props.command.id));
    const edit = () => dispatch(editCommand(props.command.id));
    const execute = () => {
        if (!props.archived) {
            dispatch(executeCommand(props.command.id));
        }
    };

    const editActionButton = () => {
        if (!props.archived) {
            return (
                <Tooltip title='Edit' placement='left'>
                    <IconButton onClick={stopProp(edit)} {...actionProps}>
                        <Edit fontSize='inherit'/>
                    </IconButton>
                </Tooltip>
            );
        }
    };

    const toggleArchiveActionButton = () => {
        return (
            <Tooltip title={props.archived ? 'Unarchive' : 'Archive'} placement='left'>
                <IconButton onClick={stopProp(toggleArchive)} {...actionProps}>
                    {props.archived ? <Unarchive fontSize='inherit'/> : <Archive fontSize='inherit'/>}
                </IconButton>
            </Tooltip>
        );
    };

    const deleteActionButton = () => {
        if (props.archived) {
            return (
                <Tooltip title='Delete (Permanent)' placement='left'>
                    <IconButton onClick={stopProp(remove)} {...actionProps}>
                        <Delete fontSize='inherit'/>
                    </IconButton>
                </Tooltip>
            );
        }
    };

    const { description, label } = props.command;

    return (
        <div className={classes.container}>
            <Paper>
                <ButtonBase className={classes.paper} onClick={execute}>
                    <div className={classes.infoContainer}>
                        <Typography>
                            {props.archived ? <s>{label}</s> : label}
                        </Typography>
                        <Typography variant='caption'>
                            {props.archived ? <s>{description || ''}</s> : description || ''}
                        </Typography>
                    </div>
                    <div className={classes.actionsContainer}>
                        {editActionButton()}
                        {toggleArchiveActionButton()}
                        {deleteActionButton()}
                    </div>
                </ButtonBase>
            </Paper>
        </div>
    );
};

export default CommandListItem;

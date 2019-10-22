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
import { useStyles } from './ListItem.styles';

/** TYPES */
import { IArgument, ICommand } from '../../types';

/** PROPS */
interface IProps {
    archived: boolean;
    item: IArgument | ICommand;
    onArchive: (id: string) => void;
    onClick?: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
    onRestore: (id: string) => void;
    titleRenderer?: (item: IArgument | ICommand, archived: boolean) => any;
}

const ListItem: FC<IProps> = (props) => {
    const classes = useStyles();

    /** RENDER HELPERS */
    const actionProps: IconButtonProps = {
        onMouseDown: (e: MouseEvent<HTMLButtonElement>) => e.stopPropagation(),
        size: 'small',
    };
    const stopProp = (func: () => void) => (e: MouseEvent<HTMLButtonElement>) => {
        func();
        e.stopPropagation();
    };

    /** ACTION HANDLERS */
    const archive = () => props.onArchive(props.item.id);
    const restore = () => props.onRestore(props.item.id);
    const remove = () => props.onDelete(props.item.id);
    const edit = () => props.onEdit(props.item.id);
    const click = () => props.onClick ? props.onClick(props.item.id) : undefined;

    /** ACTION BUTTON RENDERERS */
    const editActionButton = () => props.archived ? '' : (
        <Tooltip title='Edit' placement='left'>
            <IconButton onClick={stopProp(edit)} {...actionProps}>
                <Edit fontSize='inherit'/>
            </IconButton>
        </Tooltip>
    );
    const archiveActionButton = () => (
        <Tooltip title={props.archived ? 'Restore' : 'Archive'} placement='left'>
            <IconButton onClick={stopProp(props.archived ? restore : archive)} {...actionProps}>
                {props.archived ? <Unarchive fontSize='inherit'/> : <Archive fontSize='inherit'/>}
            </IconButton>
        </Tooltip>
    );

    const deleteActionButton = () => !props.archived ? '' : (
        <Tooltip title='Delete (Permanent)' placement='left'>
            <IconButton onClick={stopProp(remove)} {...actionProps}>
                <Delete fontSize='inherit'/>
            </IconButton>
        </Tooltip>
    );

    const { description, label } = props.item;

    const renderTitle = () => {
        if (typeof props.titleRenderer === 'function') {
            return props.titleRenderer(props.item, props.archived);
        } else {
            return (
                <Typography>
                    {props.archived ? <s>{label || ''}</s> : label || ''}
                </Typography>
            );
        }
    };

    return (
        <div className={classes.container}>
            <Paper>
                <ButtonBase className={classes.paper} onClick={click} disableRipple={!props.onClick}>
                    <div className={classes.infoContainer}>
                        {renderTitle()}
                        <Typography variant='caption'>
                            {props.archived ? <s>{description || ''}</s> : description || ''}
                        </Typography>
                    </div>
                    <div className={classes.actionsContainer}>
                        {editActionButton()}
                        {archiveActionButton()}
                        {deleteActionButton()}
                    </div>
                </ButtonBase>
            </Paper>
        </div>
    );
};

export default ListItem;

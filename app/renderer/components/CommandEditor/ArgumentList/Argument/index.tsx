/** REACT */
import React, { FC, Fragment } from 'react';

/** MATERIAL */
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';

/** PROPS */
import { Connected, Props } from './argument.props';

const Argument: FC<Props> = (props) => {
    const edit = () => props.edit(props.index, props.argument);
    const remove = () => props.remove(props.index);
    const PrimaryText = () => {
        return (
            <Fragment>
                {props.argument.id} -
                <Typography variant='caption' color='textSecondary'>{props.argument.type}</Typography>
            </Fragment>
        );
    };
    return (
        <ListItem>
            <ListItemText primary={PrimaryText()} secondary={props.argument.label || ''}/>
            <ListItemSecondaryAction>
                <IconButton onClick={edit} size='small'>
                    <Edit/>
                </IconButton>
                <IconButton onClick={remove} size='small'>
                    <Delete/>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};

export default Connected(Argument);

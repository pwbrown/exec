/** REACT */
import React, { FC, Fragment, MouseEvent, useState } from 'react';

/** ELECTRON */
import { ipcRenderer as ipc } from 'electron';

/** MATERIAL */
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Create from '@material-ui/icons/Create';
import Delete from '@material-ui/icons/Delete';

/** PROPS */
import { Connected, Props } from './command.props';

/** TYPES */
type ContextEvent = MouseEvent<HTMLDivElement>;

const Command: FC<Props> = (props) => {
    const [itemRef, setItemRef] = useState<Element | null>(null);
    const openContextMenu = (e: ContextEvent) => setItemRef(e.currentTarget);
    const closeContextMenu = () => setItemRef(null);
    const remove = () => {
        closeContextMenu();
        props.remove(props.index);
    };
    const edit = () => {
        closeContextMenu();
        props.edit(props.index, props.command);
    };
    const execute = () => ipc.send('commands:execute', props.command.command);

    return (
        <Fragment>
            <ListItem
                button={true}
                onContextMenu={openContextMenu}
                onClick={execute}
            >
                <ListItemText>{props.command.label}</ListItemText>
            </ListItem>
            <Menu
                open={!!itemRef}
                anchorEl={itemRef}
                onClose={closeContextMenu}
            >
                <MenuItem onClick={edit}>
                    <Create style={{marginRight: 5}}/> Edit
                </MenuItem>
                <MenuItem onClick={remove}>
                    <Delete style={{marginRight: 5}}/> Remove
                </MenuItem>
            </Menu>
        </Fragment>
    );
};

export default Connected(Command);

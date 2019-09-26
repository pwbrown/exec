/** REACT */
import React, { FC, Fragment, MouseEvent, useState } from 'react';

/** ELECTRON */
import { ipcRenderer as ipc } from 'electron';

/** MATERIAL */
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Create from '@material-ui/icons/Create';
import Delete from '@material-ui/icons/Delete';

/** REDUX */
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { editCommand, IAppState, removeCommand } from '../redux';
import { ICommand } from '../utils/types';

/** UTILITIES */
const clean = (label: string) => {
    return label.toLowerCase().trim().replace(/[^a-zA-Z0-9]/g, '');
};
type ContextEvent = MouseEvent<HTMLDivElement>;

/** REDUX PROPS */
interface IStateProps {
    commands: ICommand[];
}

const CommandList: FC<IStateProps> = (props) => {
    if (!props.commands.length) {
        return <div/>;
    } else {
        return (
            <List>
                {props.commands.map((c, i) => <CommandItem key={clean(c.label)} command={c} index={i}/>)}
            </List>
        );
    }
};

interface ICommandItemProps {
    command: ICommand;
    index: number;
}

interface ICommandItemDispatchProps {
    edit: (index: number) => void;
    remove: (index: number) => void;
}

const ICommandItem: FC<ICommandItemProps & ICommandItemDispatchProps> = (props) => {
    const [itemRef, setItemRef] = useState<Element | null>(null);
    const openContextMenu = (e: ContextEvent) => setItemRef(e.currentTarget);
    const closeContextMenu = () => setItemRef(null);
    const remove = () => {
        closeContextMenu();
        props.remove(props.index);
    };
    const edit = () => {
        closeContextMenu();
        props.edit(props.index);
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

/** REDUX MAPS */
const mapStateToProps = (state: IAppState): IStateProps => ({
    commands: state.commands,
});
const commandItemMapDispatchToProps = (d: Dispatch): ICommandItemDispatchProps => ({
    edit: (index: number) => d(editCommand(index)),
    remove: (index: number) => d(removeCommand(index)),
});

const CommandItem = connect(null, commandItemMapDispatchToProps)(ICommandItem);

export default connect(mapStateToProps)(CommandList);

/** REACT */
import React, { FC } from 'react';

/** MATERIAL */
import Add from '@material-ui/icons/Add';
import Settings from '@material-ui/icons/Settings';

/** REDUX */
import { useDispatch, useSelector } from 'react-redux';
import { closeCommandEditor, createCommand, State } from '../../store';

/** COMPONENTS */
import SideBarItem from './SideBarItem';

/** STYLES */
import classnames from 'classnames';
import { useStyles } from './SideBar.styles';

const SideBar: FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const showCommandEditor = useSelector((state: State) => state.command.editor.show);
    const toggleCommandEditor = () => {
        if (showCommandEditor) {
            dispatch(closeCommandEditor());
        } else {
            dispatch(createCommand());
        }
    };
    return (
        <div className={classes.container}>
            <SideBarItem
                icon={<Add className={classnames(classes.icon, { [classes.tilt]: showCommandEditor} )}/>}
                tip={showCommandEditor ? 'Close Command Editor' : 'Create Command'}
                onClick={toggleCommandEditor}
            />
            <div className={classes.bottom}>
                <SideBarItem icon={<Settings/>} tip='Settings'/>
            </div>
        </div>
    );
};

export default SideBar;

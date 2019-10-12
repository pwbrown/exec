/** REACT */
import React, { FC } from 'react';

/** ELECTRON */
import { ipcRenderer as ipc } from 'electron';

/** MATERIAL */
import Badge from '@material-ui/core/Badge';
import CircularProgress from '@material-ui/core/CircularProgress';
import Add from '@material-ui/icons/Add';
import InvertColors from '@material-ui/icons/InvertColors';
import Update from '@material-ui/icons/Update';

/** REDUX */
import { useDispatch, useSelector } from 'react-redux';
import { closeCommandEditor, createCommand, setTheme, State } from '../../store';
import { Theme } from '../../types';

/** COMPONENTS */
import SideBarItem from './SideBarItem';

/** STYLES */
import classnames from 'classnames';
import { useStyles } from './SideBar.styles';

/** UTILS */
import { bts } from '../../utils';

const SideBar: FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const showCommandEditor = useSelector((state: State) => state.command.editor.show);
    const theme = useSelector((state: State) => state.settings.theme);
    const status = useSelector((state: State) => state.settings.updateStatus);
    const attempted = useSelector((state: State) => state.settings.attemptedUpdate);
    const toggleCommandEditor = () => {
        if (showCommandEditor) {
            dispatch(closeCommandEditor());
        } else {
            dispatch(createCommand());
        }
    };
    const toggleTheme = () => dispatch(setTheme(theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT));

    const UpdateIcon = () => (
        <Badge
            variant='dot'
            color='secondary'
            invisible={!status.available}
        >
            <Update/>
        </Badge>
    );

    const updateText = () => {
        if (status.available) {
            return 'Click to restart and install update';
        } else if (status.checking && status.progress) {
            const { bytesPerSecond, total, transferred } = status.progress;
            return `Downloading Update... ${bts(transferred)} / ${bts(total)} (${bts(bytesPerSecond)}/s)`;
        } else if (status.checking) {
            return 'Checking for Updates...';
        } else if (attempted) {
            return 'On the Latest Version. Check for Updates.';
        } else {
            return 'Check for Updates';
        }
    };

    const clickUpdate = () => {
        if (status.available) {
            ipc.send('updater:apply');
        } else if (!status.checking && !status.available) {
            ipc.send('updater:check');
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
                <SideBarItem
                    icon={<InvertColors/>}
                    tip={`Switch to ${theme === Theme.LIGHT ? 'Dark' : 'Light'} Mode`}
                    onClick={toggleTheme}
                />
                <div className={classes.updateContainer}>
                    <SideBarItem
                        icon={UpdateIcon()}
                        tip={updateText()}
                        onClick={clickUpdate}
                    />
                    <CircularProgress
                        className={classes.updateProgress}
                        size={30}
                        color='secondary'
                        variant='static'
                        value={!status.available && status.progress ? status.progress.percent : 0}
                    />
                </div>
            </div>
        </div>
    );
};

export default SideBar;

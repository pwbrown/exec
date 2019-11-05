/** REACT */
import React, { FC, Fragment } from 'react';

/** ELECTRON */
import { ipcRenderer as ipc } from 'electron';

/** MATERIAL */
import Badge from '@material-ui/core/Badge';
import CircularProgress from '@material-ui/core/CircularProgress';
import Add from '@material-ui/icons/Add';
import Code from '@material-ui/icons/Code';
import InvertColors from '@material-ui/icons/InvertColors';
import Link from '@material-ui/icons/Link';
import Update from '@material-ui/icons/Update';

/** REDUX */
import { useDispatch, useSelector } from 'react-redux';
import {
    closeArgumentEditor,
    closeCommandEditor,
    createArgument,
    createCommand,
    setTheme,
    setView,
    State,
} from '../../store';
import { Theme, View, WindowMode } from '../../types';

/** COMPONENTS */
import SideBarItem from './SideBarItem';

/** STYLES */
import clsx from 'clsx';
import { useStyles } from './SideBar.styles';

/** UTILS */
import { bts } from '../../utils';

const SideBar: FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const view = useSelector((state: State) => state.settings.view);
    const showCommandEditor = useSelector((state: State) => state.command.editor.show);
    const showArgumentEditor = useSelector((state: State) => state.argument.editor.show);
    const theme = useSelector((state: State) => state.settings.theme);
    const status = useSelector((state: State) => state.settings.updateStatus);
    const attempted = useSelector((state: State) => state.settings.attemptedUpdate);
    const condensed = useSelector((state: State) => state.settings.windowMode === WindowMode.CONDENSED);
    const editorOpen = showCommandEditor || showArgumentEditor;
    const toggleEditor = () => {
        if (editorOpen) {
            return showCommandEditor ?
                dispatch(closeCommandEditor()) :
                dispatch(closeArgumentEditor());
        }
        return view === View.COMMAND_LIST ?
            dispatch(createCommand()) :
            dispatch(createArgument());
    };
    const toggleTheme = () => dispatch(setTheme(theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT));
    const changeView = (v: View) => () => !editorOpen ? dispatch(setView(v)) : undefined;

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

    const addButtonText =
        showArgumentEditor ? 'Close Argument Editor' :
        showCommandEditor ? 'Close Command Editor' :
        view === View.ARGUMENT_LIST ? 'Create Argument' : 'Create Command';

    return condensed ? <Fragment/> : (
        <div className={classes.container}>
            <SideBarItem
                icon={<Add className={clsx(classes.icon, { [classes.tilt]: editorOpen} )}/>}
                tip={addButtonText}
                onClick={toggleEditor}
                highlight={true}
            />
            <div className={clsx(classes.views, { [classes.editorOpen]: editorOpen })}>
                <SideBarItem
                    icon={<Code/>}
                    active={view === View.COMMAND_LIST}
                    tip={'List Commands'}
                    onClick={changeView(View.COMMAND_LIST)}
                />
                <SideBarItem
                    icon={<Link/>}
                    active={view === View.ARGUMENT_LIST}
                    tip={'List Arguments'}
                    onClick={changeView(View.ARGUMENT_LIST)}
                />
            </div>
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

/**
 * This file contains tasks that should execute
 *   in the background as a response to messages
 *   coming from the main process that are not
 *   intentionally triggered by the renderer
 */

/** DEPENDENCIES */
import { ipcRenderer as ipc, IpcRendererEvent } from 'electron';
import { IUpdateStatus, Theme, View, WindowMode } from '../types';
import {
    attemptedUpdate,
    closeArgumentEditor,
    closeCommandEditor,
    createArgument,
    createCommand,
    setTheme,
    setUpdateStatus,
    setView,
    setWindowMode,
    State,
    Store,
} from './';

/******************* Software Updates ****************/
ipc.on('updater:status', (_: IpcRendererEvent, update: IUpdateStatus) => {
    /** Trigger available if previous status was checking and new status is not checking */
    if ((Store.getState() as State).settings.updateStatus.checking && !update.checking) {
        Store.dispatch(attemptedUpdate());
    }
    /** Set the update status */
    Store.dispatch(setUpdateStatus(update));
});

/******************** WINDOW MODE CHANGE *******************/
ipc.on('window:mode', (_: IpcRendererEvent, mode: WindowMode) => {
    Store.dispatch(setWindowMode(mode));
    Store.dispatch(setView(View.COMMAND_LIST));
    Store.dispatch(closeArgumentEditor());
    Store.dispatch(closeCommandEditor());
});

/******************* MENU EVENTS **************************/
ipc.on('menu:openEditor', (_: IpcRendererEvent, type: 'command' | 'argument') => {
    if (type === 'argument') {
        Store.dispatch(createArgument());
    } else if (type === 'command') {
        Store.dispatch(createCommand());
    }
});
ipc.on('menu:toggleTheme', (_: IpcRendererEvent) => {
    Store.dispatch(setTheme(Store.getState().settings.theme === Theme.DARK ? Theme.LIGHT : Theme.DARK));
});

/******************* OS Color/Theme Mode Changes ********************/
// ipc.on('theme:changed', (_: IpcRendererEvent, theme?: Theme) => {
//     if (theme) {
//         Store.dispatch(setTheme(theme));
//     }
// });

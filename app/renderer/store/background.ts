/**
 * This file contains tasks that should execute
 *   in the background as a response to messages
 *   coming from the main process that are not
 *   intentionally triggered by the renderer
 */

/** DEPENDENCIES */
import { ipcRenderer as ipc, IpcRendererEvent } from 'electron';
import { IUpdateStatus, Theme, View, WindowMode } from 'types';
import {
    AppState,
    AppStore,
    attemptedUpdate,
    closeArgumentEditor,
    closeCommandEditor,
    createArgument,
    createCommand,
    setTheme,
    setUpdateStatus,
    setView,
    setWindowMode,
} from './';

/******************* Software Updates ****************/
ipc.on('updater:status', (_: IpcRendererEvent, update: IUpdateStatus) => {
    /** Trigger available if previous status was checking and new status is not checking */
    if ((AppStore.getState() as AppState).settings.updateStatus.checking && !update.checking) {
        AppStore.dispatch(attemptedUpdate());
    }
    /** Set the update status */
    AppStore.dispatch(setUpdateStatus(update));
});

/******************** WINDOW MODE CHANGE *******************/
ipc.on('window:mode', (_: IpcRendererEvent, mode: WindowMode) => {
    AppStore.dispatch(setWindowMode(mode));
    AppStore.dispatch(setView(View.COMMAND_LIST));
    AppStore.dispatch(closeArgumentEditor());
    AppStore.dispatch(closeCommandEditor());
});

/******************* MENU EVENTS **************************/
ipc.on('menu:openEditor', (_: IpcRendererEvent, type: 'command' | 'argument') => {
    if (type === 'argument') {
        AppStore.dispatch(createArgument());
    } else if (type === 'command') {
        AppStore.dispatch(createCommand());
    }
});
ipc.on('menu:toggleTheme', (_: IpcRendererEvent) => {
    AppStore.dispatch(setTheme(AppStore.getState().settings.theme === Theme.DARK ? Theme.LIGHT : Theme.DARK));
});

/******************* OS Color/Theme Mode Changes ********************/
// ipc.on('theme:changed', (_: IpcRendererEvent, theme?: Theme) => {
//     if (theme) {
//         Store.dispatch(setTheme(theme));
//     }
// });

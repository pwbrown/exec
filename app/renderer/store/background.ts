/**
 * This file contains tasks that should execute
 *   in the background as a response to messages
 *   coming from the main process that are not
 *   intentionally triggered by the renderer
 */

/** DEPENDENCIES */
import { ipcRenderer as ipc, IpcRendererEvent } from 'electron';
import { IUpdateStatus, Theme } from '../types';
import {
    attemptedUpdate,
    setTheme,
    setUpdateStatus,
    State,
    Store,
} from './';

/******************* Software Updates ****************/
ipc.on('updater:status', (_: IpcRendererEvent, update: IUpdateStatus) => {
    /** Trigger available if previous status was checking and new status is not checking */
    if ((Store.getState() as State).update.status.checking && !update.checking) {
        Store.dispatch(attemptedUpdate());
    }
    /** Set the update status */
    Store.dispatch(setUpdateStatus(update));
});

/******************* OS Color/Theme Mode Changes ********************/
ipc.on('theme:changed', (_: IpcRendererEvent, theme?: Theme) => {
    if (theme) {
        Store.dispatch(setTheme(theme));
    }
});

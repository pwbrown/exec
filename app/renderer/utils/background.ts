/** ELECTRON */
import { ipcRenderer as ipc, IpcRendererEvent } from 'electron';

/** REDUX & TYPES */
import { Store } from '../store';
import { setTheme, setUpdateStatus } from '../store/actions';
import { State } from '../store/reducers';
import { IUpdateState, IUpdateStatus, Theme } from '../store/types';

/***************************** INITIALIZE BACKGROUND *****************************/

/** Get the initial software update status */
Store.dispatch(setUpdateStatus(ipc.sendSync('updaterSync:status')));

/** Listen for software update status events */
ipc.on('updater:status', (_: IpcRendererEvent, update: IUpdateStatus) => {
    const wasChecking: boolean = (Store.getState() as State).update.status.checking;
    const nextUpdate: Partial<IUpdateState['status']> = { ...update };
    if (wasChecking && !update.checking) {
        nextUpdate.attempted = true;
    }
    Store.dispatch(setUpdateStatus(nextUpdate));
});

/** Listen for theme changes */
ipc.on('theme:changed', (_: IpcRendererEvent, theme?: Theme) => {
    if (theme) {
        Store.dispatch(setTheme(theme));
    }
});

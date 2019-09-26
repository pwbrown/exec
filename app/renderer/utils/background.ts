/** ELECTRON */
import { ipcRenderer as ipc, IpcRendererEvent } from 'electron';

/** REDUX */
import { Store } from 'redux';
import { IAppState, updateStatus, updateTheme } from './app.reducer';

/** MISC */
import { IUpdateStatus } from './types';

const run = (store: Store): void => {
    /** Get the initial software update status */
    store.dispatch(updateStatus(ipc.sendSync('updaterSync:status')));

    /** Listen for software update status events */
    ipc.on('updater:status', (_: IpcRendererEvent, update: IUpdateStatus) => {
        const wasChecking: boolean = (store.getState() as IAppState).update.checking;
        const nextUpdate: Partial<IAppState['update']> = { ...update };
        if (wasChecking && !update.checking) {
            nextUpdate.attempted = true;
        }
        store.dispatch(updateStatus(nextUpdate));
    });

    /** Listen for theme changes */
    ipc.on('theme:changed', (_: IpcRendererEvent, theme?: IAppState['theme']) => {
        if (theme) {
            store.dispatch(updateTheme(theme));
        }
    });

};

export default run;

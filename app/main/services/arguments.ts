/**
 * Handles the storing and retrieving of arguments
 */

/** ELECTRON */
import { app, ipcMain as ipc, IpcMainEvent } from 'electron';
import Store from 'electron-store';

/** CONSTANTS */
const ARGUMENT_STORE = new Store({ name: 'arguments.v1' });

/****************** EVENTS ********************/

/** GET ARGUMENTS */
ipc.on('argumentsSync:get', (event: IpcMainEvent, attr: string) => {
    event.returnValue = ARGUMENT_STORE.get(attr, null);
});

/** SET ARGUMENTS */
ipc.on('argumentsSync:set', (event: IpcMainEvent, attr: string, value: any) => {
    ARGUMENT_STORE.set(attr, value);
    event.returnValue = true;
});

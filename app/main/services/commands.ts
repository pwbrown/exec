/**
 * Handles the storing, retrieving, and executing
 * of commands.
 */

/** ELECTRON */
import { app, ipcMain as ipc, IpcMainEvent } from 'electron';
import Store from 'electron-store';

/** ARGUMENTS */
import { ARGUMENT_STORE } from './arguments';

/** CONSTANTS */
export const COMMAND_STORE = new Store({ name: 'commands.v1' });

/****************** EVENTS ********************/

/** GET COMMANDS */
ipc.on('commandsSync:get', (event: IpcMainEvent, attr: string) => {
    event.returnValue = COMMAND_STORE.get(attr, null);
});

/** SET COMMANDS */
ipc.on('commandsSync:set', (event: IpcMainEvent, attr: string, value: any) => {
    COMMAND_STORE.set(attr, value);
    event.returnValue = true;
});

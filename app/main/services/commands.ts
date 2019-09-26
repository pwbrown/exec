/**
 * Handles the storing, retrieving, and executing
 * of commands.
 */

/** ELECTRON */
import { app, ipcMain as ipc, IpcMainEvent } from 'electron';
import Store from 'electron-store';

/** TERMINAL */
import { runInTerminal } from 'run-in-terminal';

/** CONSTANTS */
const COMMAND_STORE = new Store({ name: 'commands' });

/****************** EVENTS ********************/

/** GET COMMANDS */
ipc.on('commandsSync:get', (event: IpcMainEvent) => {
    event.returnValue = COMMAND_STORE.get('commands');
});

/** SET COMMANDS */
ipc.on('commandsSync:set', (event: IpcMainEvent, commands: any) => {
    COMMAND_STORE.set('commands', commands);
    event.returnValue = true;
});

/** EXECUTE COMMAND */
ipc.on('commands:execute', (_: IpcMainEvent, command: string) => {
    runInTerminal(command, [], { cwd: app.getPath('home') });
});

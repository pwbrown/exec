/** ELECTRON */
import {
    app,
    BrowserWindowConstructorOptions,
    ipcMain as ipc,
    IpcMainEvent,
} from 'electron';

/** WINDOW */
import { Window } from '../utils/window';

/** TERMINAL */
import { runInTerminal } from 'run-in-terminal';

/** STORAGE MANAGERS */
import { ARGUMENT_STORE } from './arguments';
import { COMMAND_STORE } from './commands';

/** EXECUTE WINDOW */
let executor: Window | null = null;
let currentId: string | null = null;

/** WINDOW OPTIONS */
const WindowOptions: BrowserWindowConstructorOptions = {
    frame: false,
    height: 500,
    minHeight: 500,
    minWidth: 400,
    modal: true,
    movable: false,
    resizable: false,
    webPreferences: { nodeIntegration: true },
    width: 400,
};

ipc.on('execute:command', (event: IpcMainEvent, cmdId: string) => {
    const cmds = COMMAND_STORE.get('commands', null);
    const args = ARGUMENT_STORE.get('arguments', null);
    if (!cmds || !cmds[cmdId]) { return; }
    const cmd = cmds[cmdId];
    if (!cmd.using || !cmd.using.length) {
        return runInTerminal(cmd.script, [], { cwd: app.getPath('home') });
    } else if (args && cmd.using.filter((argId: string) => !!args[argId]).length) {
        currentId = cmdId;
        executor = new Window('executor', 'executor.html', {
            ...WindowOptions,
            parent: global.mainWindow.window_UNSAFE,
        });
        executor.track = false; // Switch off window tracking
        executor.open();
    }
});

ipc.on('executeSync:id', (event: IpcMainEvent) => {
    event.returnValue = currentId;
});

ipc.on('execute:arguments', (_event: IpcMainEvent, values: {[arg: string]: any}) => {
    // console.log(JSON.stringify(values));
    closeExecutor();
});

ipc.on('execute:cancel', (_event: IpcMainEvent) => {
    currentId = null;
    closeExecutor();
});

const closeExecutor = () => {
    executor?.close();
    executor = null;
};

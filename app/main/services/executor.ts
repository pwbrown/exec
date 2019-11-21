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
global.executorWindow = null;
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
        return runInTerminal(cmd.script, [], { cwd: cmd.cwd || app.getPath('home') });
    } else if (args && cmd.using.filter((argId: string) => !!args[argId]).length) {
        currentId = cmdId;
        global.executorWindow = new Window('executor', 'executor.html', {
            ...WindowOptions,
            parent: global.mainWindow.window_UNSAFE,
        });
        global.executorWindow.track = false; // Switch off window tracking
        global.executorWindow.open();
    }
});

ipc.on('executeSync:id', (event: IpcMainEvent) => {
    event.returnValue = currentId;
});

ipc.on('execute:arguments', (_event: IpcMainEvent, values: {[arg: string]: any}) => {
    closeExecutor();
    const cmds = COMMAND_STORE.get('commands', null);
    const args = ARGUMENT_STORE.get('arguments', null);
    if (!currentId || !cmds || !cmds[currentId] || !cmds[currentId].using || !args) {
        currentId = null;
        return;
    }
    const cmd = cmds[currentId];
    currentId = null;
    let script = cmd.script;
    cmd.using.forEach((argId: string) => {
        const rgx = new RegExp(`\\$${argId}`, 'g');
        if (!values[argId] || !args[argId]) {
            script = script.replace(rgx, '');
        } else {
            script = script.replace(rgx, args[argId].context).replace(/<:VALUE:>/g, values[argId]);
        }
    });
    return runInTerminal(script, [], { cwd: cmd.cwd || app.getPath('home') });
});

ipc.on('execute:cancel', (_event: IpcMainEvent) => {
    currentId = null;
    closeExecutor();
});

const closeExecutor = () => {
    global.executorWindow?.close();
    global.executorWindow = null;
};

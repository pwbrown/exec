/** ELECTRON */
import {
    app,
    dialog,
    ipcMain as ipc,
    IpcMainEvent,
    OpenDialogSyncOptions,
} from 'electron';

/*********************** LISTEN FOR CLIENT REQUEST ************************/
interface ISelectOptions {
    start?: string;
    allowFile?: boolean;
    allowDir?: boolean;
    showHidden?: boolean;
    extensions?: string[];
}
ipc.on('fileSync:selectPath', (event: IpcMainEvent, opt?: ISelectOptions) => {
    const options: OpenDialogSyncOptions = {
        buttonLabel: 'select',
    };
    if (opt) {
        if (opt.start && opt.start.trim()) {
            options.defaultPath = opt.start;
        } else {
            options.defaultPath = app.getPath('home');
        }
        if (opt.allowFile) {
            if (typeof options.properties === 'undefined') {
                options.properties = [];
            }
            options.properties.push('openFile');
        }
        if (opt.allowDir) {
            if (typeof options.properties === 'undefined') {
                options.properties = [];
            }
            options.properties.push('openDirectory');
        }
        if (opt.showHidden) {
            if (typeof options.properties === 'undefined') {
                options.properties = [];
            }
            options.properties.push('showHiddenFiles');
        }
        if (opt.extensions && opt.extensions.length) {
            options.filters = [
                { name: 'Allowed Files', extensions: opt.extensions },
            ];
        }
    }
    try {
        const files = dialog.showOpenDialogSync(
            global.executorWindow ? global.executorWindow.window_UNSAFE : global.mainWindow.window_UNSAFE,
            options,
        );
        event.returnValue = files && files.length ? files[0] : '';
    } catch (e) {
        event.returnValue = '';
    }
});

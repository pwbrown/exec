/** ELECTRON */
import { app, Menu, MenuItemConstructorOptions } from 'electron';

/** WINDOW */
import { Mode } from './window';

/** UTILS */
const isMac = process.platform === 'darwin';

export class ApplicationMenu {
    /** DYNAMIC ELEMENTS */
    private _condensed: boolean = false;

    /** DYNAMIC ELEMENT MODIFIERS */
    get condensed() { return this._condensed; }
    set condensed(is: boolean) { this._condensed = is; }

    /** Rebuild/Build Menu */
    public build() { this.rebuild(); }
    public rebuild() {
        Menu.setApplicationMenu(Menu.buildFromTemplate([
            ...(isMac ? [{
                label: app.getName(),
                submenu: [
                    { role: 'about' },
                    { type: 'separator' },
                    { role: 'services' },
                    { type: 'separator' },
                    { role: 'hide' },
                    { role: 'hideOthers' },
                    { type: 'separator' },
                    { role: 'quit' },
                ],
            } as MenuItemConstructorOptions] : []),
            {
                label: 'File',
                submenu: [
                    { label: 'New Command', click: () => this.send('newCommand') },
                    { label: 'New Argument', click: () => this.send('newArgument') },
                    isMac ? { role: 'close' } : { role: 'quit' },
                ],
            },
            {
                label: 'View',
                submenu: [
                    { role: 'reload' },
                    { label: 'Developer Tools', role: 'toggleDevTools' },
                    {
                        label: 'Appearance',
                        submenu: [
                            {
                                accelerator: 'CommandOrControl+Shift+C',
                                checked: this.windowIsMode(Mode.CONDENSED),
                                click: () => this.toggleCondensedMode(),
                                label: 'Condensed Mode',
                                type: 'checkbox',
                            },
                        ],
                    },
                ],
            },
        ]));
    }

    /** PRIVATE METHODS */
    private windowIsMode(mode: Mode) {
        return global.mainWindow ? global.mainWindow.mode === mode : false;
    }

    private toggleCondensedMode() {
        this.setWindowMode(this.windowIsMode(Mode.CONDENSED) ? Mode.DEFAULT : Mode.CONDENSED);
    }

    private setWindowMode(mode: Mode) {
        if (global.mainWindow) {
            global.mainWindow.mode = mode;
            this.rebuild();
        }
    }

    private send(msg: string, ...payload: any) {
        global.mainWindow.send(`menu:${msg}`, ...payload);
    }
}

/** ELECTRON */
import { app, Menu, MenuItemConstructorOptions } from 'electron';
import { autoUpdater } from 'electron-updater';

/** WINDOW */
import { Mode } from './window';

/** UPDATER */
import { CheckForUpdates, GetCurrentStatus } from '../services/updater';

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
                    {
                        accelerator: 'CommandOrControl+N',
                        click: () => this.openEditor('command'),
                        label: 'New Command',
                    },
                    {
                        accelerator: 'CommandOrControl+Shift+N',
                        click: () => this.openEditor('argument'),
                        label: 'New Argument',
                    },
                    {
                        click: () => this.checkForUpdates(),
                        enabled: !GetCurrentStatus().checking,
                        label: this.getUpdateLabel(),
                    },
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
                            {
                                accelerator: 'CommandOrControl+Shift+T',
                                click: () => this.send('toggleTheme'),
                                label: 'Toggle Theme (Dark/Light)',
                            },
                        ],
                    },
                ],
            },
        ]));
    }

    /** LABEL METHODS */
    private getUpdateLabel() {
        const status = GetCurrentStatus();
        if (status.checking) {
            return 'Checking for Updates...';
        } else if (!status.available) {
            return 'Check For Updates.';
        } else if (status.available) {
            return 'Install Update and Restart.';
        }
    }

    /** PRIVATE METHODS */
    private checkForUpdates() {
        const status = GetCurrentStatus();
        if (status.checking) {
            return;
        } else if (status.available) {
            return autoUpdater.quitAndInstall();
        } else {
            return CheckForUpdates();
        }
    }

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

    private openEditor(type: 'command' | 'argument') {
        if (this.windowIsMode(Mode.CONDENSED)) {
            this.toggleCondensedMode();
        }
        this.send('openEditor', type);
    }

    private send(msg: string, ...payload: any) {
        global.mainWindow.send(`menu:${msg}`, ...payload);
    }
}

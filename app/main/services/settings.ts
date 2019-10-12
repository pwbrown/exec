/**
 * Handles the storing, retrieving, and executing
 * of settings to persist.
 */

/** ELECTRON */
import { ipcMain as ipc, IpcMainEvent } from 'electron';
import Store from 'electron-store';

/** TRACKING SYSTEM THEME: DISABLED FOR NOW */
// const CurrentTheme = () => systemPreferences.isDarkMode() ? 'DARK' : 'LIGHT';
// systemPreferences.subscribeNotification('AppleInterfaceThemeChangedNotification', () => {
//     global.mainWindow.send('theme:changed', CurrentTheme());
// });

/** CONSTANTS */
const SETTINGS_STORE = new Store({ name: 'settings.v1' });

/****************** EVENTS ********************/

/** GET SETTINGS */
ipc.on('settingsSync:get', (event: IpcMainEvent, attr: string) => {
    event.returnValue = SETTINGS_STORE.get(attr, null);
});

/** SET SETTINGS */
ipc.on('settingsSync:set', (event: IpcMainEvent, attr: string, value: any) => {
    SETTINGS_STORE.set(attr, value);
    event.returnValue = true;
});

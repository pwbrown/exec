/**
 * Handles listening for system wide theme changes,
 * and relaying changes to the window
 */

/** ELECTRON */
import { ipcMain as ipc, IpcMainEvent, systemPreferences } from 'electron';

const CurrentTheme = () => systemPreferences.isDarkMode() ? 'dark' : 'light';

/** LISTEN FOR SYSTEM THEME CHANGE */
systemPreferences.subscribeNotification('AppleInterfaceThemeChangedNotification', () => {
    global.mainWindow.send('theme:changed', CurrentTheme());
});

/** RESPOND TO THEME REQUEST */
ipc.on('themeSync:get', (event: IpcMainEvent) => {
    event.returnValue = CurrentTheme();
});

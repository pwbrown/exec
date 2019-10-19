/** ELECTRON */
import { app } from 'electron';

/** SERVICES */
import './services/commands';
import './services/file';
import './services/settings';
import { CheckForUpdates } from './services/updater';
import { setApplicationMenu } from './utils/menu';
import { Window } from './utils/window';

/*********************** INITIALIZE GLOBALS **************************/

/** Main Window Instance */
global.mainWindow = new Window('main', 'app.html', {
    acceptFirstMouse: true,
    frame: false,
    fullscreenable: false,
    height: 500,
    minHeight: 500,
    minWidth: 400,
    titleBarStyle: 'hidden',
    webPreferences: { nodeIntegration: true },
    width: 500,
});

/*********************** HANDLE APPLICATION EVENTS ********************/

/** Entry point of the application */
app.on('ready', async () => {
    global.mainWindow.open();
    setApplicationMenu();
    /** Start update check interval after a short delay */
    setTimeout(() => {
        CheckForUpdates(600); // Check for updates every 10 minutes
    }, 10000);
});

/** Close the application on window close */
app.on('window-all-closed', () => {
    app.quit();
});

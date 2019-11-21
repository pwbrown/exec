/** ELECTRON */
import { app } from 'electron';

/** SERVICES */
import './services/arguments';
import './services/commands';
import './services/executor';
import './services/file';
import './services/settings';
import { CheckForUpdates } from './services/updater';

/** UTILITIES */
import { ApplicationMenu } from './utils/applicationMenu';
import { Mode, Window } from './utils/window';

/*********************** INITIALIZE GLOBALS **************************/

/** Main Window Instance */
global.mainWindow = new Window('main', 'app.html', {
    acceptFirstMouse: true,
    frame: false,
    fullscreenable: false,
    height: 500,
    titleBarStyle: 'hidden',
    webPreferences: { nodeIntegration: true },
    width: 500,
}, {
    [Mode.DEFAULT]: { minHeight: 500, minWidth: 400 },
    [Mode.CONDENSED]: { minHeight: 170, minWidth: 170 },
});
/** Application Menu Instance */
global.applicationMenu = new ApplicationMenu();

/*********************** HANDLE APPLICATION EVENTS ********************/

/** Entry point of the application */
app.on('ready', async () => {
    global.mainWindow.open();
    global.applicationMenu.build();
    /** Start update check interval after a short delay */
    setTimeout(() => {
        CheckForUpdates(600); // Check for updates every 10 minutes
    }, 10000);
});

/** Close the application on window close */
app.on('window-all-closed', () => {
    app.quit();
});

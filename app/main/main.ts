/**
 * @copyright 2019 Philip Brown
 */

import { app } from 'electron';
import { Window } from './window';

/********* INITIALIZE GLOBALS **********/

/** Main Window Instance */
global.mainWindow = new Window('main', 'app.html', {
    width: 500,
    height: 500,
    frame: false,
    webPreferences: { nodeIntegration: true }
})

/** Entry point of the application */
app.on('ready', async () => {
    global.mainWindow.open();
})

/** Close the application on window close */
app.on('window-all-closed', () => {
    app.quit();
})
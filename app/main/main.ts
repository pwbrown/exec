/** ELECTRON */
import { app, systemPreferences } from "electron";

/** UTILITIES */
import { Window } from "./window";

/********* INITIALIZE GLOBALS **********/

/** Main Window Instance */
global.mainWindow = new Window("main", "app.html", {
    height: 500,
    webPreferences: { nodeIntegration: true },
    width: 500,
});

/** Entry point of the application */
app.on("ready", async () => {
    global.mainWindow.open();
});

/** Close the application on window close */
app.on("window-all-closed", () => {
    app.quit();
});

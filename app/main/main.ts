/** ELECTRON */
import { app } from "electron";

/** UTILITIES */
import "./commands";
import { Window } from "./window";

/*********************** INITIALIZE GLOBALS **************************/

/** Main Window Instance */
global.mainWindow = new Window("main", "app.html", {
    height: 500,
    minHeight: 450,
    minWidth: 290,
    webPreferences: { nodeIntegration: true },
    width: 500,
});

/*********************** HANDLE APPLICATION EVENTS ********************/

/** Entry point of the application */
app.on("ready", async () => {
    global.mainWindow.open();
});

/** Close the application on window close */
app.on("window-all-closed", () => {
    app.quit();
});

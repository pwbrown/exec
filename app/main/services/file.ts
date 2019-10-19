/** ELECTRON */
import { dialog, ipcMain as ipc, IpcMainEvent } from 'electron';

/*********************** LISTEN FOR CLIENT REQUEST ************************/
ipc.on('file:selectPath', (event: IpcMainEvent, uid: string) => {
    dialog.showOpenDialog(global.mainWindow.ref(), {
        buttonLabel: 'select',
    })
        .then((result) => {
            if (!result.canceled && result.filePaths && result.filePaths.length) {
                event.sender.send(`file:selected:${uid}`, result.filePaths[0]);
            }
        })
        .catch(() => {
            return;
        });
});

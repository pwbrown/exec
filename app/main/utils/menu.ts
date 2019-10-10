/** ELECTRON */
import { app, Menu, MenuItemConstructorOptions } from 'electron';

const isMac = process.platform === 'darwin';

const template: MenuItemConstructorOptions[] = [
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
            { label: 'New Command', click: () => send('newCommand') },
            isMac ? { role: 'close' } : { role: 'quit' },
        ],
    },
    {
        label: 'View',
        submenu: [
            { role: 'reload' },
            { label: 'Developer Tools', role: 'toggleDevTools' },
        ],
    },
];

export const setApplicationMenu = () => {
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
};

const send = (msg: string, ...payload: any) => {
    global.mainWindow.send(`menu:${msg}`, ...payload);
};

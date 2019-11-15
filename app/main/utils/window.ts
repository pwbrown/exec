/**
 * Exposes a helper class for managing a window instance
 */

/** ELECTRON */
import {
    BrowserWindow,
    BrowserWindowConstructorOptions,
    ipcMain as ipc,
    IpcMainEvent,
} from 'electron';

/** NODE */
import { join } from 'path';

/** UTILITIES */
import Store from 'electron-store';

/** TYPES */
interface IMins {
    minHeight: number;
    minWidth: number;
}
interface IPos {
    x: number;
    y: number;
}
interface IDim {
    width: number;
    height: number;
}
export enum Mode {
    DEFAULT = 'DEFAULT',
    CONDENSED = 'CONDENSED',
}

/** Window Manager */
export class Window {
    private _window: BrowserWindow | null = null; /** The window itself */
    private _store: Store;                        /** File store to keep persisted window state */
    private _mode: Mode | null = null;                    /** The current window mode (determines state variances) */
    private _pos: IPos | null = null;                     /** Stores the X and Y postition on the screen */
    private _dims: { [mode in Mode]?: IDim | null } = {}; /** Stores the Width and Height of mode preferences */

    constructor(
        private _id: string,
        private _fileInAssets: string,
        private _config: BrowserWindowConstructorOptions,
        private _mins: { [mode in Mode]?: IMins } = {},
    ) {
        this._store = new Store({ name: `window_${this.id}_v2` });
    }

    /********************************** PUBLIC *************************************/

    /** Creates and opens the window */
    public open() {
        /** Create the window */
        this._window = new BrowserWindow({
            ...this._config,
            ...this.mins,
            ...(this.dims ? this.dims : {}),
            ...(this.pos ? this.pos : {}),
            show: false,
        });
        /** Track window state */
        this._window.on('resize', () => this.onResize());
        this._window.on('move', () => this.onResize());
        /** Show the window when it has finished loading */
        this._window.on('ready-to-show', () => this.show());
        /** Tell the window to load the html file */
        this._window.loadFile(this.file);
    }

    /** Used for sending an ipc message directly to the window */
    public send(name: string, ...payload: any) {
        if (!this._window) {
            return;
        }
        this._window.webContents.send(name, ...payload);
    }

    /** Shows the window if available */
    public show() {
        if (this._window) {
            this._window.show();
        }
    }

    /** Hides the window if availabe */
    public hide() {
        if (this._window) {
            this._window.hide();
        }
    }

    /***************************** GETTERS AND SETTERS *********************************/
    get id() { return this._id; }
    get window_UNSAFE() { return this._window as BrowserWindow; }

    get file() { return join(__dirname, '../../assets', this._fileInAssets); }

    get mode() {
        if (!this._mode) {
            this._mode = this._store.get('mode', Mode.DEFAULT);
        }
        return this._mode as Mode;
    }
    set mode(m: Mode) {
        this._mode = m;
        this._store.set('mode', m);
        if (this._window) {
            this.send('window:mode', this.mode);
            this._window.setMinimumSize(this.mins.minWidth, this.mins.minHeight);
            const bounds = this._window.getBounds();
            if (this.dims) {
                this._window.setSize(this.dims.width, this.dims.height);
            } else if (bounds.width < this.mins.minWidth || bounds.height < this.mins.minHeight) {
                this._window.setSize(this.mins.minWidth, this.mins.minHeight);
            }
        }
    }

    get pos() {
        if (!this._pos) {
            this._pos = this._store.get('position', null);
        }
        return this._pos;
    }
    set pos(p: IPos | null) {
        this._pos = p;
        this._store.set('position', p);
    }

    get dims() {
        if (!this._dims[this.mode]) {
            this._dims[this.mode] = this._store.get(`DIMS_${this.mode}`, null);
        }
        return this._dims[this.mode] as IDim | null;
    }
    set dims(d: IDim | null) {
        this._dims[this.mode] = d;
        this._store.set(`DIMS_${this.mode}`, d);
    }

    get mins(): IMins {
        return this._mins[this.mode] ?
            (this._mins[this.mode] as IMins) :
            {
                minHeight: this._config.minHeight || 0,
                minWidth: this._config.minWidth || 0,
            };
    }

    /****************************** EVENT HANDLERS ******************************/
    private onResize() {
        if (this._window) {
            const { x, y, width, height } = this._window.getBounds();
            this.pos = { x, y };
            this.dims = { height, width };
        }
    }
}

/***************************** CLIENT EVENTS ******************************/
ipc.on('windowSync:getMode', (event: IpcMainEvent) => {
    event.returnValue = global.mainWindow ? global.mainWindow.mode : Mode.DEFAULT;
});

ipc.on('window:setMode', (_: IpcMainEvent, mode: Mode) => {
    if (global.mainWindow) {
        global.mainWindow.mode = mode;
    }
});

// CODE THAT I MIGHT NEED
// const { bounds } = screen.getDisplayMatching(state);
// if (state.x < bounds.x || (state.x + state.width) > (bounds.x + bounds.width)) {
//     return null;
// }
// if (state.y < bounds.y || (state.y + state.height) > (bounds.y + bounds.height)) {
//     return null;
// }

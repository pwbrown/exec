/**
 * Window State Manager
 * - Persists Window position and size across sessions
 */

/** DEPENDENCIES */
import {
    BrowserWindow,
    BrowserWindowConstructorOptions,
    screen,
    Rectangle
} from 'electron';
import { join } from 'path';
import Store from 'electron-store';

/** Window Manager */
export class Window {
    private id     : string;
    private file   : string;
    private window : BrowserWindow | null = null;
    private config : BrowserWindowConstructorOptions;
    private store : Store;

    constructor(id: string, fileInAssets: string, config: BrowserWindowConstructorOptions) {
        this.id = id;
        this.config = config;
        this.file = join(__dirname, '../assets', fileInAssets);
        this.store = new Store({ name: `window_${this.id}` });
    }

    /**
     * Creates and opens the window
     */
    public open() {
        /** Update the window position and size from the last session if possible */
        const lastState = this.retrieveStoredBounds();
        if(lastState)
            this.config = { ...this.config, ...lastState };
        /** Create the window */
        this.window = new BrowserWindow({ ...this.config, show: false });
        /** Track window state */
        this.window.on('resize', () => this.trackResize());
        this.window.on('move', () => this.trackResize());
        /** Show the window when it has finished loading */
        this.window.on('ready-to-show', () => {
            if(this.window)
                this.window.show();
        });
        /** Tell the window to load the html file */
        this.window.loadFile(this.file);
    }

    /**
     * Used for sending an ipc message directly to the window
     */
    public send(name: string, ...payload: any) {
        if(!this.window) return;
        this.window.webContents.send(name, ...payload);
    }

    /**
     * Called any time the window resizes or moves
     * to persist the position for the next session
     */
    private trackResize() {
        if(this.window)
            this.store.set('state', this.window.getBounds());
    }

    /**
     * Checks the store for the last state of 
     * the window and verifies that it is usable
     */
    private retrieveStoredBounds(): Rectangle | null {
        const state = this.store.get('state', null);
        if(!state) return state;
        const { bounds } = screen.getDisplayMatching(state);
        if(state.x < bounds.x || (state.x + state.width) > (bounds.x + bounds.width))
            return null;
        if(state.y < bounds.y || (state.y + state.height) > (bounds.y + bounds.height))
            return null;
        return state;
    }
}
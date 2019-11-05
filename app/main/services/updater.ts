/**
 * Handles auto updates for the application
 * and exposes methods and listeners for manually
 * checking for application updates
 */

/** ELECTRON */
import { ProgressInfo, UpdateInfo } from 'builder-util-runtime';
import { dialog, ipcMain as ipc, IpcMainEvent, shell } from 'electron';
import { autoUpdater } from 'electron-updater';
import { Mode } from '../utils/window';

/** NODE */
import { join } from 'path';

/** UPDATER SETTINGS */
autoUpdater.autoInstallOnAppQuit = true;
autoUpdater.logger = null;

/** STATUSES */
let CHECKING = false;
let AVAILABLE = false;
let NEXT_VERSION: UpdateInfo | null = null;
let PROGRESS: ProgressInfo | null = null;
let CHECK_INTERVAL: NodeJS.Timeout | number;

/** ALERNATE WORKFLOW */
let SHOWED_UPDATE_DIALOG = false;

/** CONSTANTS */
const SIMULATE: boolean = false; /** Run update simulation */

/** Check for Updates Method: Optional check interval */
export const CheckForUpdates = (intervalInSeconds ?: number) => {
    if (!CHECKING) {
        CheckingForUpdates();
        if (SIMULATE) {
            SimulateCheckAndDownloadSuccess();
        } else {
            autoUpdater.checkForUpdates().catch(() => {
                UpdateNotAvailable();
            });
        }
    }
    if (intervalInSeconds) {
        if (CHECK_INTERVAL) {
            clearInterval(CHECK_INTERVAL as NodeJS.Timeout);
        }
        CHECK_INTERVAL = setInterval(CheckForUpdates, intervalInSeconds * 1000);
    }
};

/*********************** UPDATER EVENT HANDLERS *********************/

export const GetCurrentStatus = () => ({
    available: AVAILABLE,
    checking: CHECKING,
    next: NEXT_VERSION,
    progress: PROGRESS,
});

const ReportStatus = () => {
    global.mainWindow.send('updater:status', GetCurrentStatus());
    if (global.applicationMenu) {
        global.applicationMenu.rebuild();
    }
};

const CheckingForUpdates = () => {
    CHECKING = true;
    ReportStatus();
};

const UpdateAvailable = (info: UpdateInfo) => {
    NEXT_VERSION = info;
    ReportStatus();
};

const UpdateNotAvailable = () => {
    CHECKING = false;
    AVAILABLE = false;
    ReportStatus();
};

const DownloadProgress = (progress: ProgressInfo) => {
    PROGRESS = progress;
    ReportStatus();
};

const UpdateDownloaded = (info: UpdateInfo) => {
    CHECKING = false;
    AVAILABLE = true;
    NEXT_VERSION = info;
    ReportStatus();
    if (global.mainWindow && global.mainWindow.mode === Mode.CONDENSED && !SHOWED_UPDATE_DIALOG) {
        SHOWED_UPDATE_DIALOG = true;
        showUpdateDialog();
    }
};

export const showUpdateDialog = () => {
    if (!global.mainWindow || !global.mainWindow.window_UNSAFE) {
        return;
    }
    const icon = join(__dirname, '../../assets/icon/icon.png');
    let buttons: string[];
    if (!AVAILABLE || !NEXT_VERSION) {
        buttons = ['Ok'];
        dialog.showMessageBoxSync(global.mainWindow.window_UNSAFE, {
            buttons,
            cancelId: 0,
            defaultId: 0,
            icon,
            message: 'You are on the latest version',
            title: 'No Updates Available',
            type: 'info',
        });
    } else if (AVAILABLE && NEXT_VERSION) {
        buttons = ['View Release Notes', 'Later', 'Install and Restart'];
        const index = dialog.showMessageBoxSync(global.mainWindow.window_UNSAFE, {
            buttons,
            cancelId: 1,
            defaultId: 2,
            icon,
            message: `Version ${NEXT_VERSION.version} has been downloaded is ready to install!`,
            noLink: true,
            title: 'Updates are Available!',
            type: 'info',
        });
        switch (index) {
            case 0:
                return shell.openExternal('https://github.com/pwbrown/exec/releases/latest');
            case 2:
                return autoUpdater.quitAndInstall();
        }
    }
};

autoUpdater.on('update-available', UpdateAvailable);
autoUpdater.on('update-not-available', UpdateNotAvailable);
autoUpdater.on('download-progress', DownloadProgress);
autoUpdater.on('update-downloaded', UpdateDownloaded);

/********************* CLIENT REQUESTS **********************/
ipc.on('updaterSync:status', (event: IpcMainEvent) => {
    event.returnValue = GetCurrentStatus();
});

ipc.on('updater:apply', () => {
    if (AVAILABLE) {
        autoUpdater.quitAndInstall();
    }
});

ipc.on('updater:check', () => {
    if (!CHECKING) {
        CheckForUpdates();
    }
});

/************** SIMULATION METHODS (Not for production use) ********************/

const SimulateCheckAndDownloadSuccess = async () => {
    const nextUpdate: UpdateInfo = {
        files: [], path: '', releaseDate: 'Date',
        releaseName: 'Name', releaseNotes: 'Notes',
        sha512: '', stagingPercentage: 10, version: '1.4.0',
    };
    await Sleep(1);
    UpdateAvailable(nextUpdate);
    await SimulateProgress();
    UpdateDownloaded(nextUpdate);
};

const SimulateProgress = async () => {
    const Events: number[][] = [
        [3328654, 3328654, 5.462843053666926, 60932631, 3328654],
        [3714756, 4108288, 12.20518772609704, 60932631, 7436942],
        [3854875, 4143104, 19.00467091270029, 60932631, 11580046],
        [3685020, 3300064, 24.420593294256406, 60932631, 14880110],
        [3908146, 4813040, 32.31954648405056, 60932631, 19693150],
        [3930435, 4046680, 38.96078277007274, 60932631, 23739830],
        [3653488, 1998992, 42.241442027999746, 60932631, 25738822],
        [3030141, 835512, 43.61264820486744, 60932631, 26574334],
        [3213367, 4833112, 51.544542693388706, 60932631, 31407446],
        [3270364, 3834000, 57.836737757146906, 60932631, 35241446],
        [3176213, 2511016, 61.957708670088444, 60932631, 37752462],
        [3379984, 5812152, 71.49636128464566, 60932631, 43564614],
        [3383025, 3608288, 77.41812757108748, 60932631, 47172902],
        [3450835, 4403272, 84.64458723274234, 60932631, 51576174],
        [3482045, 3948520, 91.1247275700273, 60932631, 55524694],
        [3418781, 2457840, 95.15842833046221, 60932631, 57982534],
        [3291181, 1130376, 97.01355255774202, 60932631, 59112910],
        [3114379, 589728, 97.98138865856622, 60932631, 59702638],
        [3174567, 1229993, 100, 60932631, 60932631],
    ];
    await Sleep(1);
    for (const event of Events) {
        const [bytesPerSecond, delta, percent, total, transferred] = event;
        DownloadProgress({bytesPerSecond, delta, percent, total, transferred});
        await Sleep(Math.random());
    }
};

const Sleep = (seconds: number) => {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
};

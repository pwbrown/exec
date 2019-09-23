/** UPDATER */
import { ProgressInfo, UpdateInfo} from "builder-util-runtime";

/** Shape of an individual Command */
export interface ICommand {
    label: string;
    command: string;
}

export interface IUpdateStatus {
    available: boolean;
    checking: boolean;
    next: UpdateInfo | null;
    progress: ProgressInfo | null;
}

/** Redux Action Type Builders */
export interface IAction<T> { type: T; }
export interface IPayload<T, P> extends IAction<T> { payload: P; }

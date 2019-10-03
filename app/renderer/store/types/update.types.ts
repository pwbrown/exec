/** ELECTRON TYPES */
import { ProgressInfo, UpdateInfo } from 'builder-util-runtime';

/** OTHER TYPES */
import { IAction, IPayload } from './redux.types';

/** Shape of the update state */
export interface IUpdateState {
    show: boolean;
    status: IUpdateStatus & {
        attempted: boolean;
    };
}

/** All Possible Update Actions */
export enum UpdateActions {
    TOGGLE_UPDATE = 'TOGGLE_UPDATE',
    SET_UPDATE_STATUS = 'SET_UPDATE_STATUS',
}

/** Combined Updated Actions */
export type UpdateActionTypes =
    IAction<UpdateActions.TOGGLE_UPDATE> |
    IPayload<UpdateActions.SET_UPDATE_STATUS, { status: Partial<IUpdateState['status']> }>;

/** STATUS OF AN UPDATE */
export interface IUpdateStatus {
    available: boolean;
    checking: boolean;
    next: UpdateInfo | null;
    progress: ProgressInfo | null;
}

/** TYPES */
import { IUpdateStatus } from '../types';
import {
    Actions,
    ActionTypes,
} from './_update.reducer';

/************************** ACTIONS ************************/
export const attemptedUpdate = (): ActionTypes => ({
    type: Actions.ATTEMPTED_UPDATE,
});

export const setUpdateStatus = (status: IUpdateStatus): ActionTypes => ({
    payload: { status },
    type: Actions.SET_UPDATE_STATUS,
});

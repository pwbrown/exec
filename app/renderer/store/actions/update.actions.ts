/** TYPES */
import {
    IUpdateState,
    UpdateActions,
    UpdateActionTypes,
} from '../types';

export const toggleUpdate = (): UpdateActionTypes => ({
    type: UpdateActions.TOGGLE_UPDATE,
});

export const setUpdateStatus = (status: Partial<IUpdateState['status']>): UpdateActionTypes => ({
    payload: { status },
    type: UpdateActions.SET_UPDATE_STATUS,
});

/** TYPES */
import {
    IUpdateState,
    UpdateActions,
    UpdateActionTypes,
} from '../types';

/** Initial Update State */
const initialUpdateState: IUpdateState = {
    show: false,
    status: {
        attempted: false,
        available: false,
        checking: false,
        next: null,
        progress: null,
    },
};

export const UpdateReducer = (
    state: IUpdateState = initialUpdateState,
    action: UpdateActionTypes,
): IUpdateState => {
    switch (action.type) {
        case UpdateActions.TOGGLE_UPDATE:
            return { ...state, show: !state.show };
        case UpdateActions.SET_UPDATE_STATUS:
            return {
                ...state,
                status: {
                    ...state.status,
                    ...action.payload.status,
                },
            };
        default:
            return state;
    }
};

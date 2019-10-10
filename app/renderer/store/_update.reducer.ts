/** TYPES */
import {
    IAction,
    IPayload,
    IUpdateStatus,
} from '../types';

/** State */
interface IState {
    /** Whether an update check has been attempted */
    attempted: boolean;
    /** The current status of the software update */
    status: IUpdateStatus;
}

/** Actions */
export enum Actions {
    ATTEMPTED_UPDATE = 'ATTEMPTED_UPDATE',
    SET_UPDATE_STATUS = 'SET_UPDATE_STATUS',
}

/** Combined Action Types */
export type ActionTypes =
    IAction<Actions.ATTEMPTED_UPDATE> |
    IPayload<Actions.SET_UPDATE_STATUS, { status: IUpdateStatus }>;

/** Initial State */
const initialState: IState = {
    attempted: false,
    status: {
        available: false,
        checking: false,
        next: null,
        progress: null,
    },
};

/** Reducer */
export const reducer = (
    state: IState = initialState,
    action: ActionTypes,
): IState => {
    switch (action.type) {
        case Actions.ATTEMPTED_UPDATE:
            return { ...state, attempted: true };
        case Actions.SET_UPDATE_STATUS:
            return { ...state, status: action.payload.status };
        default:
            return state;
    }
};

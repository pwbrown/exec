/** ELECTRON */
import { ipcRenderer as ipc } from 'electron';

/** TYPES */
import { Theme } from '../types';
import {
    IAction,
    IPayload,
} from '../types';

/** State */
interface IState {
    current: Theme;
}

/** Actions */
export enum Actions {
    SET_THEME = 'SET_THEME',
}

/** Combined Action Types */
export type ActionTypes =
    IPayload<Actions.SET_THEME, { theme: Theme }>;

/** Initial State */
const initialState: IState = {
    current: Theme.DARK,
};

/** Reducer */
export const reducer = (
    state: IState = initialState,
    action: ActionTypes,
): IState => {
    switch (action.type) {
        case Actions.SET_THEME:
            return state;
        default:
            return state;
    }
};

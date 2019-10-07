/** TYPES */
import { Theme } from '../types';
import {
    IAction,
    IPayload,
} from '../types';

/** State */
interface IState {
    current: Theme;
    os: boolean;
}

/** Actions */
export enum Actions {
    SET_THEME = 'SET_THEME',
    TOGGLE_OS_THEME_CONTROL = 'TOGGLE_OS_THEME_CONTROL',
}

/** Combined Action Types */
export type ActionTypes =
    IPayload<Actions.SET_THEME, { theme: Theme }> |
    IAction<Actions.TOGGLE_OS_THEME_CONTROL>;

/** Initial State */
const initialState: IState = {
    current: Theme.LIGHT,
    os: false,
};

/** Reducer */
export const reducer = (
    state: IState = initialState,
    action: ActionTypes,
): IState => {
    switch (action.type) {
        case Actions.SET_THEME:
            return { ...state, current: action.payload.theme };
        case Actions.TOGGLE_OS_THEME_CONTROL:
            return { ...state, os: !state.os };
        default:
            return state;
    }
};

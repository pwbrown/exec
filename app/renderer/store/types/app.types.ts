/** OTHER TYPES */
import { ICommand } from './command.types';
import { IAction, IPayload } from './redux.types';
import { Theme } from './theme.types';

/** Shape of the App State */
export interface IAppState {
    /** Color theme of the application */
    theme: Theme;
    /** Showing help window */
    help: boolean;
    /** The list of commands */
    commands: ICommand[];
}

/** All Possible App Actions */
export enum AppActions {
    ADD_COMMAND = 'ADD_COMMAND',
    SET_THEME = 'SET_THEME',
    TOGGLE_HELP = 'TOGGLE_HELP',
    UPDATE_COMMAND = 'UPDATE_COMMAND',
    REMOVE_COMMAND = 'REMOVE_COMMAND',
}

/** All App Action Definitions */
export type AppActionTypes =
    IAction<AppActions.TOGGLE_HELP> |
    IPayload<AppActions.SET_THEME, { theme: Theme }> |
    IPayload<AppActions.ADD_COMMAND, { command: ICommand }> |
    IPayload<AppActions.UPDATE_COMMAND, { index: number, command: ICommand }> |
    IPayload<AppActions.REMOVE_COMMAND, { index: number }>;

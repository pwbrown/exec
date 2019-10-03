/** TYPES */
import {
    AppActions,
    AppActionTypes,
    ICommand,
    Theme,
} from '../types';

export const toggleHelp = (): AppActionTypes => ({
    type: AppActions.TOGGLE_HELP,
});

export const setTheme = (theme: Theme): AppActionTypes => ({
    payload: { theme },
    type: AppActions.SET_THEME,
});

export const addCommand = (command: ICommand): AppActionTypes => ({
    payload: { command },
    type: AppActions.ADD_COMMAND,
});

export const updateCommand = (index: number, command: ICommand): AppActionTypes => ({
    payload: { index, command },
    type: AppActions.UPDATE_COMMAND,
});

export const removeCommand = (index: number): AppActionTypes => ({
    payload: { index },
    type: AppActions.REMOVE_COMMAND,
});

/** TYPES */
import { Actions, ActionTypes, IAppState } from './types';

export const createCommand = (): ActionTypes => ({ type: Actions.CREATE_COMMAND });

export const cancelEdit = (): ActionTypes => ({ type: Actions.CANCEL_EDIT });

export const saveCommand = (): ActionTypes => ({ type: Actions.SAVE_COMMAND });

export const toggleHelp = (): ActionTypes => ({ type: Actions.TOGGLE_HELP });

export const toggleUpdate = (): ActionTypes => ({ type: Actions.TOGGLE_UPDATE });

export const editCommand = (index: number): ActionTypes => ({
    payload: { index },
    type: Actions.EDIT_COMMAND,
});

export const removeCommand = (index: number): ActionTypes => ({
    payload: { index },
    type: Actions.REMOVE_COMMAND,
});

export const updateCurrentLabel = (label: string): ActionTypes => ({
    payload: { label },
    type: Actions.UPDATE_CURRENT_LABEL,
});

export const updateCurrentCommand = (command: string): ActionTypes => ({
    payload: { command },
    type: Actions.UPDATE_CURRENT_COMMAND,
});

export const updateStatus = (update: Partial<IAppState['update']>): ActionTypes => ({
    payload: { update },
    type: Actions.UPDATE_STATUS,
});

export const updateTheme = (theme: IAppState['theme']): ActionTypes => ({
    payload: { theme },
    type: Actions.UPDATE_THEME,
});

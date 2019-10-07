/** TYPES */
import { Theme } from '../types';
import {
    Actions,
    ActionTypes,
} from './_theme.reducer';

/************************** ACTIONS ************************/
export const setTheme = (theme: Theme): ActionTypes => ({
    payload: { theme },
    type: Actions.SET_THEME,
});

export const toggleOSThemeControl = (): ActionTypes => ({
    type: Actions.TOGGLE_OS_THEME_CONTROL,
});

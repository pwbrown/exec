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

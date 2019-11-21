/**
 * PURPOSE:
 *  The purpose of this provider is to wrap the
 *  material-ui theme provider to automatically
 *  update the theme with the redux store
 */

/** REACT */
import React, { FC } from 'react';

/** MATERIAL */
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import MuiThemeProvider from '@material-ui/styles/ThemeProvider';

/** REDUX */
import { useSelector } from 'react-redux';

/** TYPES */
import { AppState } from 'store';
import { Theme } from 'types';

/** Themes */
const Themes = {
    [Theme.DARK]: createMuiTheme({ palette: { type: 'dark' } }),
    [Theme.LIGHT]: createMuiTheme({ palette: { type: 'light' } }),
};

const ThemeProvider: FC = ({ children }) => {
    const theme = useSelector((state: AppState) => state.settings.theme);
    return (
        <MuiThemeProvider theme={Themes[theme]}>
            {children}
        </MuiThemeProvider>
    );
};

export default ThemeProvider;

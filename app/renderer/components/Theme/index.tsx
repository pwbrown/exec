/** REACT */
import React, { FC } from 'react';

/** MATERIAL */
import createMuiTheme, { Theme } from '@material-ui/core/styles/createMuiTheme';
import ThemeProvider from '@material-ui/styles/ThemeProvider';

/** PROPS */
import { Connected, Props } from './theme.props';

/** THEMES */
const THEMES = {
    dark: createMuiTheme({ palette: { type: 'dark' } }),
    light: createMuiTheme({ palette: { type: 'light' } }),
};

const Theme: FC<Props> = (props) => {
    return (
        <ThemeProvider theme={THEMES[props.theme]}>
            {props.children}
        </ThemeProvider>
    );
};

export default Connected(Theme);

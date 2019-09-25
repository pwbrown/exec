/** REACT */
import React, { FC } from 'react';

/** MATERIAL */
import createMuiTheme, { Theme } from '@material-ui/core/styles/createMuiTheme';
import ThemeProvider from '@material-ui/styles/ThemeProvider';

/** REDUX */
import { connect } from 'react-redux';
import { IAppState } from './app.reducer';

/** THEMES */
const THEMES = {
    dark: createMuiTheme({ palette: { type: 'dark' } }),
    light: createMuiTheme({ palette: { type: 'light' } }),
};

/** REDUX PROPS */
interface IStateProps {
    theme: IAppState['theme'];
}

const Theme: FC<IStateProps> = (props) => {
    return (
        <ThemeProvider theme={THEMES[props.theme]}>
            {props.children}
        </ThemeProvider>
    );
};

/** REDUX MAPS */
const mapStateToProps = (state: IAppState): IStateProps => ({
    theme: state.theme,
});

export default connect(mapStateToProps)(Theme);

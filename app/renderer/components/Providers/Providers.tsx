/**
 * Sums up all Providers into a single parent component
 *   so that all child components have access to all contexts
 */

/** REACT */
import React, { FC } from 'react';

/** MATERIAL */
import CssBaseline from '@material-ui/core/CssBaseline';

/** REDUX */
import { Provider as ReduxProvider } from 'react-redux';

/** THEME */
import ThemeProvider from './ThemeProvider';

/** STORE */
import { AppStore } from '../../store';

const Providers: FC = ({ children }) => {
    return (
        <ReduxProvider store={AppStore}>
            <ThemeProvider>
                <CssBaseline/>
                {children}
            </ThemeProvider>
        </ReduxProvider>
    );
};

export default Providers;

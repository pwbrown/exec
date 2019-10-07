/** REACT */
import React, { FC } from 'react';
import { render } from 'react-dom';

/** MATERIAL */
import CssBaseline from '@material-ui/core/CssBaseline';

/** REDUX */
import { Provider as ReduxProvider } from 'react-redux';

/** HELPERS */
import ThemeProvider from '../Helpers/ThemeProvider';

/** STORE */
import { Store } from '../../store';

const App: FC = () => {
    return (
        <ReduxProvider store={Store}>
            <ThemeProvider>
                <CssBaseline/>
            </ThemeProvider>
        </ReduxProvider>
    );
};

render(<App/>, document.getElementById('exec'));

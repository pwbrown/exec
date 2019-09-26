/** REACT */
import React, { FC } from 'react';
import { render } from 'react-dom';

/** REDUX */
import { Provider as ReduxProvider } from 'react-redux';
import { createStore } from 'redux';

/** MATERIAL */
import CssBaseline from '@material-ui/core/CssBaseline';
import makeStyles from '@material-ui/styles/makeStyles';

/** REDUCERS */
import { reducer } from './redux';

/** COMPONENTS */
import CommandEditor from './components/CommandEditor';
import CommandList from './components/CommandList';
import Controls from './components/Controls';
import Help from './components/Help';
import Theme from './components/Theme';
import Update from './components/Update';

/** BACKGROUND */
import RunBackgroundListeners from './utils/background';

/** Build and expose Redux Store */
export const Store = createStore(reducer);

/** Start listening to background events from main */
RunBackgroundListeners(Store);

/** Exec Application Entry Component */
const App: FC = () => {
    const classes = AppStyles();
    return (
        <ReduxProvider store={Store}>
            <Theme>
                <CssBaseline/>
                <CommandEditor/>
                <Help/>
                <Update/>
                <div className={classes.container}>
                    <Controls/>
                    <CommandList/>
                </div>
            </Theme>
        </ReduxProvider>
    );
};

const AppStyles = makeStyles({
    container: {
        '-webkit-app-region': 'no-drag',
        'margin': '40px 10px 10px 10px',
    },
});

render(<App/>, document.getElementById('exec'));

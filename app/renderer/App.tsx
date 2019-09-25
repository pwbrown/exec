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
import { reducer } from './app.reducer';

/** COMPONENTS */
import CommandEditor from './CommandEditor';
import CommandList from './CommandList';
import Controls from './Controls';
import Help from './Help';
import Theme from './Theme';
import Update from './Update';

/** BACKGROUND */
import RunBackgroundListeners from './background';

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

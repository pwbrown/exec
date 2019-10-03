/** REACT */
import React, { FC } from 'react';
import { render } from 'react-dom';

/** REDUX */
import { Provider as ReduxProvider } from 'react-redux';
import { Store } from '../../store';

/** MATERIAL */
import CssBaseline from '@material-ui/core/CssBaseline';

/** STYLES */
import { AppStyles } from './app.styles';

/** COMPONENTS */
import CommandList from '../CommandList';
import CommandEditor from '../CommandEditor';
import Help from '../Help';
import Menu from '../Menu';
import Theme from '../Theme';
import Update from '../Update';

/** LISTEN FOR BACKGROUND MESSAGES FROM MAIN */
import '../../utils/background';

const App: FC = () => {
    const classes = AppStyles();
    return (
        <ReduxProvider store={Store}>
            <Theme>
                <CssBaseline/>
                <Help/>
                <Update/>
                <CommandEditor/>
                <div className={classes.container}>
                    <Menu/>
                    <CommandList/>
                </div>
            </Theme>
        </ReduxProvider>
    );
};

render(<App/>, document.getElementById('exec'));

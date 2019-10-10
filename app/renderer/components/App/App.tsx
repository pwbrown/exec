/** REACT */
import React, { FC } from 'react';
import { render } from 'react-dom';

/** PROVIDERS */
import Providers from '../Providers/Providers';

/** STYLES */
import { useStyles } from './App.styles';

/** COMPONENTS */
import CommandEditor from '../CommandEditor/CommandEditor';
import CommandList from '../CommandList/CommandList';
import SideBar from '../SideBar/SideBar';
import TitleBar from '../TitleBar/TitleBar';

/** Listen for Background Events */
import '../../store/background';

const App: FC = () => {
    const classes = useStyles();
    return (
        <Providers>
            <div className={classes.container}>
                <TitleBar/>
                <div className={classes.appContainer}>
                    <SideBar/>
                    <div className={classes.mainContainer}>
                        <CommandEditor/>
                        <CommandList/>
                    </div>
                </div>
            </div>
        </Providers>
    );
};

render(<App/>, document.getElementById('exec'));

/** REACT */
import React, { FC } from 'react';
import { render } from 'react-dom';

/** PROVIDERS */
import Providers from '../Providers/Providers';

/** STYLES */
import { useStyles } from './App.styles';

/** REDUX */
import { useSelector } from 'react-redux';
import { State} from '../../store';

/** COMPONENTS */
import CommandEditor from '../CommandEditor/CommandEditor';
import CommandList from '../CommandList/CommandList';
import SideBar from '../SideBar/SideBar';
import TitleBar from '../TitleBar/TitleBar';

/** Listen for Background Events */
import '../../store/background';

const App: FC = () => {
    const classes = useStyles();
    /** Using Editor Keys will reset the state of an editor when toggled */
    const commandEditorKey = useSelector((state: State) =>
        `command-editor${state.command.editor.show ? '-showing' : ''}`);
    return (
        <div className={classes.container}>
            <TitleBar/>
            <div className={classes.appContainer}>
                <SideBar/>
                <div className={classes.mainContainer}>
                    <CommandEditor key={commandEditorKey}/>
                    <CommandList/>
                </div>
            </div>
        </div>
    );
};

render((<Providers><App/></Providers>), document.getElementById('exec'));

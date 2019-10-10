/** REACT */
import React, { FC } from 'react';

/** MATERIAL */
import Fade from '@material-ui/core/Fade';

/** REDUX */
import { useSelector } from 'react-redux';
import { State } from '../../store';

/** STYLES */
import { useStyles } from './CommandEditor.styles';

const CommandEditor: FC = () => {
    const classes = useStyles();
    const show = useSelector((state: State) => state.command.editor.show);
    return (
        <div
            className={classes.container}
            style={{pointerEvents: show ? 'all' : 'none'}}
        >
            <Fade in={show}>
                <div className={classes.editor}>
                    hello
                </div>
            </Fade>
        </div>
    );
};

export default CommandEditor;

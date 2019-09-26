/** REACT */
import React, { FC, Fragment } from 'react';

/** MATERIAL */
import Badge from '@material-ui/core/Badge';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Add from '@material-ui/icons/Add';
import HelpOutline from '@material-ui/icons/HelpOutline';
import Update from '@material-ui/icons/Update';

/** REDUX */
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { createCommand, IAppState, toggleHelp, toggleUpdate } from '../redux';

/** REDUX PROPS */
interface IStateProps {
    updateAvailable: boolean;
}
interface IDispatchProps {
    create: () => void;
    help: () => void;
    update: () => void;
}

const Controls: FC<IStateProps & IDispatchProps> = (props) => {
    const create = () => props.create();
    const help = () => props.help();
    const update = () => props.update();

    const UpdateIcon = () => {
        if (props.updateAvailable) {
            return (
                <Badge variant='dot' color='error'>
                    <Update/>
                </Badge>
            );
        }
        return <Update/>;
    };

    return (
        <Fragment>
            <Tooltip title='Create Command' placement='right'>
                <Fab color='secondary' onClick={create} size='small'>
                    <Add/>
                </Fab>
            </Tooltip>
            <Tooltip title='Help' placement='right'>
                <IconButton size='small' onClick={help}>
                    <HelpOutline/>
                </IconButton>
            </Tooltip>
            <Tooltip title={props.updateAvailable ? 'Update Available' : 'Software Update'} placement='right'>
                <IconButton size='small' onClick={update}>
                    {UpdateIcon()}
                </IconButton>
            </Tooltip>
        </Fragment>
    );
};

/** REDUX MAPS */
const mapStateToProps = (state: IAppState): IStateProps => ({
    updateAvailable: state.update.available,
});
const mapDispatchToProps = (d: Dispatch): IDispatchProps => ({
    create: () => d(createCommand()),
    help: () => d(toggleHelp()),
    update: () => d(toggleUpdate()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Controls);

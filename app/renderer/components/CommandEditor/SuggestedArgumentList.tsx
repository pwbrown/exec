/** REACT */
import React, { FC, Fragment } from 'react';

/** MATERIAL */
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Add from '@material-ui/icons/Add';

/** REDUX */
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { createArgument, IAppState } from '../../redux';
import { ICommand } from '../../utils/types';

/** UTILITES */
import { FindAllMatches } from '../../utils/tools';

/** REDUX PROPS */
interface IStateProps {
    command: ICommand;
}
interface IDispatchProps {
    create: (id: string) => void;
}

const SuggestedArgumentList: FC<IStateProps & IDispatchProps> = (props) => {
    const { command, args = [] } = props.command;
    const search = /\{\{\s*([^} ]+)\s*\}\}/g; // Mustache syntax finder
    const matches = FindAllMatches(command, search, 1, args.map((a) => a.id));

    const CreateSuggested = (id: string) => () => props.create(id);

    const DisplayMatches = () => {
        if (!matches.length) {
            return (
                <Typography variant='caption' color='textSecondary'>
                    {`Suggests arguments written with the syntax: {{ NAME_HERE }}`}
                </Typography>
            );
        } else {
            return matches.map((match) => {
                return (
                    <Chip
                        key={`sug-arg-${match}`}
                        icon={<Add/>}
                        label={`${match} `}
                        size='small'
                        onClick={CreateSuggested(match)}
                    />
                );
            });
        }
    };

    return (
        <Fragment>
            <Typography>Suggested Arguments</Typography>
            <Divider style={{margin: '5px 0px'}}/>
            {DisplayMatches()}
        </Fragment>
    );
};

/** REDUX MAPS */
const stateToProps = (state: IAppState): IStateProps => ({
    command: state.commandEditorState.command,
});
const dispatchToProps = (d: Dispatch): IDispatchProps => ({
    create: (id: string) => d(createArgument(id)),
});

export default connect(stateToProps, dispatchToProps)(SuggestedArgumentList);

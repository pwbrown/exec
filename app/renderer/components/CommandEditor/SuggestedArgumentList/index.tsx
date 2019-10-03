/** REACT */
import React, { FC, Fragment } from 'react';

/** MATERIAL */
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Add from '@material-ui/icons/Add';

/** PROPS */
import { Connected, Props } from './suggestedArgumentList.props';

/** TOOLS */
import { FindAllMatches } from '../../../utils/tools';

const SuggestedArgumentList: FC<Props> = (props) => {
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

export default Connected(SuggestedArgumentList);

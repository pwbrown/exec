/** REACT */
import React, { FC } from 'react';

/** MATERIAL */
import Collapse from '@material-ui/core/Collapse';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import makeStyles from '@material-ui/styles/makeStyles';

/** COMPONENTS */
import SuggestionListItem from './SuggestionListItem';

/** PROPS */
interface IProps {
    suggestions: string[];
    open: boolean;
    focusIndex: number;
    onChangeFocus: (index: number) => void;
    onSelect: () => void;
    onCreate?: () => void;
}

const SuggestionList: FC<IProps> = (props) => {
    const classes = useStyles();

    const changeFocus = (index: number) => () => props.onChangeFocus(index);

    const renderListItem = (suggestion: string, index: number) => (
        <SuggestionListItem
            key={`list-item-${suggestion}`}
            focused={props.focusIndex === index}
            onClick={props.onSelect}
            onMouseEnter={changeFocus(index)}
        >
            {suggestion}
        </SuggestionListItem>
    );

    return (
        <div className={classes.container}>
            <Collapse in={props.open}>
                <div className={classes.inner}>
                    {props.suggestions.map(renderListItem)}
                </div>
            </Collapse>
        </div>
    );
};

/* tslint:disable:object-literal-sort-keys object-literal-key-quotes */
export const useStyles = makeStyles((theme: Theme) => ({
    container: {
        padding: '0px 10px',
    },
    inner: {
        background: theme.palette.divider,
    },
}));

export default SuggestionList;

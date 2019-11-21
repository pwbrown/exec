/** REACT */
import React, { FC, Fragment, MouseEvent } from 'react';

/** MATERIAL */
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import Typography from '@material-ui/core/Typography';
import Add from '@material-ui/icons/Add';
import makeStyles from '@material-ui/styles/makeStyles';

/** STYLES */
import clsx from 'clsx';

/** COMPONENTS */
import SuggestionListItem from './SuggestionListItem';

/** PROPS */
interface IProps {
    suggestions: string[];
    open: boolean;
    focusIndex: number;
    noCreate?: boolean;
    onChangeFocus: (index: number) => void;
    onSelect: () => void;
    onCreate?: () => void;
}

const SuggestionList: FC<IProps> = (props) => {
    const classes = useStyles();

    const changeFocus = (index: number) => () => props.onChangeFocus(index);

    const onMouseDown = (e: MouseEvent<HTMLDivElement>) => e.preventDefault();
    const onMouseUp = () => props.onCreate ? props.onCreate() : undefined;

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

    const renderCreateButton = () => props.noCreate ? <Fragment/> : (
        <Fragment>
            <div
                className={clsx(classes.newArg, {[classes.focused]: !props.suggestions.length})}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
            >
                <Add fontSize='small'/>
                <Typography>New Argument</Typography>
            </div>
            <Divider/>
        </Fragment>
    );

    return (
        <div className={classes.container}>
            <Collapse in={props.open}>
                <div className={classes.inner}>
                    {renderCreateButton()}
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
    newArg: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        color: theme.palette.text.secondary,
        cursor: 'pointer',
        '&$focused': {
            color: theme.palette.primary.light,
        },
        '&:hover': {
            color: theme.palette.primary.light,
        },
    },
    focused: {},
}));

export default SuggestionList;

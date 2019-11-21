/** REACT */
import React, { FC, MouseEvent } from 'react';

/** MATERIAL */
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles';

/** STYLES */
import clsx from 'clsx';

/** PROPS */
interface IProps {
    onClick: () => void;
    onMouseEnter: () => void;
    focused: boolean;
}

const SuggestionListItem: FC<IProps> = (props) => {
    const classes = useStyles();

    /** MOUSE EVENT HANDLERS */
    const onMouseDown = (e: MouseEvent<HTMLDivElement>) => e.preventDefault();
    const onMouseUp = () => props.onClick();
    const onMouseEnter = () => props.onMouseEnter();

    return (
        <div
            className={clsx(classes.container, {[classes.focused]: props.focused})}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseEnter={onMouseEnter}
        >
            <Typography variant='caption'>{props.children}</Typography>
        </div>
    );
};

/* tslint:disable:object-literal-sort-keys object-literal-key-quotes */
export const useStyles = makeStyles((theme: Theme) => ({
    container: {
        color: theme.palette.text.secondary,
        cursor: 'pointer',
        padding: '2px 5px',
        '&$focused': {
            color: theme.palette.secondary.light,
        },
    },
    focused: {},
}));

export default SuggestionListItem;

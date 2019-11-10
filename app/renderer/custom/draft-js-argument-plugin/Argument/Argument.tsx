/**
 * PURPOSE:
 *  This is the visual representation of an argument
 *  in "entity" form as opposed to plain text
 */

/** REACT */
import React, { FC } from 'react';

/** STYLES */
import { useStyles } from './Argument.styles';

const Argument: FC = (props) => {
    const classes = useStyles();
    return (
        <span className={classes.container}>
            {props.children}
        </span>
    );
};

export default Argument;

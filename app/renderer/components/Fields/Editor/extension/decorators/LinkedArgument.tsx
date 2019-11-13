/** REACT */
import React, { FC } from 'react';

/** STYLES */
import { useStyles } from './LinkedArgument.styles';

const LinkedArgument: FC = (props) => {
    const classes = useStyles();
    return (
        <span className={classes.container}>
            {props.children}
        </span>
    );
};

export default LinkedArgument;

export * from './LinkedArgument.strategy';

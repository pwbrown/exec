/** REACT */
import React, { FC, useEffect, useRef } from 'react';

/** STYLES */
import { useStyles } from './UnlinkedArgument.styles';

/** PROPS */
interface IProps {
    /** PROVIDED BY EDITOR */
    offsetKey: string;
    /** CUSTOM */
    onRegister?: (offsetKey: string) => void;
    onUnregister?: (offsetKey: string) => void;
}

const UnlinkedArgument: FC<IProps> = (props) => {
    const classes = useStyles();
    const element = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (props.onRegister) { props.onRegister(props.offsetKey); }
        return () => {
            if (props.onUnregister) { props.onUnregister(props.offsetKey); }
        };
    }, []);
    return (
        <span ref={element} className={classes.container}>
            {props.children}
        </span>
    );
};

export default UnlinkedArgument;

export * from './UnlinkedArgument.strategy';

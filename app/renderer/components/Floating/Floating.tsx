/** REACT */
import React, { CSSProperties, FC } from 'react';

/** MATERIAL */
import Fade from '@material-ui/core/Fade';

/** STYLES */
import { useStyles } from './Floating.styles';

/** PROPS */
interface IProps {
    show: boolean;
    z?: number;
}

const Floating: FC<IProps> = (props) => {
    const classes = useStyles();

    const containerStyles: CSSProperties = {
        pointerEvents: props.show ? 'all' : 'none',
        zIndex: props.z || 0,
    };

    return (
        <div className={classes.container} style={containerStyles}>
            <Fade in={props.show}>
                <div className={classes.innerContainer}>
                    {props.children}
                </div>
            </Fade>
        </div>
    );
};

export default Floating;

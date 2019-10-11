/** REACT */
import React, { FC } from 'react';

/** MATERIAL */
import Tooltip from '@material-ui/core/Tooltip';

/** STYLES */
import { useStyles } from './SideBarItem.styles';

/** PROPS */
interface IProps {
    icon: any;
    tip: string;
    onClick?: () => void;
}

const SideBarItem: FC<IProps> = (props) => {
    const classes = useStyles();
    const click = () => {
        if (typeof props.onClick === 'function') {
            props.onClick();
        }
    };
    return (
        <Tooltip title={props.tip} placement='right'>
            <div className={classes.container} onClick={click}>
                {props.icon}
            </div>
        </Tooltip>
    );
};

export default SideBarItem;

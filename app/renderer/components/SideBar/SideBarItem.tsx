/** REACT */
import React, { FC } from 'react';

/** MATERIAL */
import Tooltip from '@material-ui/core/Tooltip';

/** STYLES */
import clsx from 'clsx';
import { useStyles } from './SideBarItem.styles';

/** PROPS */
interface IProps {
    icon: any;
    tip: string;
    active?: boolean;
    highlight?: boolean;
    onClick?: () => void;
}

const SideBarItem: FC<IProps> = (props) => {
    const classes = useStyles();
    const click = () => {
        if (typeof props.onClick === 'function') {
            props.onClick();
        }
    };
    const divClasses = clsx(
        classes.container,
        {
            [classes.active]: props.active,
            [classes.highlight]: props.highlight,
        },
    );
    return (
        <Tooltip title={props.tip} placement='right'>
            <div className={divClasses} onClick={click}>
                <div className={classes.bar}/>
                {props.icon}
            </div>
        </Tooltip>
    );
};

export default SideBarItem;

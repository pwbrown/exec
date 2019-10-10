/** REACT */
import React, { FC } from 'react';

/** MATERIAL */
import ButtonBase from '@material-ui/core/ButtonBase';
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
    }
    return (
        <ButtonBase onClick={click}>
            <Tooltip title={props.tip} placement='right'>
                <div className={classes.container}>
                    {props.icon}
                </div>
            </Tooltip>
        </ButtonBase>
    );
};

export default SideBarItem;

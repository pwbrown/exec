/** REACT */
import React, { FC } from 'react';

/** MATERIAL */
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import HelpOutline from '@material-ui/icons/HelpOutline';

/** STYLES */
import { useStyles } from './Label.styles';

/** PROPS */
export interface ILabelProps {
    required?: boolean;
    help?: string;
}

const Label: FC<ILabelProps> = (props) => {
    const classes = useStyles();

    const help = () => !props.help ? '' : (
        <Tooltip title={props.help} enterDelay={200}>
            <HelpOutline className={classes.icon}/>
        </Tooltip>
    );

    return (
        <div className={classes.container}>
            <Typography>{props.children}{props.required ? ' *' : ''}</Typography>
            {help()}
        </div>
    );
};

export default Label;

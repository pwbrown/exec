/** REACT */
import React, { FC } from 'react';

/** MATERIAL */
import Divider from '@material-ui/core/Divider';
import FormGroup from '@material-ui/core/FormGroup';
import Typography from '@material-ui/core/Typography';

/** STYLES */
import { useStyles } from './Preview.styles';

/** PROPS */
interface IProps {
    label?: string;
}

const Preview: FC<IProps> = (props) => {
    const classes = useStyles();
    return (
        <FormGroup className={classes.container}>
            <Typography>{props.label || ''}</Typography>
            <Divider className={classes.divider}/>
            <Typography variant='caption'>
                {props.children}
            </Typography>
        </FormGroup>
    );
};

export default Preview;
